import axios from '@/config/axios';

export const editHeadOffice = async (id, form) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/edit/headoffice/${id}`,
    data: form,
  });
  console.log(response);
  return response.data;
};
