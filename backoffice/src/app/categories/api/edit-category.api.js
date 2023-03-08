import axios from '@/config/axios';

export const editCategory = async (id, form) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/edit/category/${id}`,
    data: form,
  });
  console.log(response);
  return response.data;
};