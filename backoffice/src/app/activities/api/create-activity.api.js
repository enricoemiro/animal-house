import axios from '@/config/axios';

export const createActivity = async (formData) => {
  const response = await axios.request({
    method: 'POST',
    url: '/admin/create/activity',
    data: formData,
  });
  return response.data;
};
