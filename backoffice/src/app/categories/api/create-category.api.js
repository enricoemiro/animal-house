import axios from '@/config/axios';

export const createCategory = async (formDataJsonString) => {
  const response = await axios.request({
    method: 'POST',
    url: '/category/create',
    data: formDataJsonString,
  });
  console.log(response);
  return response.data;
};
