import axios from '@/config/axios';

export const GET_POSTS = 'getPosts';

export const getPosts = async (cursor = {}) => {
  const response = await axios.request({
    method: 'GET',
    url: '/post/get/posts',
    params: {
      limit: 10,
      ...cursor,
    },
  });

  return {
    posts: response.data?.posts,
    meta: response.data?.meta,
  };
};
