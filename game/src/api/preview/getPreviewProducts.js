import axios from 'axios';

export const getPreviewProducts = async () => {
  const response = await axios.get('/product/get/preview', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
