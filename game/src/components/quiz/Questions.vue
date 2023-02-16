<script setup>
import Answer from './Answer.vue';

const props = defineProps(['store']);
const emit = defineEmits(['checkAnswer', 'nextQuestion']);

function checkAnswer(st) {
  emit('checkAnswer', st);
}

function goToNextQuestion() {
  const st = props.store;
  if (st.currentQuestion >= st.data.results.length - 1) {
    st.quizEnded = true;
    st.step = 2;
    emit('nextQuestion', st);
    return;
  }
  st.currentQuestion += 1;
  st.showAnswer = false;
  emit('nextQuestion', st);
}

// const value = computed({
//   get() {
//     return props.store;
//   },

//   set(value) {
//     emit('update:store', value)
//   }
// })
</script>

<template>
  <div
    class="grid grid-rows-6 grid-cols-1 text-gray-600 mx-auto w-11/12 md:w-8/12 lg:w-7/12 overflow-y-hidden custom-height"
  >
    <div class="row-span-2">
      <div
        class="min-h-full items-center justify-between py-4 rounded-lg flex flex-col items-center"
      >
        <div class="flex my-4">
          <div
            v-for="item in store.data.results"
            class="w-3 h-3 rounded text-white mx-1 text-center text-xs flex items-center justify-center"
            :class="{
              'bg-green-300': item?.guessed_right,
              'bg-red-300': item?.guessed_right == false,
              'bg-gray-200': !item?.guessed_right,
            }"
          ></div>
        </div>
        <div
          class="border-4 border-amber-500 p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3"
        >
          <h1
            class="text-center font-medium md:text-lg"
            v-html="store.data.results[store.currentQuestion].question"
          ></h1>
        </div>
      </div>
    </div>
    <div class="row-span-3">
      <div class="min-h-full flex flex-col justify-center">
        <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2">
          <Answer
            v-for="answer in store.data.results[store.currentQuestion].shuffled_answers"
            :key="answer"
            :text="answer"
            :store="store"
            :is-valid-answer="answer == store.data.results[store.currentQuestion].correct_answer"
            :is-invalid-answer="answer != store.data.results[store.currentQuestion].correct_answer"
            :show-answer="store.showAnswer"
            @check-answer="checkAnswer"
          ></Answer>
        </div>
      </div>
    </div>
    <div class="">
      <div class="min-h-full min-w-full flex items-center justify-center">
        <Transition name="grow-fade">
          <button
            @click="goToNextQuestion"
            class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full md:w-1/3"
            v-show="store.showAnswer"
          >
            Next
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>
