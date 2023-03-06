import $ from 'jquery';

export const actSearchbox = () => {
  $(document).ready(function () {
    $('#activity-select, #head-office-select, #mode-select, #date-select').on(
      'change',
      function () {
        var v1 = $('#activity-select').val().toLowerCase();
        var v2 = $('#head-office-select').val().toLowerCase();
        var v3 = $('#mode-select').val().toLowerCase();
        var v4 =
          $('#date-select').val() != ''
            ? new Date($('#date-select').val()).toLocaleDateString()
            : '';
        $('#table-body tr').filter(function () {
          var f1 = $(this).find('td:eq(0)').text().toLowerCase().indexOf(v1) > -1;
          var f2 = $(this).find('td:eq(1)').text().toLowerCase().indexOf(v2) > -1;
          var f3 = $(this).find('td:eq(3)').text().toLowerCase().indexOf(v3) > -1;
          var f4 = $(this).find('td:eq(4)').text().toLowerCase().indexOf(v4) > -1;
          $(this).toggle(f1 && f2 && f3 && f4);
        });
      },
    );
  });
};
