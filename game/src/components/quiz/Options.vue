<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';

const difficulties = ref(['easy', 'medium', 'hard']);
const selectedDifficulty = ref('easy');
const emit = defineEmits(['options']);

function startQuiz(event) {
  event.preventDefault();
  emit('options', selectedDifficulty.value);
}
</script>

<template>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h1 class="text-center text-3xl my-12 font-bold">
      Animal House<span class="text-amber-600">Trivia</span>
    </h1>
    <form @submit="startQuiz" class="flex flex-col mb-6 gap-y-4">
      <Listbox as="div" v-model="selectedDifficulty">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
          Choose a difficulty
        </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton
            class="relative w-full bg-white border border-gray-300 rounded-md shadow-md pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm"
          >
            <span class="flex items-center">
              <span class="ml-3 block truncate">{{ selectedDifficulty }}</span>
            </span>
            <span
              class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="difficulty in difficulties"
                :key="difficulty"
                :value="difficulty"
                v-slot="{ active, selectedDifficulty }"
              >
                <li
                  :class="[
                    active ? 'text-white bg-amber-500' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                >
                  <div class="flex items-center">
                    <span
                      :class="[
                        selectedDifficulty ? 'font-semibold' : 'font-normal',
                        'ml-3 block truncate',
                      ]"
                    >
                      {{ difficulty }}
                    </span>
                  </div>

                  <span
                    v-if="selectedDifficulty"
                    :class="[
                      active ? 'text-white' : 'text-amber-500',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <button
        type="submit"
        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
      >
        Start quiz
      </button>
    </form>
  </div>
</template>
