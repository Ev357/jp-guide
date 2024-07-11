<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { ParsedContent } from "@nuxt/content";

defineProps<{
  links?: Pick<ParsedContent, "title" | "_path">[];
}>();
</script>

<template>
  <UNavigationMenu>
    <UNavigationMenuList>
      <UNavigationMenuItem v-for="item in links" :key="item._path">
        <UNavigationMenuLink
          :to="item._path"
          :class="navigationMenuTriggerStyle()"
        >
          {{ item.title }}
        </UNavigationMenuLink>
      </UNavigationMenuItem>
    </UNavigationMenuList>
  </UNavigationMenu>
</template>
