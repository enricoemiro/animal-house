function populateHeadOffices(headOffices) {
    var tbody = document.getElementById("table-body")
    for (var ho of headOffices) {
        tbody.innerHTML += `
        <tr id="${ho.id}">
            <th scope="row">
                <input class="form-check-input body-check" type="checkbox" value="" aria-label="checkbox to select row">
            </th>
            <td class="name">#${ho.id}</td>
            <td class="name">${ho.location}</td>
            <td class="id">${ho.streetAddress}</td>
            <td class="email">${ho.coordinates}</td>
            <td><button type="button" class="btn btn-danger m-3" onclick="return deleteHeadOffice(event)">Delete HeadOffice</button>
                <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                        data-bs-target="#edit-headoffice-${ho.id}">Edit HeadOffice</button>
                <!-- Edit HeadOffice Modal -->
                <form method="put" id="edit-headoffice-form-${ho.id}">
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
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" id="${ho.id}" onclick="return editHeadOffice(event)" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
        </tr>
        `
    }
}

// HELPERS
function getId(event) {
    let tr = event.target.parentElement.parentElement
    let id = tr.querySelector(".id").innerHTML.substr(1)
    return id
}

function getCheckedIds() {
    var checkeds = $('#table-body .form-check-input:checkbox:checked')
    var ids = []
    for (var c of checkeds) {
        let id = c.closest("tr").id
        ids.push(id)
    }
    return ids
}

// GET ALL HEADOFFICES
fetch('http://localhost:3000/api/v1/admin/get/headoffices', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => populateHeadOffices(data));


// CREATE NEW HEADOFFICES
function postNewHeadOffice(event) {
    event.preventDefault()
    const form = document.getElementById("add-headoffice-form")
    console.log(form)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.coordinates = plainFormData.coordinates.replace(/\s/g, '');
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    fetch('http://localhost:3000/api/v1/admin/create/headoffice', {
        method: "POST", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// EDIT HEADOFFICE
function editHeadOffice(event) {
    event.preventDefault()
    id = event.target.closest("tr").id
    const form = document.getElementById(`edit-headoffice-form-${id}`)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch(`http://localhost:3000/api/v1/admin/edit/headoffice/${id}`, {
        method: "PUT", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        // .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// DELETE HEADOFFICE 
function deleteHeadOffice(event) {
    id = event.target.closest("tr").id
    fetch(`http://localhost:3000/api/v1/admin/delete/headoffice/${id}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// DELETE HEADOFFICES 
function deleteHeadOffices(event) {
    ids = getCheckedIds()
    console.log(ids)
    idsJson = JSON.stringify({ headOfficeIDs: ids })
    fetch(`http://localhost:3000/api/v1/admin/delete/headoffices`, {
        method: 'DELETE', body: idsJson, credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}
// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/