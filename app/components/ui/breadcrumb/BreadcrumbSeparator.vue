<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="props.class">
    <slot>
      <span
        class="i-heroicons-chevron-right-20-solid block size-4 shrink-0"
      ></span>
    </slot>
  </li>
</template>
