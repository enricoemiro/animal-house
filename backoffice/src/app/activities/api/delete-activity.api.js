import axios from '@/config/axios';

export const deleteActivity = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/activity/${id}`,
  });
  console.log(response);
  return response.data;
};
