import axios from '@/config/axios';

export const getAuthMe = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/auth/me',
  });
  return response.data;
};
