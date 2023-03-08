import axios from '@/config/axios';

export const deleteCategory = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/category/${id}`,
  });
  console.log(response);
  return response.data;
};
