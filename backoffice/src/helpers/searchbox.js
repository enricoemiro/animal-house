import $ from 'jquery';

export const searchbox = () => {
  $(document).ready(function () {
    $('#table-search').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#table-body tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
};