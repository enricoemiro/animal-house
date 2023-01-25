// TODO settare nel modal edit i default dei select
function populateProducts(products, categories) {
    let catSelect = ''
    for (let cat of categories) {
        catSelect += `<option value="${cat.id}">${cat.name}</option>` // TODO capire sta cosa dei id/category
        console.log(cat.id)
    }
    document.getElementById("category").innerHTML = catSelect

    var tbody = document.getElementById("table-body")

    for (var prod of products) {

        let catS = ''

        for (let cat of categories) {
            if (cat.id == prod.category.id) {
                catS += `<option value="${cat.id}" selected>${cat.name}</option>`
            }
            else {
                catS += `<option value="${cat.id}">${cat.name}</option>`
            }
        }

        tbody.innerHTML += `
        <tr id="${prod.id}">
            <th scope="row">
                <input class="form-check-input" type="checkbox" value="" aria-label="checkbox to select row">
            </th>
            <td class="id">#${prod.id}</td>
            <td class="name">${prod.name}</td>
            <td class="category">${prod.category.name}</td>
            <td class="price">$${prod.price}</td>
            <td class="availability">${prod.availability}</td>
            <td><button type="button" class="btn btn-danger m-3" onclick="return deleteProduct(event)">Delete Item</button>
            <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
            data-bs-target="#edit-item-${prod.id}">Edit Item</button>
                <!-- Modal -->
                <form action="" method="post" id="edit-product-form-${prod.id}">
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
                                        <input type="number" class="form-control" name="price" aria-label="Dollar amount" value=${prod.price} required>
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
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" onclick="return editProduct(event)" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
            <td>
                <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal"
                data-bs-target="#upload-images-${prod.id}"><i class="fa-solid fa-image"></i></button>
                <!-- Modal -->
                <form action="" method="post" id="upload-images-form-${prod.id}">
                    <div class="modal fade" id="upload-images-${prod.id}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5">Upload Images</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <input class="form-control" type="file" id="img-upload-${prod.id}" required multiple>
                                    </div>
                              
                                </div>
                                <div class="modal-footer">
                                    <button type="button cancel-modal" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button save-modal submit" onclick="return uploadImages(event)" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
        </tr>`
    }
}

// HELPERS
function getCheckedIds() {
    var checkeds = $('#table-body .form-check-input:checkbox:checked')
    var ids = []
    for (var c of checkeds) {
        let tr = c.parentElement.parentElement
        ids.push(tr.querySelector(".id").innerHTML.substr(1))
    }
    return ids
}

// GET ALL CATEGORIES
const catFetch = fetch('http://localhost:3000/api/v1/admin/get/categories', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => (response.json()))

// GET ALL PRODUCTS
const prodFetch = fetch('http://localhost:3000/api/v1/admin/get/products', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())

// GET ALL
const allData = Promise.all([catFetch, prodFetch]);
allData.then((data => { categories = data[0]; populateProducts(data[1], categories) }));

// CREATE NEW PRODUCT
function postNewProduct(event) {
    event.preventDefault()
    const form = document.getElementById("add-products-form")
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.availability = parseInt(plainFormData.availability)
    plainFormData.price = parseInt(plainFormData.price)
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    fetch('http://localhost:3000/api/v1/admin/create/product', {
        method: "POST", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// UPLOAD IMAGES
function uploadImages(event) {
    event.preventDefault()
    let id = event.target.closest("tr").id

    const input = document.getElementById(`img-upload-${id}`);

    fetch('http://localhost:3000/api/v1/product/update/picture', {
        method: "PUT", body: input.files, credentials: "include", headers: {
            'Content-Type': 'multipart',
        },
    })
        // .then(response => window.location.reload())
        .catch(error => console.log(error))
}

// EDIT PRODUCT
function editProduct(event) {
    event.preventDefault()
    let id = event.target.closest("tr").id
    const form = document.getElementById(`edit-product-form-${id}`)
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.availability = parseInt(plainFormData.availability)
    plainFormData.price = parseInt(plainFormData.price)
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch(`http://localhost:3000/api/v1/admin/edit/product/${id}`, {
        method: "PUT", body: formDataJsonString, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .catch(error => console.log(error))
}


// DELETE PRODUCT 
function deleteProduct(event) {
    let id = event.target.closest("tr").id
    fetch(`http://localhost:3000/api/v1/admin/delete/product/${id}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// DELETE PRODUCTS 
function deleteProducts(event) {
    ids = getCheckedIds()
    idsJson = JSON.stringify({ productIDs: ids })
    fetch(`http://localhost:3000/api/v1/admin/delete/products`, {
        method: 'DELETE', body: idsJson, credentials: "include", headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// function buildCategories(categories){
//     console.log(categories)
// }

// fetch('http://localhost:3000/api/v1/category/get/all/categories', {
//     method: "GET", credentials: 'include', headers: {
//         'Content-Type': 'application/json',
//     },
// })
// .then((response) => response.json())
// .then((data) => buildCategories(data));
