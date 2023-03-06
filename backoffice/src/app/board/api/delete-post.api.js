import axios from '@/config/axios';

export const deletePost = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/post/${id}`,
  });
  console.log(response);
  return response.data;
};
