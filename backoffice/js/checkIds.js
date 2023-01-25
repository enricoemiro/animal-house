function getChekedIds() {
    var checkeds = $('#table-body .form-check-input:checkbox:checked')
    var ids = []
    for (var c of checkeds){
        let tr = c.parentElement.parentElement
        ids.push(tr.querySelector(".id").innerHTML.substr(1))
    }
}