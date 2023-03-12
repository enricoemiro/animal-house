import axios from '@/config/axios';

export const unbookActivity = async (actId, usrId) => {
  const response = await axios.request({
    method: 'PUT',
    url: `/admin/unbook/activity/${actId}`,
    data: JSON.stringify({ id: usrId }),
  });
  return response.data;
};
