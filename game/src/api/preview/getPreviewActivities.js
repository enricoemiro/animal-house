import axios from '@app/config/axios';

export const getPreviewActivities = async () => {
  const response = await axios.get('/activity/get/preview', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
