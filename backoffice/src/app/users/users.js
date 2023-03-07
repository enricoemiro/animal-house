import { Grid, h } from 'gridjs';
import { RowSelection } from 'gridjs/plugins/selection';

export const Users = () => {
  new Grid({
    columns: [
      {
        id: 'checkbox',
        name: '',
        plugin: {
          component: RowSelection,
        },
        sort: false,
      },
      'Name',
      'Email',
      'Phone Number',
      {
        id: 'actions',
        name: 'Actions',
        sort: false,
        formatter: (cell, row) => {
          return h(
            'button',
            {
              className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
              onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`),
            },
            'Edit',
          );
        },
      },
    ],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
    ],
    sort: true,
    search: true,
    pagination: true,
    fixedHeader: true,
    height: '500px',
  }).render(document.getElementById('app'));
};
