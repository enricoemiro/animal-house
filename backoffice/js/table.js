$(document).ready(function () {
    $("#check-all").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });

    // da fixare
    // $("???").click(function () {
    //     console.log("ciao")
    //     console.log($('#table-body input:checkbox:checked').length)
    //     if ($('#table-body input:checkbox:checked').length == 0) {
    //         $("#check-all").prop('checked', false)
    //     }
    // });
});