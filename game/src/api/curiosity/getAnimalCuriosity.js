import axios from 'axios';

export const getAnimalCuriosity = async (animal) => {
  const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + animal, {
    headers: {
      'X-Api-Key': 'dXm5WDJ/in8k8HhMhM/ZnQ==9K5tsfRzMgqvFYHQ',
      'Content-Type': 'application/json',
    },
  });
  return response;
};
