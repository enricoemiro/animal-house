import axios from '@/config/axios';

export const deleteHeadOffices = async (ids) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/headoffices`,
    data: ids,
  });
  return response.data;
};
