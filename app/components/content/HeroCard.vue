<script setup lang="ts">
defineProps<{
  path?: string;
}>();
</script>

<template>
  <NuxtLinkLocale :to="path">
    <Card class="not-prose h-full">
      <CardHeader>
        <CardTitle>
          <slot />
        </CardTitle>
        <CardDescription>
          <slot name="description" />
        </CardDescription>
      </CardHeader>
    </Card>
  </NuxtLinkLocale>
</template>
