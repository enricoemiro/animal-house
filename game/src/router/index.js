import { createRouter, createWebHistory } from 'vue-router';

import About from '@app/views/About.vue';
import Home from '@app/views/Home.vue';
import Quiz from '@app/views/Quiz.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/about', name: 'About', component: About },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
