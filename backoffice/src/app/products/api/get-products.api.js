import axios from '@/config/axios';

export const getProducts = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/admin/get/products',
  });
  return response.data;
};
