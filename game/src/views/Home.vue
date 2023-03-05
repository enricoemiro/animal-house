<script setup>
import home from '@app/assets/home.jpeg';
import Curiosity from '@app/components/curiosity/Curiosities.vue';
</script>

<template>
  <section class="flex flex-row items-center justify-evenly py-5 bg-white">
    <div class="flex flex-row max-sm:flex-wrap items-center max-sm:justify-center gap-5">
      <div class="flex flex-col sm:w-3/5 justify-center">
        <h1
          class="max-w-2xl mb-2 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
        >
          Welcome to Animal House
        </h1>
        <p class="text-md max-sm:text-center">The best for your pet friends</p>
      </div>
      <div class="ml-6 flex flex-row items-center justify-center">
        <img :src="home" alt="" class="w-96 h-96 rounded-lg shadow-lg object-cover" />
      </div>
    </div>
  </section>
  <section class="py-5 border-b">
    <div class="flex flex-col justify-center gap-y-4">
      <h2 class="font-extrabold tracking-tight leading-none text-4xl">Curiosity</h2>
      <Curiosity />
    </div>
  </section>
  <section class="py-5 flex flex-col justify-center gap-4">
    <h2 class="font-extrabold tracking-tight leading-none text-4xl">Funny videos</h2>
    <div class="flex flex-row justify-center items-center mb-5 shadow-lg border">
      <iframe
        class="flex-auto h-96 w-96"
        src="https://www.youtube.com/embed/videoseries?list=PLtDp75hOzOlaQcPfx-Za_Dd1sOBPtdBw3"
        title="YouTube video player"
        frameborder="0"
        allow="web-share"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>
