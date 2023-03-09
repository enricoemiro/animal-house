import axios from 'axios';

export const getAnimalCuriosity = async (animal) => {
  const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + animal, {
    headers: {
      'X-Api-Key': import.meta.env.VITE_ANIMALS_API_KEY,
      'Content-Type': 'application/json',
    },
  });
  return response;
};
