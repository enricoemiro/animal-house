import axios from '@/config/axios';

export const deleteProduct = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/product/${id}`,
  });
  return response.data;
};
