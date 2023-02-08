import { Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

export const BaseOutlet = () => {
  const {
    meQuery: { isLoading },
  } = useAuth();

  if (isLoading) {
    return <></>;
  }

  return <Outlet />;
};
