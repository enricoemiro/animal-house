import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ActivitiesPage } from './app/activity/activities.page';
import { LoginPage } from './app/auth/pages/login.page';
import { RegisterPage } from './app/auth/pages/register.page';
import { BoardPage } from './app/board/pages/board.page';
import { EcommercePage } from './app/ecommerce/pages/ecommerce.page';
import { ProductDetails } from './app/ecommerce/pages/product-details';
import { NotFoundPage } from './app/errors/not-found.page';
import { HeadOfficesPage } from './app/headoffice/head-office.page';
import { LeaderboardPage } from './app/leaderboard/pages/leaderboard-page';
import { ProfilePage } from './app/profile/profile.page';
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
        children: [
          {
            element: <AppOutlet />,
            children: [
              { path: '/profile', element: <ProfilePage /> },
              { path: '/activities', element: <ActivitiesPage /> },
              { path: '/headoffices', element: <HeadOfficesPage /> },
              { path: '/product/details/:id', element: <ProductDetails /> },
              { path: '/leaderboard', element: <LeaderboardPage /> },
            ],
          },
        ],
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
