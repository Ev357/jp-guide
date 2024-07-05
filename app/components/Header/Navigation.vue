<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

defineProps<{
  links: HeaderLink[];
}>();
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in links" :key="item.path">
        <NavigationMenuLink
          :to="item.path"
          :class="navigationMenuTriggerStyle()"
        >
          {{ item.title }}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
