import { getUsers } from "../api/get-users.api";
import { createUser } from "../api/create-user.api";
import { html } from "common-tags";

export const Users = async () => {
    const users = await getUsers();
    const renderUsers = () => {
        let table = ``
        for (const user of users) {
            let genderSelect
            let roleSelect
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

            table += `
    <tr>
        <td scope="row" aria-label="checkbox">
            <input class="form-check-input body-check" type="checkbox" value="" aria-label="checkbox to select row">
        </td>
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
        return table;
    }

    const postNewUser = async (event) => {
        console.log('ciao prima')
        event.preventDefault()
        const form = document.getElementById("add-user-form")
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log('ciao')
        await createUser(formDataJsonString);
    }

    return html`<main class="mt-5 pt-5">
                    <h2>All Users</h2>
                    <div span class="input-group mb-4">
                        <input type="text" class="form-control rounded" placeholder="Search for users" id="table-search"
                            aria-label="Product search bar">
                        <button title="Delete" aria-label="delete" class="btn btn-outline-danger border-0 rounded mx-2" onclick="return deleteUsers(event)"
                            type="button"><i class="fa-solid fa-trash"></i></button>

                        <button class="btn btn-primary rounded justify-content-end" type="button" data-bs-toggle="modal"
                            data-bs-target="#add-user"><i class="fa-solid fa-plus"></i>
                            Add User</button>

                        <!-- Modal -->
                        <form id="add-user-form" autocomplete="off">
                            <div class="modal fade" id="add-user" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5">Add User</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <input type="text" name="name" class="form-control" placeholder="Name"
                                                    aria-label="name" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="email" name="email" class="form-control" placeholder="Email"
                                                    aria-label="Email" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="password" name="password" class="form-control" placeholder="Password"
                                                    aria-label="password" minlength="8" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="gender">Gender</label>
                                                <select name="gender" class="form-select" id="gender" required>
                                                    <option value="MALE" selected>M</option>
                                                    <option value="FEMALE">F</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="dselect">Date of Birth</label>
                                                <input type="date" name="dateOfBirth" id="nascita" class="form-control"
                                                    aria-label="dateOfBirth">
                                            </div>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="role">Role</label>
                                                <select name="role" class="form-select" id="role" required>
                                                    <option value="ADMIN" selected>Admin</option>
                                                    <option value="USER">User</option>
                                                </select>
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
                                    <input class="form-check-input" type="checkbox" value=""
                                        aria-label="Checkbox for following text input" id="check-all">
                                </td>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Date of Birth</th>
                                <td scope="col"></td>
                            </tr>
                        </thead>
                        <tbody class="align-middle" id="table-body">
                            ${renderUsers()}
                        </tbody>
                    </table>
                    </main>
                    </body>`
}