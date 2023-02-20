import axios from 'axios';

export const getTriviaToken = async () => {
  const response = await axios.get('https://opentdb.com/api_token.php?command=request');
  return response.data.token;
};
