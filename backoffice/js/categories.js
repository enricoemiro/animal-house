function populateCategories(categories) {
    var tbody = document.getElementById("table-body")
    for (var cat of categories) {

        tbody.innerHTML += `
        <tr>
            <th scope="row">
                <input class="form-check-input body-check" type="checkbox" value="" aria-label="checkbox to select row">
            </th>
            <td class="name">${cat.name}</td>
            <td><button type="button" class="btn btn-danger m-3" onclick="return deleteCategory(event)">Delete Category</button>
                <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                        data-bs-target="#edit-category-${cat.id}">Category Details</button>
                <!-- Edit Category Modal -->
                <form method="put" id="edit-category-form-${cat.id}">
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
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" onclick="return editCategory(event)" class="btn btn-primary">Save</button>
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

// GET ALL CATEGORIES
fetch('http://localhost:3000/api/v1/admin/get/categories', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => populateCategories(data));

// CREATE NEW CATEGORY
function postNewCategory(event) {
    event.preventDefault()
    const form = document.getElementById("add-category-form")
    console.log(form)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    fetch('http://localhost:3000/api/v1/category/create', {
        method: "POST", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// DELETE CATEGORY 
function deleteCategory(event) {
    let tr = event.target.parentElement.parentElement
    let n = tr.querySelector(".name").innerHTML
    fetch(`http://localhost:3000/api/v1/admin/delete/category/${n}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}