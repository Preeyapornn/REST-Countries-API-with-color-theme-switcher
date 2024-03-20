<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="border-b-2">
    <div class="flex flex-row justify-between items-center my-5">
      <h1 class="font-bold text-2xl ml-20">Where in the world?</h1>
      <div class="flex flex-row items-center">
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
        <p class="mr-20">Dark Mode</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
