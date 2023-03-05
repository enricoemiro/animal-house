import axios from '@app/config/axios';

export const saveQuizPoints = async (score, gameName) => {
  const response = await axios.post(
    '/game/upsert',
    { score: score, name: gameName },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
