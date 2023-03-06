import { html } from 'common-tags';

import { searchbox } from '../../../helpers/searchbox';
import { createCategory } from '../api/create-category.api';
import { deleteCategory } from '../api/delete-category.api';
import { editCategory } from '../api/edit-category.api';
import { getCategories } from '../api/get-categories.api';

let Categories = {
  render: () => {
    return html`<main class="mt-5 pt-5">
      <h2>All Categories</h2>
      <div span class="input-group mb-4">
        <input
          type="text"
          class="form-control rounded"
          placeholder="Search for categories"
          id="table-search"
          aria-label="category search bar"
        />

        <button
          class="btn btn-primary rounded justify-content-end mx-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#add-category"
        >
          <i class="fa-solid fa-plus"></i> Add Category
        </button>
        <!-- Modal -->
        <form action="" id="add-category-form" autocomplete="off">
          <div class="modal fade" id="add-category" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5">Add Category</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      class="form-control"
                      placeholder="Category Name"
                      aria-label="category name"
                      required
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button save-modal submit" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <table class="table table-hover">
        <thead class="bg-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope="col" aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody class="align-middle" id="table-body"></tbody>
      </table>
    </main>`;
  },
  after_render: async () => {
    // navbar active
    document.getElementById('categories-nav').classList.add('active');
    searchbox();

    const categories = await getCategories();
    const renderCategories = () => {
      let table = ``;
      for (const cat of categories) {
        table += `
                    <tr id=${cat.id}>
                        <td class="name">#${cat.id}</td>
                        <td class="name">${cat.name}</td>
                        <td><button type="button" class="btn btn-danger m-3 delete-category-btn">Delete Category</button>
                            <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                                    data-bs-target="#edit-category-${cat.id}">Edit Category</button>
                            <!-- Edit Category Modal -->
                            <form method="put" class="edit-category-form">
                                <div class="modal fade" id="edit-category-${cat.id}" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5">Edit Category</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="input-group mb-3">
                                                    <input name="name" type="text" class="form-control" placeholder="Name" aria-label="name" value=${cat.name} required>
                                                </div>
            
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button save-modal submit" onclick="return editCategory(event)" class="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </td>
                    </tr>
            `;
      }
      return table;
    };

    const createCategoryHandler = async (event) => {
      event.preventDefault();
      const form = document.getElementById('add-category-form');
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      await createCategory(formDataJsonString);
      location.reload();
    };

    const deleteCategoryHandler = async (event) => {
      let tr = event.target.closest('tr');
      let n = tr.querySelector('.name').innerHTML;
      await deleteCategory(n);
      location.reload();
    };

    const editCategoryHandler = async (event) => {
      event.preventDefault();
      let id = event.target.closest('tr').id;
      const form = event.target;
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      await editCategory(id, formDataJsonString);
      location.reload();
    };

    document.getElementById('table-body').innerHTML = renderCategories();
    document
      .getElementById('add-category-form')
      .addEventListener('submit', (event) => createCategoryHandler(event));

    let deleteBtns = document.getElementsByClassName('delete-category-btn');
    for (let btn of deleteBtns) {
      btn.addEventListener('click', (event) => deleteCategoryHandler(event));
    }

    let editForms = document.getElementsByClassName('edit-category-form');
    for (let form of editForms) {
      form.addEventListener('submit', (event) => editCategoryHandler(event));
    }
  },
};
export default Categories;
