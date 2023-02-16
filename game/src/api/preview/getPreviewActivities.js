import axios from 'axios';

export const getPreviewActivities = async () => {
  const response = await axios.get('/activity/get/preview', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
