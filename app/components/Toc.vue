<script setup lang="ts">
import type { TocLink } from "@nuxt/content";

defineProps<{
  links?: (TocLink & {
    isVisible?: boolean;
  })[];
}>();
</script>

<template>
  <div v-if="links?.length" class="sticky top-12 flex flex-col gap-2">
    <p class="font-bold">{{ $t("TOC.TITLE") }}</p>
    <TocLinks :links />
  </div>
</template>
