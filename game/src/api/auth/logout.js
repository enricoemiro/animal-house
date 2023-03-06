import axios from '@app/config/axios';

export const logout = async () => {
  const response = await axios.request({
    withCredentials: true,
    method: 'POST',
    url: '/auth/logout',
  });

  return response.data?.message;
};
