import { html } from 'common-tags';

import { searchbox } from '../../../helpers/searchbox';
import { createHeadOffice } from '../api/create-headOffice.api';
import { deleteHeadOffice } from '../api/delete-headOffice.api';
import { editHeadOffice } from '../api/edit-headOffice.api';
import { getHeadOffices } from '../api/get-headOffices.api';

let HeadOffices = {
  render: () => {
    return html`<main class="mt-5 pt-5">
      <h2>All Head Offices</h2>
      <div span class="input-group mb-4">
        <input
          type="text"
          class="form-control rounded"
          placeholder="Search for Head Offices"
          id="table-search"
          aria-label="Product search bar"
        />
        <button
          title="Delete"
          aria-label="delete"
          class="btn btn-outline-danger border-0 rounded mx-2"
          onclick="return deleteHeadOffices(event)"
          type="button"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

        <button
          class="btn btn-primary rounded justify-content-end"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#add-headoffice"
        >
          <i class="fa-solid fa-plus"></i> Add Head Office
        </button>

        <!-- Modal -->
        <form id="add-headoffice-form" autocomplete="off">
          <div class="modal fade" id="add-headoffice" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5">Add Head Office</h1>
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
                      name="location"
                      class="form-control"
                      placeholder="Location"
                      aria-label="location"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      name="streetAddress"
                      class="form-control"
                      placeholder="Address"
                      aria-label="streetAddress"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      name="coordinates"
                      class="form-control"
                      placeholder="Coordinates"
                      aria-label="coordinates"
                      required
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="save-modal submit" class="btn btn-primary">Save</button>
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
            <th scope="col">Location</th>
            <th scope="col">Address</th>
            <th scope="col">Coordinates</th>
            <td scope="col"></td>
          </tr>
        </thead>
        <tbody class="align-middle" id="table-body"></tbody>
      </table>
    </main>`;
  },
  after_render: async () => {
    // navbar active
    document.getElementById('headOffices-nav').classList.add('active');
    searchbox();

    const headOffices = await getHeadOffices();
    const renderHeadOffices = () => {
      let table = ``;
      for (let ho of headOffices) {
        table += `
                <tr id="${ho.id}">
                    <td scope="row">
                        <input class="form-check-input body-check" type="checkbox" value="" aria-label="checkbox to select row">
                    </td>
                    <td class="name">#${ho.id}</td>
                    <td class="name">${ho.location}</td>
                    <td class="id">${ho.streetAddress}</td>
                    <td class="email">${ho.coordinates}</td>
                    <td><button type="button" class="btn btn-danger m-3 delete-headoffice-btn">Delete HeadOffice</button>
                        <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                                data-bs-target="#edit-headoffice-${ho.id}">Edit HeadOffice</button>
                        <!-- Edit HeadOffice Modal -->
                        <form class="edit-headoffice-form">
                            <div class="modal fade" id="edit-headoffice-${ho.id}" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5">Edit HeadOffice</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <div class="input-group mb-3">
                                        <input type="text" name="location" value="${ho.location}" class="form-control" placeholder="Location"
                                            aria-label="location" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name="streetAddress" value="${ho.streetAddress}" class="form-control" placeholder="address"
                                                    aria-label="address" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name="coordinates" value="${ho.coordinates}" class="form-control" placeholder="coordinates"
                                                    aria-label="coordinates" required>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button save-modal submit" id="${ho.id}" onclick="return editHeadOffice(event)" class="btn btn-primary">Save</button>
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

    const createHeadOfficeHandler = async (event) => {
      event.preventDefault();
      const form = document.getElementById('add-headoffice-form');
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      plainFormData.coordinates = plainFormData.coordinates.replace(/\s/g, '');
      const formDataJsonString = JSON.stringify(plainFormData);
      await createHeadOffice(formDataJsonString);
      location.reload();
    };

    const deleteHeadOfficeHandler = async (event) => {
      let id = event.target.closest('tr').id;
      await deleteHeadOffice(id);
      location.reload();
    };

    const editHeadOfficeHandler = async (event) => {
      event.preventDefault();
      let id = event.target.closest('tr').id;
      const form = event.target;
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      await editHeadOffice(id, formDataJsonString);
      location.reload();
    };

    document.getElementById('table-body').innerHTML = renderHeadOffices();
    document
      .getElementById('add-headoffice-form')
      .addEventListener('submit', (event) => createHeadOfficeHandler(event));

    let deleteBtns = document.getElementsByClassName('delete-headoffice-btn');
    for (let btn of deleteBtns) {
      btn.addEventListener('click', (event) => deleteHeadOfficeHandler(event));
    }

    let editForms = document.getElementsByClassName('edit-headoffice-form');
    for (let form of editForms) {
      form.addEventListener('submit', (event) => editHeadOfficeHandler(event));
    }
  },
};
export default HeadOffices;
