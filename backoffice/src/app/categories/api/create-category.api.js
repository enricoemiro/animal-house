import axios from '@/config/axios';

export const createCategory = async (formDataJsonString) => {
  const response = await axios.request({
    method: 'POST',
    url: '/category/create',
    data: formDataJsonString,
  });
  return response.data;
};
