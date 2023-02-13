import axios from '@/config/axios';

export const CREATE_USER_ANIMAL_KEY = 'createUserAnimal';

export const createUserAnimal = async (values) => {
  const request = await axios.request({
    method: 'POST',
    url: '/user/animals/create',
    data: {
      ...values,
    },
  });

  return request.data?.message;
};
