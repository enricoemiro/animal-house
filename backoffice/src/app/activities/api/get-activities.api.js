import axios from '@/config/axios';

export const getActivities = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/activity/get/activities',
  });
  return response.data;
};
