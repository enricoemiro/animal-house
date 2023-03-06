<script setup>
import ImageViewer from '../ImageViewer.vue';

const props = defineProps(['product']);
</script>

<template>
  <li class="flex flex-col rounded-md bg-white shadow-md overflow-hidden border-gray-200">
    <div class="flex flex-row">
      <ImageViewer
        v-if="product?.images.length >= 1"
        :image="product?.images[0]"
        :alt="product?.name"
      />
      <ImageViewer v-else :image="null" alt="" />
    </div>
    <div class="flex-1 p-4 flex flex-col bg-slate-50">
      <h1 class="font-bold">{{ product?.name }}</h1>
      <p class="font-bold">Stock: {{ product?.availability }}</p>

      <div class="flex flex-row justify-between items-center">
        <div class="flex items-center">
          <p>{{ product?.price }}€</p>
        </div>
      </div>
    </div>
  </li>
</template>
