<script setup lang="ts">
defineProps<{
  path?: string;
}>();
</script>

<template>
  <NuxtLinkLocale :to="path">
    <UCard class="not-prose h-full">
      <UCardHeader>
        <UCardTitle>
          <slot />
        </UCardTitle>
        <UCardDescription as="div">
          <slot name="description" />
        </UCardDescription>
      </UCardHeader>
    </UCard>
  </NuxtLinkLocale>
</template>
