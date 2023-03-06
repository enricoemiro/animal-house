<script setup>
import { bufferToBase64 } from '@app/helpers/image';

const props = defineProps(['image', 'alt']);
</script>

<template>
  <img
    v-if="image !== null"
    class="w-full h-full object-center object-cover rounded-t"
    :src="`data:image/png;base64,` + bufferToBase64(image?.content?.data)"
    :alt="alt"
  />
  <img
    v-else
    class="w-full h-full object-center object-cover rounded-t"
    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
    alt=""
  />
</template>
