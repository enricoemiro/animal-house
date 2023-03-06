import axios from '@/config/axios';

export const getHeadOffices = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/admin/get/headoffices',
  });
  return response.data;
};
