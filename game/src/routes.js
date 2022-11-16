import { createBrowserRouter } from 'react-router-dom';

import Login from '@app/auth/login/Login';
import Base from '@app/auth/shared/Base';
import Signup from '@app/auth/signup/Signup';
import Home from '@app/home/Home';
import Memory from '@app/memory/Memory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/memory',
    element: <Memory />,
  },
  {
    path: '/auth',
    element: <Base />,
    children: [
      { path: 'login', element: <Login />, index: true },
      { path: 'signup', element: <Signup />, index: true },
    ],
  },
]);

export default router;
