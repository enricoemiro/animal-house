import { useQuery } from '@tanstack/react-query';

import { LOGOUT_KEY, logout as logoutFn } from '@/api/auth/logout';
import { ME_KEY, me } from '@/api/auth/me';
import queryClient from '@/config/query';
import AuthContext from '@/context/AuthContext';

function AuthProvider({ children }) {
  const {
    isLoading: isUserLoading,
    error: userError,
    data: user,
  } = useQuery([ME_KEY], me, { retry: 0 });

  const {
    isLoading: isLogoutLoading,
    error: logoutError,
    refetch: logout,
  } = useQuery([LOGOUT_KEY], logoutFn, {
    retry: 0,
    enabled: false,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [ME_KEY] }),
  });

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        userError,
        user,
        isLogoutLoading,
        logoutError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
