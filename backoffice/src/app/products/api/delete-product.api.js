import axios from '@/config/axios';

export const deleteProduct = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/product/${id}`,
  });
  console.log(response);
  return response.data;
};
