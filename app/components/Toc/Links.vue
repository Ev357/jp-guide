<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { cn } from "@/lib/utils";

defineProps<{
  links?: (TocLink & {
    isVisible?: boolean;
  })[];
}>();
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.text">
      <a
        :href="`#${link.id}`"
        :class="
          cn('text-base text-muted-foreground hover:text-foreground', {
            'text-foreground': link.isVisible,
          })
        "
      >
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>
