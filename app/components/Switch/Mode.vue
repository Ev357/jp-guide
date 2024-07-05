<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleDark = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
  <button @mousedown="toggleDark()" class="flex">
    <span
      v-show="isDark"
      class="i-heroicons-sun-20-solid size-5 shrink-0"
    ></span>
    <span
      v-show="!isDark"
      class="i-heroicons-moon-20-solid size-5 shrink-0"
    ></span>
  </button>
</template>
