import axios from '@app/config/axios';

export const getPreviewProducts = async () => {
  const response = await axios.get('/product/get/preview', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
