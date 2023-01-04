import { useQuery } from '@tanstack/react-query';

import { LOGOUT_KEY, logout } from '@/app/auth/api/logout.api';
import { ME_KEY, me } from '@/app/auth/api/me.api';
import { queryClient } from '@/config/query';

import { AuthContext } from './auth.context';

/**
 * @param {Object} props - Props
 * @param {React.ReactNode} props.children - Children
 */
export const AuthProvider = ({ children }) => {
  const meQuery = useQuery({
    queryFn: me,
    queryKey: [ME_KEY],
    retry: false,
  });

  const logoutQuery = useQuery({
    queryFn: logout,
    queryKey: [LOGOUT_KEY],
    retry: false,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ME_KEY],
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        meQuery,
        logoutQuery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
