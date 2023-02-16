import axios from 'axios';

import { shuffle } from '@app/helpers/helpers';

import { getTriviaToken } from './getTriviaToken';

export const getQuizTrivia = async (difficulty, token) => {
  if (!token) {
    token = await getTriviaToken();
  }

  const response = await axios.get(
    `https://opentdb.com/api.php?amount=5&category=27&difficulty=${difficulty}&type=multiple&token=${token}`,
  );
  let modifiedResponse = response;

  modifiedResponse.data.results.map((item) => {
    item['shuffled_answers'] = shuffle([item.correct_answer, ...item.incorrect_answers]);
  });

  return { data: modifiedResponse.data, token: token };
};
