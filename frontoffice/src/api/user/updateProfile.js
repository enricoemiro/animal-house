import axios from '@/config/axios';

export const updateProfile = async (data) => {
  const response = await axios.post('/user/update/profile', data);
  return response.data;
};
