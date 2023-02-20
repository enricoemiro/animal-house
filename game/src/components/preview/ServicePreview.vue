<script setup>
import { CalendarIcon, EyeIcon, MapIcon } from '@heroicons/vue/24/outline';
import { TheCard } from 'flowbite-vue';
import { ref } from 'vue';
import {format} from 'date-fns';

const props = defineProps(['service']);
const isExpanded = ref(false);

function handleExpandClick() {
  isExpanded.value = !isExpanded.value;
}

const icons = ref([
  { icon: CalendarIcon, text: format(new Date(props.service.dateOfPerformance), 'MM/dd/yyyy HH:mm')},
  { icon: MapIcon, text: props.service.mode },
  { icon: EyeIcon, text: props.service.availability },
]);
</script>

<template>
  <div class="flex-1">
    <TheCard>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ service.name }}
        </h2>
      </div>

      <p class="font-normal text-lg dark:text-white" :aria-expanded="isExpanded">
        {{ isExpanded ? service.description : service.description.slice(0, 150) + '...' }}

        <button
          class="text-blue-500 hover:underline"
          @click="() => handleExpandClick()"
          @keydown="(e) => e.key === 'Enter' && handleExpandClick()"
        >
          {{ isExpanded ? 'Read less' : 'Read more' }}
        </button>
      </p>

      <div class="flex items-center gap-x-5 text-sm text-gray-700 dark:text-gray-400">
        <div class="flex items-center gap-x-1" v-for="(item, index) in icons" :key="index">
          <component :is="item.icon" class="w-4 h-4 text-gray-600" />
          <span>{{ item.text }}</span>
        </div>
      </div>
    </TheCard>
  </div>
</template>
