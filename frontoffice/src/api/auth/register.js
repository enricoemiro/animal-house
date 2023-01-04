import axios from '@/config/axios';

export const register = async (data) => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};
