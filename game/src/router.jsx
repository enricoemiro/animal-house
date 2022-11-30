import { Navigate, createBrowserRouter } from 'react-router-dom';

import Home from './home/Home';
import Memory from './memory/Memory';

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/memory',
    element: <Memory />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);