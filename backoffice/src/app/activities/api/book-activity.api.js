import axios from '@/config/axios';

export const bookActivity = async (id, form) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/book/activity/${id}`,
    data: form,
  });
  return response.data;
};
