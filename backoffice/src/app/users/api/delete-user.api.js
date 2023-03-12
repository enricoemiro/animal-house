import axios from '@/config/axios';

export const deleteUser = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/user/${id}`,
  });
  return response.data;
};
