<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

defineProps<{
  links: HeaderLink[];
}>();
</script>

<template>
  <HeaderCommand :links :hideKbd="true" class="h-10 w-full" />
  <NavigationMenuLink
    v-for="item in links"
    :key="item.to"
    :to="item.to"
    :class="cn(navigationMenuTriggerStyle(), 'w-full')"
  >
    {{ item.title }}
  </NavigationMenuLink>
</template>
