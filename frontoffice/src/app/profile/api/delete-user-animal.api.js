import axios from '@/config/axios';

export const DELETE_USER_ANIMAL_KEY = 'createUserAnimal';

export const deleteUserAnimal = async (id) => {
  const request = await axios.request({
    method: 'DELETE',
    url: `/user/animals/delete/${id}`,
  });

  return request.data?.message;
};
