import axios from '@/config/axios';

export const CHECKOUT_KEY = 'checkout';

export const checkout = async (queryData) => {
  const { data } = await axios.post('/order/create', { orderElements: queryData });
  return data?.message;
};
