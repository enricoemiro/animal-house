<script setup>
const props = defineProps(['store', 'text', 'isValidAnswer', 'isInvalidAnswer']);
const emit = defineEmits(['checkAnswer']);

function checkAnswer(answer) {
  const st = props.store;
  if (st.data.results[st.currentQuestion].correct_answer == answer) {
    st.score += 10;
    st.rightAnswers++;
    st.showAnswer = true;
    st.data.results[st.currentQuestion]['guessed_right'] = true;
    emit('checkAnswer', st);
    return;
  }
  st.data.results[st.currentQuestion]['guessed_right'] = false;
  st.showAnswer = true;
  emit('checkAnswer', st);
}
</script>

<template>
  <button
    class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6"
    @click="checkAnswer(text)"
    v-html="text"
    :disabled="store.showAnswer"
    :class="{
      'bg-red-200': store.showAnswer && isInvalidAnswer,
      'bg-green-200': store.showAnswer && isValidAnswer,
      'hover:bg-gray-300': !store.showAnswer,
    }"
  ></button>
</template>
