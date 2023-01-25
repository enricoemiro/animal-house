function populateActivities(activities) {
    var tbody = document.getElementById("table-body")
    let select = document.getElementById("activity-select")
    let names = []
    console.log(activities)
    for (var act of activities) {
        if (act.availability > 0) {
            bgcolor = "text-bg-info"
            av = "Free: " + act.availability + " spots left"
        } else {
            bgcolor = "text-bg-warning"
            av = "Full"
        }

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
            <td>${new Date(act.dateOfPerformance).toLocaleDateString()}</td>
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
                <button class="btn btn-primary rounded justify-content-end" type="button" data-bs-toggle="modal"
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
                                <div class="modal-footer">
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" class="btn btn-primary">Save</button>
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

fetch('http://localhost:3000/api/v1/activity/get/live/activities', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => populateActivities(data));

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
        method: "PUT", body: JSON.stringify({id: usrId}), credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// UPDATE HEAD OFFICE
function updateHeadOffice(event) {
    event.preventDefault()
    id = event.target.closest("tr").id
    const form = document.getElementById(`headoffice-form-${id}`)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    fetch(`http://localhost:3000/api/v1/headoffice/:id/activities/update`, {
        method: "PUT", body: JSON.stringify({ activityIDs: [id], id: plainFormData.id }), credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// FRONT UTILITIES
// TODO problema da risolvere sul formato date! ogni browser fa come vuole
// filter input box
$(document).ready(function () {
    $("#activity-select, #structure-select, #date-select, #time-select").on("keyup change", function () {
        var v1 = $("#activity-select").val().toLowerCase();
        if (v1 != 0) {

            var v2 = $("#structure-select").val().toLowerCase();
            console.log($("#date-select").val())
            var v3 = (($("#date-select").val() != "") ? new Date($("#date-select").val()).toLocaleDateString() : "");
            console.log(v3)
            $("#table-body tr").filter(function () {
                var f1 = ($(this).find("td:eq(0)").text().toLowerCase().indexOf(v1) > -1)
                var f2 = ($(this).find("td:eq(1)").text().toLowerCase().indexOf(v2) > -1)
                var f3 = ($(this).find("td:eq(3)").text().toLowerCase().indexOf(v3) > -1)
                $(this).toggle(f1 && f2 && f3)
            });
        } else { $("#table-body tr:hidden").show() }
    });
});




