<script setup>
import { ref } from 'vue';

import { getAnimalCuriosity } from '@app/api/curiosity/getAnimalCuriosity';

import CuriosityCard from './CuriosityCard.vue';
import Loader from '../Loader.vue';

const curiosityQuery = ref('');
const queryResponse = ref(null);
const isLoading = ref(false);

async function fetchCuriosity(event) {
  event.preventDefault();
  isLoading.value=true;
  const response = await getAnimalCuriosity(curiosityQuery.value);
  isLoading.value=false;
  queryResponse.value = response.data.slice(0, 6);
}
</script>

<template>
  <form @submit="(event) => fetchCuriosity(event)">
    <label
      for="curiosity-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative w-full">
      <input
        type="search"
        aria-label="Search an animal and discover curiosities about it"
        v-model="curiosityQuery"
        id="curiosity-search"
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-md border-gray-300 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Type the name of the animal to search"
        required
      />
      <button
        type="submit"
        class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-amber-400 rounded-r-md border border-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-400 dark:hover:bg-amber-600 dark:focus:ring-amber-600"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </div>
  </form>
  <section class="flex w-full" id="curiosities cards">
    <div class="flex w-full">
      <div v-if="queryResponse" class="flex flex-wrap h-full gap-3">
        <CuriosityCard v-for="animal in queryResponse" :key="animal.name" :animal="animal" />
      </div>
      <div v-else class="flex w-full flex-row items-center justify-center">
       <Loader :isLoading="isLoading"/>
      </div>
    </div>
  </section>
</template>
