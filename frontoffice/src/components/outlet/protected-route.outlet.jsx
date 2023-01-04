import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

export const ProtectedRouteOutlet = () => {
  const {
    meQuery: { data: user },
  } = useAuth();

  return user ? <Outlet /> : <Navigate to="/auth/login" replace={true} />;
};
