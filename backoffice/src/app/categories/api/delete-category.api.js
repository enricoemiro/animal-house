import axios from '@/config/axios';

export const deleteCategory = async (name) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/category/${name}`,
  });
  console.log(response);
  return response.data;
};
