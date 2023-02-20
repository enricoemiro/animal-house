<script setup>
import { Navbar, NavbarCollapse, NavbarLogo } from 'flowbite-vue';
import { inject } from 'vue';

const sessionUser = inject('auth');
</script>

<template>
  <Navbar id="navbar" class="bg-slate-100">
    <template #logo>
      <NavbarLogo
        link="/"
        alt="Flowbite logo"
        image-url="https://flowbite.com/docs/images/logo.svg"
      >
        Animal House Game
      </NavbarLogo>
    </template>
    <template #default="{ isShowMenu }">
      <NavbarCollapse :is-show-menu="isShowMenu">
        <router-link
          to="/"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-110"
          aria-label="Go to game home"
          >Home</router-link
        >
        <router-link
          to="/quiz"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-110"
          aria-label="Go to quiz page to play"
          >Quiz</router-link
        >
        <router-link
          to="/about"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-110"
          aria-label="Go to about page to discover more about us"
          >About</router-link
        >
        <a
          v-if="!sessionUser"
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-110"
          href="http://localhost:5173/auth/login?returnTo=http://localhost:5175/"
          >Login</a
        >
        <a
          v-else
          class="hover:text-amber-600 transition ease-in-out hover:-translate-y-1 hover:scale-110"
          href="http://localhost:5173/"
          aria-label="Go to the Front office application"
          >Front office</a
        >
      </NavbarCollapse>
    </template>
  </Navbar>
</template>

