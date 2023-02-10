import axios from '@/config/axios';

export const UNBOOK_ACTIVITY_KEY = 'unbookActivity';

export const unbookActivity = async (id) => {
  const response = await axios.request({
    method: 'POST',
    url: '/activity/unbook',
    data: {
      id,
    },
  });

  return response.data?.message;
};
