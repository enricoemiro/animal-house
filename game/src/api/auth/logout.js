import axios from '@app/config/axios';

export const logout = async () => {
  const response = await axios.request({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    method: 'POST',
    url: '/auth/logout',
  });

  return response.data?.message;
};
