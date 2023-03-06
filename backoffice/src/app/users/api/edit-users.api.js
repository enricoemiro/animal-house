import axios from '@/config/axios';

export const editUser = async (id, form) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/edit/user/${id}`,
    data: form,
  });
  console.log(response);
  return response.data;
};
