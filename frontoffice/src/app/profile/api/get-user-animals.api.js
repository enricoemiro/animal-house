import axios from '@/config/axios';

export const GET_USER_ANIMALS = 'getUserAnimals';

export const getUserAnimals = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/user/animals',
  });

  return response.data?.animals;
};
