<script setup lang="ts" generic="T">
defineProps<{
  value: T;
}>();
</script>

<template>
  <slot :value />
</template>
