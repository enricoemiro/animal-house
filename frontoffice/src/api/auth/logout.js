import axios from '@/config/axios';

export const LOGOUT_KEY = 'logout';

export const logout = async () => {
  const { data } = await axios.get('/auth/logout');
  return data;
};
