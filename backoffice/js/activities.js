function populateActivities(activities, headOffices) {
    // fill create activity head office select
    let headOfficeSelect = ''
    for (let ho of headOffices) {
        headOfficeSelect += `<option value="${ho.id}">${ho.location}, ${ho.streetAddress}</option>`
    }
    document.getElementById("headOffice").innerHTML = headOfficeSelect

    // fill filter select
    headOfficeSelect = ''
    for (let ho of headOffices) {
        headOfficeSelect += `<option value="${ho.location}, ${ho.streetAddress}">${ho.location}, ${ho.streetAddress}</option>`
    }
    document.getElementById("head-office-select").innerHTML += headOfficeSelect

    var tbody = document.getElementById("table-body")
    let select = document.getElementById("activity-select")
    let names = []
    console.log(activities)
    for (var act of activities) {
        // fill edit activity head office select
        let hoS = ''
        for (let ho of headOffices) {
            if (ho.id == act.headOffice.id) {
                hoS += `<option value="${ho.id}" selected>${ho.location}, ${ho.streetAddress}</option>`
            }
            else {
                hoS += `<option value="${ho.id}">${ho.location}, ${ho.streetAddress}</option>`
            }
        }
        // fill availability select 
        console.log(act.mode)
        if (act.availability > 0) {
            bgcolor = "text-bg-info"
            av = "Free: " + act.availability + " spots left"
        } else {
            bgcolor = "text-bg-warning"
            av = "Full"
        }

        // fill mode select
        if (act.mode == "IN_PERSON") {
            mode = "Live"
            modeSelect = `<option value="ONLINE">Online</option>
                            <option value="IN_PERSON" selected>Live</option>`
        } else {
            mode = "Online"
            modeSelect = `<option value="ONLINE" selected>Online</option>
                            <option value="IN_PERSON">Live</option>`
        }

        let headoffice = ''
        if (act.headOffice != null) {
            headoffice = act.headOffice.location + ", " + act.headOffice.streetAddress
        } else {
            headoffice = `<form id="headoffice-form-${act.id}">
                            <div class="input-group w-50">
                                <input type="text" class="form-control" name="id" placeholder="Head Office ID" aria-label="head office id" aria-describedby="add-headoffice">
                                <button class="btn btn-outline-secondary" type="button submit" onclick="return updateHeadOffice(event)" id="add-headoffice">Add</button>
                            </div>
                        </form>`
        }

        let email = ''
        console.log(act.users)
        for (let user of act.users) {
            email += `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${user.email}
                        <button id="${user.id}" onclick="return unbookActivity(event)" class="btn-close"></button>
                    </li>`
            console.log(email)
        }

        tbody.innerHTML += `
        <tr id="${act.id}">
            <td>${act.name}</td>
            <td>${headoffice}</td>
            <td><span class="badge rounded-pill ${bgcolor}">${av}</span></td>
            <td>${mode}</td>
            <td>${new Date(act.dateOfPerformance).toLocaleDateString()}</td>
            <td>
                <button type="button" class="btn btn-danger m-3" onclick="return deleteActivity(event)">Delete Activity</button>
                <button class="btn btn-primary rounded justify-content-end m-1" type="button" data-bs-toggle="modal"
                data-bs-target="#edit-activity-${act.id}">Edit Activity</button>
                    <!-- Edit Acitivity Modal -->
                    <form id="edit-activity-form-${act.id}" onsubmit="return postNewService(event)">
                        <div class="modal fade" id="edit-activity-${act.id}" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">Edit Activity</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" name="name" placeholder="name" value="${act.name}" required
                                                aria-label="service name">
                                        </div>
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="availability">Availability</label>
                                            <input type="number" name="availability" class="form-control" id="availability"
                                                required aria-label="availability" value="${act.availability}">
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
                                                class="form-control" value="${act.dateOfPerformance}">
                                        </div>
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="mode">Mode</label>
                                            <select name="mode" class="form-select" id="mode" required>
                                                ${modeSelect}
                                            </select>
                                        </div>
                                        <label class="px-1" for="floatingTextarea">Description</label>
                                        <textarea class="form-control" name="description" placeholder="Description"
                                                id="floatingTextarea">${act.description}</textarea>


                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="cancel-modal" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Cancel</button>
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
                data-bs-target="#book-activity-${act.id}">Book Activity</button>
                <!-- Book Activity Modal -->
                <form id="book-activity-form-${act.id}" method="put" onsubmit="return bookActivity(event)">
                    <div class="modal fade" id="book-activity-${act.id}" tabindex="-1" aria-hidden="true">
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
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
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
                    <div class="modal fade" id="reservations-${act.id}" tabindex="-1" aria-hidden="true">
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
        </tr>`

        if (!names.includes(act.name)) {
            select.innerHTML += `<option value="${act.name}">${act.name}</option>`
            names.push(act.name)
        }

    }
}

// GET ALL ACTIVITIES
const actFetch = fetch('http://localhost:3000/api/v1/activity/get/activities', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => (response.json()))

// GET ALL HEADOFFICES
const headOfficeFetch = fetch('http://localhost:3000/api/v1/admin/get/headoffices', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())

// GET ALL
const allData = Promise.all([actFetch, headOfficeFetch]);
allData.then((data => { console.log(data[1]), populateActivities(data[0], data[1]) }));

// // GET ALL ACTIVITIES
// fetch('http://localhost:3000/api/v1/activity/get/activities', {
//     method: "GET", credentials: 'include', headers: {
//         'Content-Type': 'application/json',
//     },
// })
//     .then((response) => response.json())
//     .then((data) => populateActivities(data));

// CREATE NEW ACTIVITY
function postNewActivity(event) {
    event.preventDefault()
    const form = document.getElementById("add-activities-form")
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.availability = parseInt(plainFormData.availability)
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    fetch('http://localhost:3000/api/v1/admin/create/activity', {
        method: "POST", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// EDIT ACTIVITY
function editActivity(event) {
    event.preventDefault()
    id = event.target.closest("tr").id
    const form = document.getElementById(`edit-activity-form-${id}`)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.availability = parseInt(plainFormData.availability)
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch(`http://localhost:3000/api/v1/admin/edit/activity/${id}`, {
        method: "PUT", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// DELETE ACTIVITY 
function deleteActivity(event) {
    id = event.target.closest("tr").id
    console.log(id)
    fetch(`http://localhost:3000/api/v1/admin/delete/activity/${id}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// ACTIVITY BOOKING MANAGEMENT
// BOOK ACTIVITY
function bookActivity(event) {
    event.preventDefault()
    actId = event.target.closest("tr").id
    const form = document.getElementById(`book-activity-form-${actId}`)
    console.log(actId)
    console.log(form)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch(`http://localhost:3000/api/v1/admin/book/activity/${actId}`, {
        method: "PUT", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// UNBOOK ACTIVITY
function unbookActivity(event) {
    event.preventDefault()
    actId = event.target.closest("tr").id
    console.log(actId)
    usrId = event.target.id
    console.log(usrId)

    fetch(`http://localhost:3000/api/v1/admin/unbook/activity/${actId}`, {
        method: "PUT", body: JSON.stringify({ id: usrId }), credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// FRONT UTILITIES
// TODO problema da risolvere sul formato date! ogni browser fa come vuole
// TODO finire di impostare i filtri
// filter input box
$(document).ready(function () {
    $("#activity-select, #head-office-select, #mode-select, #date-select").on("change", function () {
        var v1 = $("#activity-select").val().toLowerCase();
        var v2 = $("#head-office-select").val().toLowerCase();
        var v3 = $("#mode-select").val().toLowerCase();
        var v4 = (($("#date-select").val() != "") ? new Date($("#date-select").val()).toLocaleDateString() : "");
        $("#table-body tr").filter(function () {
            var f1 = ($(this).find("td:eq(0)").text().toLowerCase().indexOf(v1) > -1)
            var f2 = ($(this).find("td:eq(1)").text().toLowerCase().indexOf(v2) > -1)
            var f3 = ($(this).find("td:eq(3)").text().toLowerCase().indexOf(v3) > -1)
            var f4 = ($(this).find("td:eq(4)").text().toLowerCase().indexOf(v4) > -1)
            $(this).toggle(f1 && f2 && f3 && f4)
        });
    });
});

