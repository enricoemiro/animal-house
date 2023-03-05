<script setup>
import { onMounted, provide, ref } from 'vue';

import { me } from '@app/api/auth/me';

import { logout } from './api/auth/logout';
import Navbar from './components/Navbar.vue';

const sessionUser = ref(null);

async function logoutSessionUser() {
  const response = await logout();
  sessionUser.value = 'null';
}

onMounted(async () => {
  sessionUser.value = await me();
});

provide('auth', { sessionUser, logoutSessionUser });
</script>

<template>
  <div id="nav" class="bg-gray-400">
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
