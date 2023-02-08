import axios from '@/config/axios';

export const REGISTER_KEY = 'register';

export const register = async (data) => {
  const response = await axios.request({
    method: 'POST',
    url: '/auth/register',
    data: data,
  });

  return response.data?.message;
};
