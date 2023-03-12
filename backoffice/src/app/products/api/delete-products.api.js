import axios from '@/config/axios';

export const deleteProducts = async (ids) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/products`,
    data: ids,
  });
  return response.data;
};
