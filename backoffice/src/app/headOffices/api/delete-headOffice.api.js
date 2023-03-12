import axios from '@/config/axios';

export const deleteHeadOffice = async (id) => {
  const response = await axios.request({
    method: 'DELETE',
    url: `/admin/delete/headoffice/${id}`,
  });
  return response.data;
};
