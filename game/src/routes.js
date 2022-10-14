import { createBrowserRouter } from 'react-router-dom';

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
]);

export default router;
