<script setup lang="ts">
import type { TocLink } from "@nuxt/content";

defineProps<{
  links?: (TocLink & {
    isVisible?: boolean;
  })[];
}>();
</script>

<template>
  <UAccordion
    v-if="links?.length"
    type="single"
    collapsible
    class="not-prose block lg:hidden"
  >
    <UAccordionItem value="toc">
      <UAccordionTrigger>{{ $t("TOC.TITLE") }}</UAccordionTrigger>
      <UAccordionContent>
        <TocLinks :links />
      </UAccordionContent>
    </UAccordionItem>
  </UAccordion>
</template>
