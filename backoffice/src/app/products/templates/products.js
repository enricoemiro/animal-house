import { html } from 'common-tags';

import { searchbox } from '../../../helpers/searchbox';
import { getCategories } from '../../categories/api/get-categories.api';
import { createProduct } from '../api/create-product.api';
import { deleteProduct } from '../api/delete-product.api';
import { deleteProducts } from '../api/delete-products.api';
import { editProduct } from '../api/edit-product.api';
import { getProducts } from '../api/get-products.api';

import { getCheckedIds } from '../../../helpers/checked-ids';

let Products = {
  render: () => {
    return html`<main class="mt-5 pt-5">
      <h2>All Products</h2>
      <div span class="input-group mb-4">
        <input
          type="text"
          class="form-control rounded"
          placeholder="Search for products"
          id="table-search"
          aria-label="Product search bar"
        />
        <button
          title="Delete"
          aria-label="Delete"
          class="btn btn-outline-danger rounded border-0 mx-2"
          id="multiple-delete"
          type="button"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

        <button
          class="btn btn-primary rounded justify-content-end"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#add-item"
        >
          <i class="fa-solid fa-plus"></i> Add Item
        </button>
        <!-- Modal -->
        <form action="" method="post" id="add-product-form" autocomplete="off">
          <div class="modal fade" id="add-item" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5">Add Item</h1>
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
                      placeholder="Product Name"
                      aria-label="product name"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Price ($)</span>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      id="price"
                      class="form-control"
                      aria-label="Dollar amount"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label class="input-group-text" for="category">Category</label>
                    <select class="form-select" name="categoryId" id="category" required></select>
                  </div>
                  <div class="input-group mb-3">
                    <label class="input-group-text" for="availability">Availability</label>
                    <input
                      type="number"
                      name="availability"
                      id="availability"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label class="input-group-text" for="image">Add Images</label>
                    <input
                      type="file"
                      class="form-control"
                      name="images"
                      id="image"
                      required
                      multiple
                    />
                  </div>
                  <textarea
                    class="form-control"
                    name="description"
                    placeholder="Description"
                    id="desc"
                    required
                  ></textarea>
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
            <td scope="col">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                id="check-all"
              />
            </td>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Availability</th>
            <td scope="col"></td>
            <td scope="col"></td>
          </tr>
        </thead>
        <tbody class="align-middle" id="table-body"></tbody>
      </table>
    </main>`;
  },
  after_render: async () => {
    // navbar active
    document.getElementById('products-nav').classList.add('active');
    searchbox();

    const products = await getProducts();
    const categories = await getCategories();
    const renderProducts = () => {
      let catSelect = '';
      for (let cat of categories) {
        catSelect += `<option value="${cat.id}">${cat.name}</option>`; // TODO capire sta cosa dei id/category
      }
      document.getElementById('category').innerHTML = catSelect;

      let table = ``;

      for (const prod of products) {
        let catS = '';

        for (let cat of categories) {
          if (cat.id == prod.category.id) {
            catS += `<option value="${cat.id}" selected>${cat.name}</option>`;
          } else {
            catS += `<option value="${cat.id}">${cat.name}</option>`;
          }
        }

        table += `
                <tr id="${prod.id}">
                    <td scope="row">
                        <input class="form-check-input" type="checkbox" value="" aria-label="checkbox to select row">
                    </td>
                    <td class="id">#${prod.id}</td>
                    <td class="name">${prod.name}</td>
                    <td class="category">${prod.category.name}</td>
                    <td class="price">$${prod.price}</td>
                    <td class="availability">${prod.availability}</td>
                    <td><button type="button" class="btn btn-danger m-3 delete-product-btn">Delete Item</button>
                    <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                    data-bs-target="#edit-item-${prod.id}">Edit Item</button>
                        <!-- Modal -->
                        <form action="" class="edit-product-form">
                            <div class="modal fade" id="edit-item-${prod.id}" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5">Edit Item</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <input type="text" id="name" name="name" class="form-control" placeholder="Product Name"
                                                    aria-label="product name" value=${prod.name} required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Price ($)</span>
                                                <input type="number" class="form-control" step="0.01" name="price" aria-label="Dollar amount" value=${prod.price} required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="category">Category</label>
                                                <select class="form-select" name="categoryId" id="category" required>
                                                    ${catS}
                                                </select>
                                            </div>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="availability">Availability</label>
                                                <input type="number" id="availability" name="availability" class="form-control" value=${prod.availability} required/>
                                            </div>
                                                <label class="px-1" for="desc">Description</label>
                                                <textarea class="form-control" name="description" placeholder="Description" id="desc" required>${prod.description}</textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button save-modal submit" class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>`;
      }
      return table;
    };

    const createProductHandler = async (event) => {
      event.preventDefault();
      const form = document.getElementById('add-product-form');
      const formData = new FormData(form);
      await createProduct(formData);
      location.reload();
    };

    const deleteProductHandler = async (event) => {
      let id = event.target.closest('tr').id;
      await deleteProduct(id);
      location.reload();
    };

    const editProductHandler = async (event) => {
      event.preventDefault();
      let id = event.target.closest('tr').id;
      const form = event.target;
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      plainFormData.availability = parseInt(plainFormData.availability);
      plainFormData.price = parseFloat(plainFormData.price);
      const formDataJsonString = JSON.stringify(plainFormData);
      await editProduct(id, formDataJsonString);
      location.reload();
    };

    const deleteProductsHandler = async (event) => {
      let ids = getCheckedIds();
      await deleteProducts({ productIDs: ids });
      location.reload();
    }

    document.getElementById('multiple-delete').addEventListener('click', (event) => deleteProductsHandler(event));

    document.getElementById('table-body').innerHTML = renderProducts();
    document
      .getElementById('add-product-form')
      .addEventListener('submit', (event) => createProductHandler(event));

    let deleteBtns = document.getElementsByClassName('delete-product-btn');
    for (let btn of deleteBtns) {
      btn.addEventListener('click', (event) => deleteProductHandler(event));
    }

    let editForms = document.getElementsByClassName('edit-product-form');
    for (let form of editForms) {
      form.addEventListener('submit', (event) => editProductHandler(event));
    }
  },
};

export default Products;
