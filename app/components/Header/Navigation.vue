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
      <NavigationMenuItem v-for="item in links" :key="item.to">
        <NavigationMenuLink :to="item.to" :class="navigationMenuTriggerStyle()">
          {{ $t(item.title) }}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
