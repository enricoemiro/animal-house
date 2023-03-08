import axios from '@/config/axios';

export const editProduct = async (id, form) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/edit/product/${id}`,
    data: form,
  });
  console.log(response);
  return response.data;
};
