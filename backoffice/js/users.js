function populateUsers(users) {
    var tbody = document.getElementById("table-body")
    for (var user of users) {

        // EDIT USER GENDER SELECT
        if (user.gender == "MALE") {
            genderSelect = `<option value="MALE" selected>M</option>
                            <option value="FEMALE">F</option>
                            <option value="OTHER">Other</option> `
        } else if (user.gender == "FEMALE") {
            genderSelect = `<option value="MALE">M</option>
                            <option value="FEMALE" selected>F</option>
                            <option value="OTHER">Other</option> `
        } else {
            genderSelect = `<option value="MALE">M</option>
                            <option value="FEMALE">F</option>
                            <option value="OTHER" selected>Other</option> `
        }

        // EDIT USER ROLE SELECT
        if (user.role == "ADMIN") {
            roleSelect = `<option value="ADMIN" selected>Admin</option>
                            <option value="USER">User</option>`
        } else {
            roleSelect = `<option value="ADMIN">Admin</option>
                            <option value="USER" selected>User</option> `
        }

        tbody.innerHTML += `
        <tr>
            <th scope="row">
                <input class="form-check-input body-check" type="checkbox" value="" aria-label="checkbox to select row">
            </th>
            <td class="id">#${user.id}</td>
            <td class="name">${user.name}</td>
            <td class="email">${user.email}</td>
            <td class="role">${user.role}</td>
            <td class="gender">${user.gender}</td>
            <td class="birth">${new Date(user.dateOfBirth).toLocaleDateString("en-GB")}</td>
            <td><button type="button" class="btn btn-danger m-3" onclick="return deleteUser(event)">Delete User</button>
                <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                        data-bs-target="#edit-user-${user.id}">Edit User</button>
                <!-- Edit User Modal -->
                <form method="put" id="edit-user-form-${user.id}">
                    <div class="modal fade" id="edit-user-${user.id}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5">Edit User</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <input name="name" type="text" class="form-control" placeholder="Name" aria-label="name" value=${user.name} required>
                                    </div>

                                    <div class="input-group mb-3">
                                        <input name="email" type="text" class="form-control" placeholder="Email" aria-label="Email" value=${user.email} required>
                                    </div>
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="inputGroupSelect01">Role</label>
                                        <select name="role" class="form-select" id="edit-role-${user.id}" required>
                                            ${roleSelect}
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="inputGroupSelect02">Gender</label>
                                        <select name="gender" class="form-select" id="inputGroupSelect02" required>
                                            ${genderSelect}
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="dselect">Date of Birth</label>
                                        <input type="date" name="dateOfBirth" id="nascita" class="form-control"
                                            aria-label="dateOfBirth" value="${user.dateOfBirth}">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" id="${user.id}" onclick="return editUser(event)" class="btn btn-primary">Save</button>
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
        let tr = c.parentElement.parentElement
        ids.push(tr.querySelector(".id").innerHTML.substr(1))
    }
    return ids
}

// GET ALL USERS
fetch('http://localhost:3000/api/v1/admin/get/users', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => populateUsers(data));


// CREATE NEW USER
function postNewUser(event) {
    event.preventDefault()
    const form = document.getElementById("add-user-form")
    console.log(form)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    fetch('http://localhost:3000/api/v1/admin/create/user', {
        method: "POST", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// EDIT USER
function editUser(event) {
    event.preventDefault()
    id = event.target.id
    const form = document.getElementById(`edit-user-form-${id}`)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch(`http://localhost:3000/api/v1/admin/edit/user/${id}`, {
        method: "PUT", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// DELETE USER 
function deleteUser(event) {
    fetch(`http://localhost:3000/api/v1/admin/delete/user/${getId(event)}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// DELETE USERS 
function deleteUsers(event) {
    ids = getCheckedIds()
    idsJson = JSON.stringify({ userIDs: ids })
    fetch(`http://localhost:3000/api/v1/admin/delete/users`, {
        method: 'DELETE', body: idsJson, credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}
// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/