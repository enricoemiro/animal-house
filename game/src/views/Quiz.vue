<script setup>
import { ref } from 'vue';

import { getQuizTrivia } from '@app/api/quiz/getQuizTriva';
import Options from '@app/components/quiz/Options.vue';
import Questions from '@app/components/quiz/Questions.vue';
import Restart from '@app/components/quiz/Restart.vue';

const store = ref({
  score: 0,
  iteration: 1,
  token: null,
  rightAnswers: 0,
  questionCount: 0,
  quizEnded: false,
  data: null,
  difficulty: 'easy',
  loading: true,
  currentQuestion: 0,
  step: 0,
  showAnswer: false,
});

async function startQuiz(difficulty) {
  store.value.difficulty = difficulty;
  const { data, token } = await getQuizTrivia(difficulty, store.value.token);
  store.value.data = data;
  store.value.token = token;
  store.value.questionCount = data.results.length;
  store.value.step = 1;
}

function checkAnswer(st) {
  store.value = st;
}

function nextQuestion(st) {
  store.value = st;
}

function restartQuiz(st) {
  store.value = st;
}
</script>

<template>
  <div class="text-gray-700">
    <Options v-if="store.step == 0" @options="startQuiz" />
    <Questions
      v-else-if="store.step == 1"
      :store="store"
      @check-answer="checkAnswer"
      @next-question="nextQuestion"
    />
    <Restart v-else-if="store.step == 2" :store="store" @restart-quiz="restartQuiz" />
  </div>
</template>
