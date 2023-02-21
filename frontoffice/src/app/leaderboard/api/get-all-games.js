import axios from '@/config/axios';

export const GET_ALL_GAMES_KEY = 'getAllGames';

export const getAllGames = async () => {
  const response = await axios.request({
    method: 'GET',
    url: `/game/get/all/games`,
  });

  return response.data;
};
