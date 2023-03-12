import { html } from 'common-tags';

import { actSearchbox } from '../../../helpers/act-searchbox';
import { getHeadOffices } from '../../headOffices/api/get-headOffices.api';
import { bookActivity } from '../api/book-activity.api';
import { createActivity } from '../api/create-activity.api';
import { deleteActivity } from '../api/delete-activity.api';
import { editActivity } from '../api/edit-activity.api';
import { getActivities } from '../api/get-activities.api';
import { unbookActivity } from '../api/unbook-activity.api';

let Activities = {
  render: () => {
    return html`<main class="mt-5 pt-5">
                                    <h2>All Activities</h2>
                                    <div class="input-group mb-3">
                                        <div class="form-floating mx-1">
                                            <select class="form-select border-secondary rounded" id="activity-select">
                                                <option value="" selected>All Activities</option>
                                            </select>
                                            <label class="small" for="activity-select">Select Activity</label>
                                        </div>
                                        <div class="form-floating mx-1">
                                            <select class="form-select border-secondary rounded" id="head-office-select">
                                                <option value="" selected>All Head Offices</option>
                                            </select>
                                            <label class="small" for="head-office-select">Select Head Office</label>
                                        </div>
                                        <div class="form-floating mx-1">
                                            <select class="form-select border-secondary rounded" id="mode-select">
                                                <option value="" selected>---</option>
                                                <option>Live</option>
                                                <option>Online</option>
                                            </select>
                                            <label class="small" for="mode-select">Select Mode</label>
                                        </div>
                                        <input aria-label="select date" type="date" class="border-secondary rounded mx-2" id="date-select" name="date">
                                        <button class="btn btn-primary rounded justify-content-end m-1" type="button" data-bs-toggle="modal"
                                            data-bs-target="#add-service"><i class="fa-solid fa-plus"></i> Create Activity</button>
                                        <!-- Add Service Modal -->
                                        <form id="add-activity-form" autocomplete="off">
                                            <div class="modal fade" id="add-service" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5">Create Activity</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control" name="name" placeholder="Name" required
                                                                    aria-label="service name">
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="availability">Max Availability</label>
                                                                <input type="number" name="availability" class="form-control" id="availability"
                                                                    required aria-label="availability">
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="mode">Head Office</label>
                                                                <select name="headOfficeId" class="form-select" id="headOffice" required>
                                                                </select>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="dselect">Date</label>
                                                                <input type="date" name="dateOfPerformance" name="" id="dselect"
                                                                    class="form-control">
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="mode">Mode</label>
                                                                <select name="mode" class="form-select" id="mode" required>
                                                                    <option value="ONLINE" selected>Online</option>
                                                                    <option value="IN_PERSON">Live</option>
                                                                </select>
                                                            </div>
                                                            <textarea class="form-control" name="description" placeholder="Description"
                                                                id="floatingTextarea"></textarea>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button submit" id="save-modal" class="btn btn-primary">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <table class="table table-hover">
                                        <thead class="bg-light">
                                            <tr>
                                                <th scope="col">Activity</th>
                                                <th scope="col">Head Office</th>
                                                <th scope="col">Availability</th>
                                                <th scope="col">Mode</th>
                                                <th scope="col">Date</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="align-middle" id="table-body"></tbody>
                                </main>`;
  },
  after_render: async () => {
    // navbar active
    document.getElementById('activities-nav').classList.add('active');
    actSearchbox();

    const activities = await getActivities();
    const headOffices = await getHeadOffices();

    let renderActivities = () => {
      // fill create activity head office select
      let headOfficeSelect = '';
      for (let ho of headOffices) {
        headOfficeSelect += `<option value="${ho.id}">${ho.location}, ${ho.streetAddress}</option>`;
      }
      document.getElementById('headOffice').innerHTML = headOfficeSelect;

      // fill filter select
      headOfficeSelect = '';
      for (let ho of headOffices) {
        headOfficeSelect += `<option value="${ho.location}, ${ho.streetAddress}">${ho.location}, ${ho.streetAddress}</option>`;
      }
      document.getElementById('head-office-select').innerHTML += headOfficeSelect;

      let table = ``;
      let select = document.getElementById('activity-select');
      let names = [];
      for (var act of activities) {
        // fill edit activity head office select
        let hoS = '';
        for (let ho of headOffices) {
          if (ho.id == act.headOffice.id) {
            hoS += `<option value="${ho.id}" selected>${ho.location}, ${ho.streetAddress}</option>`;
          } else {
            hoS += `<option value="${ho.id}">${ho.location}, ${ho.streetAddress}</option>`;
          }
        }
        // fill availability select
        let bgcolor;
        let av;
        if (act.availability > 0) {
          bgcolor = 'text-bg-info';
          av = 'Free: ' + act.availability + ' spots left';
        } else {
          bgcolor = 'text-bg-warning';
          av = 'Full';
        }

        // fill mode select
        let mode;
        let modeSelect;
        if (act.mode == 'IN_PERSON') {
          mode = 'Live';
          modeSelect = `<option value="ONLINE">Online</option>
                            <option value="IN_PERSON" selected>Live</option>`;
        } else {
          mode = 'Online';
          modeSelect = `<option value="ONLINE" selected>Online</option>
                            <option value="IN_PERSON">Live</option>`;
        }

        let headoffice = '';
        if (act.headOffice != null) {
          headoffice = act.headOffice.location + ', ' + act.headOffice.streetAddress;
        } else {
          headoffice = `<form id="headoffice-form-${act.id}">
                            <div class="input-group w-50">
                                <input type="text" class="form-control" name="id" placeholder="Head Office ID" aria-label="head office id" aria-describedby="add-headoffice">
                                <button class="btn btn-outline-secondary" type="button submit" onclick="return updateHeadOffice(event)" id="add-headoffice">Add</button>
                            </div>
                        </form>`;
        }

        let email = '';
        for (let user of act.users) {
          email += `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${user.email}
                        <button id="${user.id}" class="btn-close unbook-activity-btn"></button>
                    </li>`;
        }

        table += `
                    <tr id="${act.id}">
                        <td>${act.name}</td>
                        <td>${headoffice}</td>
                        <td><span class="badge rounded-pill ${bgcolor}">${av}</span></td>
                        <td>${mode}</td>
                        <td>${new Date(act.dateOfPerformance).toLocaleDateString()}</td>
                        <td>
                            <button type="button" class="btn btn-danger m-3 delete-activity-btn">Delete Activity</button>
                            <button class="btn btn-primary rounded justify-content-end m-1" type="button" data-bs-toggle="modal"
                            data-bs-target="#edit-activity-${act.id}">Edit Activity</button>
                                <!-- Edit Acitivity Modal -->
                                <form class="edit-activity-form">
                                    <div class="modal fade" id="edit-activity-${
                                      act.id
                                    }" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5">Edit Activity</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="input-group mb-3">
                                                        <input type="text" class="form-control" name="name" placeholder="name" value="${
                                                          act.name
                                                        }" required
                                                            aria-label="service name">
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text" for="availability">Availability</label>
                                                        <input type="number" name="availability" class="form-control" id="availability"
                                                            required aria-label="availability" value="${
                                                              act.availability
                                                            }">
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text" for="mode">Head Office</label>
                                                        <select name="headOfficeId" class="form-select" id="headOffice" required>
                                                            ${hoS}
                                                        </select>
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text" for="dselect">Date</label>
                                                        <input type="date" name="dateOfPerformance" name="" id="dselect"
                                                            class="form-control" value="${act.dateOfPerformance.slice(
                                                              0,
                                                              10,
                                                            )}">
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text" for="mode">Mode</label>
                                                        <select name="mode" class="form-select" id="mode" required>
                                                            ${modeSelect}
                                                        </select>
                                                    </div>
                                                    <label class="px-1" for="floatingTextarea">Description</label>
                                                    <textarea class="form-control" name="description" placeholder="Description"
                                                            id="floatingTextarea">${
                                                              act.description
                                                            }</textarea>


                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button submit" id="save-modal" onclick="return editActivity(event)" class="btn btn-primary">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </td>
                        <td>
                            <button type="button" class="btn btn-success m-3" data-bs-toggle="modal"
                            data-bs-target="#book-activity-${act.id}" ${
          act.availability == 0 ? 'disabled' : ''
        }>Book Activity</button>
                            <!-- Book Activity Modal -->
                            <form class="book-activity-form">
                                <div class="modal fade" id="book-activity-${
                                  act.id
                                }" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5">Book Activity</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Add Reservation</p>
                                                <div class="input-group mb-3">
                                                    <input name="id" type="text" class="form-control" placeholder="Client ID" required
                                                        aria-label="client id">
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button save-modal submit" class="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </td>
                        <td>
                            <button class="btn btn-secondary rounded justify-content-end" type="button" data-bs-toggle="modal"
                            data-bs-target="#reservations-${act.id}">
                            Manage Reservations</button>
                            <!-- Modal -->
                                <div class="modal fade" id="reservations-${
                                  act.id
                                }" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5">Manage Reservations</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <ul class="list-group">
                                                    ${email}                                        
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </td>
                    </tr>`;

        if (!names.includes(act.name)) {
          select.innerHTML += `<option value="${act.name}">${act.name}</option>`;
          names.push(act.name);
        }
      }
      return table;
    };

    const createActivityHandler = async (event) => {
      event.preventDefault();
      const form = document.getElementById('add-activity-form');
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      plainFormData.dateOfPerformance = new Date(plainFormData.dateOfPerformance);
      plainFormData.availability = parseInt(plainFormData.availability);
      const formDataJsonString = JSON.stringify(plainFormData);
      await createActivity(formDataJsonString);
      location.reload();
    };

    const deleteActivityHandler = async (event) => {
      let id = event.target.closest('tr').id;
      await deleteActivity(id);
      location.reload();
    };

    const editActivityHandler = async (event) => {
      event.preventDefault();
      let id = event.target.closest('tr').id;
      const form = event.target;
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      plainFormData.availability = parseInt(plainFormData.availability);
      plainFormData.dateOfPerformance = new Date(plainFormData.dateOfPerformance);
      const formDataJsonString = JSON.stringify(plainFormData);
      await editActivity(id, formDataJsonString);
      location.reload();
    };

    const bookActivityHandler = async (event) => {
      event.preventDefault();
      let actId = event.target.closest('tr').id;
      const form = event.target;
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      await bookActivity(actId, formDataJsonString);
      location.reload();
    };

    const unbookActivityHandler = async (event) => {
      event.preventDefault();
      let actId = event.target.closest('tr').id;
      let usrId = event.target.id;
      await unbookActivity(actId, usrId);
      location.reload();
    };

    document.getElementById('table-body').innerHTML = renderActivities();
    document
      .getElementById('add-activity-form')
      .addEventListener('submit', (event) => createActivityHandler(event));

    let deleteBtns = document.getElementsByClassName('delete-activity-btn');
    for (let btn of deleteBtns) {
      btn.addEventListener('click', (event) => deleteActivityHandler(event));
    }

    let unbookBtns = document.getElementsByClassName('unbook-activity-btn');
    for (let btn of unbookBtns) {
      btn.addEventListener('click', (event) => unbookActivityHandler(event));
    }

    let editForms = document.getElementsByClassName('edit-activity-form');
    for (let form of editForms) {
      form.addEventListener('submit', (event) => editActivityHandler(event));
    }

    let bookForms = document.getElementsByClassName('book-activity-form');
    for (let form of bookForms) {
      form.addEventListener('submit', (event) => bookActivityHandler(event));
    }
  },
};
export default Activities;
