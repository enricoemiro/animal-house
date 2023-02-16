<script setup>
import { ClipboardDocumentIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';

import { getPreviewActivities } from '@app/api/preview/getPreviewActivities';
import { getPreviewProducts } from '@app/api/preview/getPreviewProducts';
import ProductPreview from '@app/components/preview/ProductPreview.vue';
import ServicePreview from '@app/components/preview/ServicePreview.vue';

const products = await getPreviewProducts();
const activities = await getPreviewActivities();

const offers = ref([
  {
    name: 'Products',
    description:
      "Shop for all your pet needs with ease and convenience. Our online store offers a wide selection of high-quality pet products, from food and toys to grooming supplies and more. With fast shipping and a user-friendly shopping experience, you can take care of your furry friend with just a few clicks. Trust us for all your pet's essentials and shop now!",
    icon: ShoppingBagIcon,
  },
  {
    name: 'Services',
    description:
      "At Animal House, we understand that your pet is more than just an animal, they're a part of your family. That's why we offer a range of services to ensure they receive the best care possible. From grooming and boarding to training and medical services, our team of experts will provide personalized attention and the highest level of service. Your pet's happiness and well-being are our top priority, so trust us to provide the care they deserve. Book your appointment now and give your furry friend the best.",
    icon: ClipboardDocumentIcon,
  },
]);
</script>

<template>
  <div class="bg-white">
    <div class="relative pb-32 bg-gray-800">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="images/heroBird.jpg"
          alt="A red bird perched on a branch, enjoying a feast of juicy berries."
        />
        <div class="absolute inset-0 bg-gray-500 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          About Animal House
        </h1>
        <p class="mt-6 max-w-3xl text-xl text-gray-300">
          Welcome to Animal House, a leading provider of pet products and services! With over 80
          locations, we are committed to meeting the needs of pet owners everywhere. From food and
          toys to grooming and boarding, we offer everything you need to keep your pet happy and
          healthy. Our experienced staff is dedicated to providing exceptional customer service and
          ensuring that your pet receives the best care possible. Visit us today and see why we are
          the go-to destination for all your pet needs.
        </p>
      </div>
    </div>

    <section
      class="-mt-32 max-w-7xl mx-auto relative z-10 pb-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <h2 class="sr-only" id="contact-heading">What we offer</h2>
      <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
        <div
          v-for="offer in offers"
          :key="offer.name"
          class="flex flex-col bg-white rounded-2xl shadow-xl border"
        >
          <div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
            <div
              class="absolute top-0 p-5 inline-block bg-amber-500 rounded-xl shadow-lg transform -translate-y-1/2"
            >
              <component :is="offer.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-medium text-gray-900">{{ offer.name }}</h3>
            <p class="mt-4 text-base text-gray-500">{{ offer.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col justify-center mb-8">
      <h2 class="font-extrabold tracking-tight leading-none text-4xl">Products preview</h2>
      <div class="flex items-center justify-center flex-wrap mt-5">
        <ul class="grid grid-flow-row grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-x-5 gap-y-3">
          <ProductPreview v-for="product in products" :key="product.id" :product="product" />
        </ul>
      </div>
    </section>

    <section class="flex flex-col justify-center mb-8">
      <h2 class="font-extrabold tracking-tight leading-none text-4xl">Services preview</h2>
      <div class="flex mt-5">
        <div class="flex">
          <div class="flex flex-wrap w-full gap-y-4 gap-x-1">
            <ServicePreview v-for="activity in activities" :key="activity.id" :service="activity" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
