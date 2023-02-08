import axios from '@/config/axios';

export const LOGOUT_KEY = 'logout';

export const logout = async () => {
  const response = await axios.request({
    method: 'POST',
    url: '/auth/logout',
  });

  return response.data?.message;
};
