import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function RestrictedRoute({ requiresAuth }) {
  const { isUserLoading, user } = useAuth();

  if (isUserLoading) {
    return;
  }

  if (requiresAuth) {
    return user ? <Outlet /> : <Navigate to="/auth/login" />;
  }

  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
}

RestrictedRoute.propTypes = {
  requiresAuth: PropTypes.bool.isRequired,
};

export default RestrictedRoute;
