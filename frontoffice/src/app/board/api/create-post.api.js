import axios from '@/config/axios';

export const CREATE_POST_KEY = 'createPost';

export const createPost = async (params) => {
  const formData = new FormData();

  formData.append('content', params.content);

  if (params.category) {
    formData.append('category', params.category);
  }

  for (const image of params?.images) {
    formData.append('images', image);
  }

  const response = await axios.request({
    method: 'POST',
    url: '/post/create',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.message;
};
