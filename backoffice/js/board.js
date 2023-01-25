// TODO settare nel modal edit i default dei select
function populateProducts(posts) {
    var tbody = document.getElementById("table-body")

    for (var post of posts) {
        tbody.innerHTML += `
        <tr id="${post.id}">
            <th scope="row">
                <input class="form-check-input" type="checkbox" value="" aria-label="checkbox to select row">
            </th>
            <td class="id">#${post.id}</td>
            <td class="author">${post.name}</td>
            <td class="date">${post.date}</td>
            <td class="subject">${post.subject}</td>
            <td><button type="button" class="btn btn-danger m-3" onclick="return deletePost(event)">Delete Post</button></td>
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

// GET ALL PRODUCTS
const prodFetch = fetch('http://localhost:3000/api/v1/admin/get/products', {
    method: "GET", credentials: 'include', headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())


// CREATE NEW POST
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

// DELETE POST 
function deletePost(event) {
    let id = event.target.closest("tr").id
    fetch(`http://localhost:3000/api/v1/admin/delete/product/${id}`, {
        method: 'DELETE', credentials: "include",
    })
        .then(response => window.location.reload())
        .then(response => console.log(response))
}

// DELETE POSTS 
function deletePosts(event) {
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
