import axios from '@/config/axios';

export const createUser = async (formDataJsonString) => {
  const response = await axios.request({
    method: 'POST',
    url: '/admin/create/user',
    data: formDataJsonString,
  });
  return response.data;
};
