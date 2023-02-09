import axios from '@/config/axios';

export const BOOK_ACTIVITY_KEY = 'bookActivity';

export const bookActivity = async (id) => {
  const response = await axios.request({
    method: 'POST',
    url: '/activity/book',
    data: {
      id,
    },
  });

  return response.data?.message;
};
