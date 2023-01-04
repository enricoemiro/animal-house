import axios from '@/config/axios';

export const BOOK_ACTIVITY_KEY = 'bookActivityKey';

export const bookActivity = async (id) => {
  const response = await axios.post('/activity/book', { id });
  return response.data;
};
