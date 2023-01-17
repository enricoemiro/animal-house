import { createBrowserRouter } from 'react-router-dom';

import Auth from './components/outlet/Auth';
import Base from './components/outlet/Base';
import RestrictedRoute from './components/outlet/RestrictedRoute';
import { Activities } from './components/pages/Activities';
import { Dashboard } from './components/pages/Dashboard';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import NotFound from './components/pages/errors/NotFound';
import { HeadOfficesPage } from './components/pages/headoffices/HeadOfficesPage';
import Home from './components/pages/home/HomePage';
import { SettingsBase } from './components/pages/settings/SettingsBase';
import { BookedServicesPage } from './components/pages/settings/subpages/BookedServicesPage';
import { OrdersPage } from './components/pages/settings/subpages/OrdersPage';
import { ProfilePage } from './components/pages/settings/subpages/ProfilePage';

export default createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    element: <RestrictedRoute requiresAuth={true} />,
    children: [
      {
        element: <Base />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          {
            element: <SettingsBase />,
            children: [
              { path: '/settings/profile', element: <ProfilePage /> },
              { path: '/settings/orders', element: <OrdersPage /> },
              { path: '/settings/booked/services', element: <BookedServicesPage /> },
            ],
          },
          { path: '/headoffices', element: <HeadOfficesPage /> },
          { path: '/activities', element: <Activities /> },
        ],
      },
    ],
  },
  {
    element: <RestrictedRoute requiresAuth={false} />,
    children: [
      {
        element: <Auth />,
        children: [
          { path: '/auth/login', element: <Login /> },
          { path: '/auth/register', element: <Register /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
