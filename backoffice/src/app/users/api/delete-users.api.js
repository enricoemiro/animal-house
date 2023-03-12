import axios from '@/config/axios';

export const deleteUsers = async (ids) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/users`,
    data: ids,
  });
  return response.data;
};
