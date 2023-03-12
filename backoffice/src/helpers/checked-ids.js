import $ from 'jquery'

export function getCheckedIds() {
    let checkeds = $('#table-body .form-check-input:checkbox:checked')
    let ids = []
    for (let c of checkeds){
        let tr = c.closest('tr')
        ids.push(tr.querySelector(".id").innerHTML.substr(1))
    }
    return ids
}