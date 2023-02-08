import { Navigate, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './app/auth/pages/login.page';
import { RegisterPage } from './app/auth/pages/register.page';
import { BoardPage } from './app/board/pages/board.page';
import { EcommercePage } from './app/ecommerce/ecommerce.page';
import { NotFoundPage } from './app/errors/not-found.page';
import { AppOutlet } from './components/outlet/app.outlet';
import { BaseOutlet } from './components/outlet/base.outlet';
import { GuestRouteOutlet } from './components/outlet/guest-route.outlet';
import { ProtectedRouteOutlet } from './components/outlet/protected-route.outlet';

export const router = createBrowserRouter([
  {
    element: <BaseOutlet />,
    children: [
      {
        element: <AppOutlet />,
        children: [
          { path: '/', element: <EcommercePage /> },
          { path: '/board', element: <BoardPage /> },
          { path: '/page/not/found', element: <NotFoundPage /> },
          { path: '*', element: <Navigate to="/page/not/found" replace /> },
        ],
      },
      {
        element: <ProtectedRouteOutlet />,
        children: [],
      },
      {
        element: <GuestRouteOutlet />,
        children: [
          { path: '/auth/login', element: <LoginPage /> },
          { path: '/auth/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
]);
