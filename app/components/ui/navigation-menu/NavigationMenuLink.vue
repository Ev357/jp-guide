<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import { useForwardPropsEmits } from "radix-vue";

const props = defineProps<
  NuxtLinkProps & {
    locale?: string | undefined;
  }
>();

const forwarded = useForwardPropsEmits(props);
</script>

<template>
  <NuxtLinkLocale v-bind="forwarded">
    <slot />
  </NuxtLinkLocale>
</template>
