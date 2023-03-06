import axios from '@/config/axios';

export const createHeadOffice = async (formData) => {
  const response = await axios.request({
    method: 'POST',
    url: '/admin/create/headoffice',
    data: formData,
  });
  console.log(response);
  return response.data;
};
