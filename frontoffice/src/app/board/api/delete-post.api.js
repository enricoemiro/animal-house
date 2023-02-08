import axios from '@/config/axios';

export const DELETE_POST_KEY = 'deletePost';

export const deletePost = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/post/delete/${id}`,
  });

  return response.data?.message;
};
