import axios from '@/config/axios';

export const login = async (data) => {
  const response = await axios.post('/auth/login', data);
  return response.data;
};
