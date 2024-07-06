<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    :class="cn('flex h-9 w-9 items-center justify-center', props.class)"
  >
    <slot>
      <span
        class="i-heroicons-ellipsis-horizontal-20-solid size-5 shrink-0"
      ></span>
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
