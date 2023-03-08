import axios from '@/config/axios';

export const getCategories = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/admin/get/categories',
  });
  return response.data;
};
