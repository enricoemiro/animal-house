import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

export const GuestRouteOutlet = () => {
  const {
    meQuery: { data: user },
  } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/page/not/found" replace={true} />;
};
