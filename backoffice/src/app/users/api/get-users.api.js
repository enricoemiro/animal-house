import axios from '@/config/axios';

export const getUsers = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/admin/get/users',
  });
  return response.data;
};
