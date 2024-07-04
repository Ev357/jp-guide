<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

defineProps<{
  links: HeaderLink[];
}>();
</script>

<template>
  <NavigationMenuLink
    v-for="item in links"
    :key="item.to"
    :href="item.to"
    :class="cn(navigationMenuTriggerStyle(), 'w-full')"
  >
    {{ item.title }}
  </NavigationMenuLink>
</template>
