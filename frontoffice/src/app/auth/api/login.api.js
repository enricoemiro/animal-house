import axios from '@/config/axios';

export const LOGIN_KEY = 'login';

export const login = async (data) => {
  const response = await axios.request({
    method: 'POST',
    url: '/auth/login',
    data: data,
  });

  return response.data?.message;
};
