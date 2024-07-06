<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

defineProps<{
  links: HeaderLink[];
}>();
</script>

<template>
  <UNavigationMenu>
    <UNavigationMenuList>
      <UNavigationMenuItem v-for="item in links" :key="item.path">
        <UNavigationMenuLink
          :to="item.path"
          :class="navigationMenuTriggerStyle()"
        >
          {{ item.title }}
        </UNavigationMenuLink>
      </UNavigationMenuItem>
    </UNavigationMenuList>
  </UNavigationMenu>
</template>
