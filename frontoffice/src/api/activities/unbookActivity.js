import axios from '@/config/axios';

export const UNBOOK_ACTIVITY_KEY = 'unbookActivityKey';

export const unbookActivity = async (id) => {
  const response = await axios.post('/activity/unbook', { id });
  return response.data;
};
