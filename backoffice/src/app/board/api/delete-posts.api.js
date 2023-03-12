import axios from '@/config/axios';

export const deletePosts = async (ids) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/posts`,
    data: ids,
  });
  return response.data;
};
