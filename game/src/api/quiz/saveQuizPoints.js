import axios from 'axios';

export const saveQuizPoints = async (score, gameName) => {
  const response = await axios.post(
    '/game/upsert',
    { score: score, name: gameName },
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
