import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Base from './shared/Base';

export default createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      {path: '/', element: <Login />, index: true},
      {path: 'signup', element: <Signup />, index: false},
    ],
  },
]);