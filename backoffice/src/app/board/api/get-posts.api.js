import axios from '@/config/axios';

export const getPosts = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/admin/get/posts',
  });
  return response.data;
};
