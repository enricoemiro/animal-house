import axios from '@/config/axios';

export const deleteUser = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/user/${id}`,
  });
  console.log(response);
  return response.data;
};
