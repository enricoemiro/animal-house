<script setup>
import { onMounted, provide, ref } from 'vue';

import { me } from '@app/api/auth/me';

import Navbar from './components/Navbar.vue';

const sessionUser = ref(null);

onMounted(async () => {
  sessionUser.value = await me();
});

provide('auth', sessionUser);
</script>

<template>
  <div id="nav">
    <Navbar />
  </div>

  <main>
    <div class="container mx-auto">
      <Suspense>
        <router-view> </router-view>

        <template #fallback><span> Loading... </span></template>
      </Suspense>
    </div>
  </main>
</template>

<style scoped></style>
