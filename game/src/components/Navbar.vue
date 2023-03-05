<script setup>
import { Navbar, NavbarCollapse, NavbarLogo } from 'flowbite-vue';
import { inject, onMounted, ref } from 'vue';

import { me } from '@app/api/auth/me';
import snoopyRedBaron from '@app/assets/snoopyRedBaron.jpeg';
import { frontofficeUrl } from '@app/helpers/helpers';

const { logoutSessionUser } = inject('auth');


const session = ref(null);
onMounted(async () => {
  session.value = await me();
});

async function logoutSession() {
await logoutSessionUser();
session.value = null;

}

</script>

<template>
  <Navbar id="navbar" class="bg-slate-100">
    <template #logo>
      <NavbarLogo link="/" alt="Animal House logo" :image-url="snoopyRedBaron">
        Animal House Game
      </NavbarLogo>
    </template>
    <template #default="{ isShowMenu }">
      <NavbarCollapse :is-show-menu="isShowMenu">
        <router-link
          to="/"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-105"
          aria-label="Go to game home"
          >Home</router-link
        >
        <router-link
          to="/quiz"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-105"
          aria-label="Go to quiz page to play"
          >Quiz</router-link
        >
        <router-link
          to="/about"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-105"
          aria-label="Discover more about us"
          >About</router-link
        >
        <a
          v-if="!session"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-105"
          :href="frontofficeUrl"
          aria-label="Login"
          >Login</a
        >
        <button
          v-if="session"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-105"
          aria-label="Logout"
          @click="logoutSession"
        >
          Logout
        </button>
      </NavbarCollapse>
    </template>
  </Navbar>
</template>
