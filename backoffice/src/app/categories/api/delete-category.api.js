import axios from '@/config/axios';

export const deleteCategory = async (name) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/category/${name}`,
  });
  return response.data;
};
