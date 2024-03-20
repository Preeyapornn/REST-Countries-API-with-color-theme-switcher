<script setup lang="ts">
const props = defineProps<{
  name: string;
  population: string;
  region: string;
  capital: string;
  flags: string;
  alt: string;
}>();
</script>

<template>
  <nuxt-link :to="`/country/${name}`">
    <!-- <NuxtLink :to="`/country/${props.id}`" class="group"> -->
    <div
      class="border-2 pb-8 cursor-pointer rounded-md shadow-lg shadow-primaryInput hover:scale-110 transition-all duration-500"
    >
      <div class="overflow-hidden aspect-square">
        <img
          :src="flags"
          :alt="alt"
          class="h-40 w-80 object-cover rounded-t-md"
        />
      </div>
      <div class="ml-5">
        <div class="font-bold text-lg my-4">{{ name }}</div>
        <div>
          <span class="font-semibold"> Population:</span>
          {{ population.toLocaleString() }}
        </div>
        <div><span class="font-semibold">Region:</span> {{ region }}</div>
        <div v-if="capital">
          <span class="font-semibold"> Capital:</span> {{ capital?.[0] }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped></style>
