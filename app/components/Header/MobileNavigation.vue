<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { ParsedContent } from "@nuxt/content";

defineProps<{
  links?: Pick<ParsedContent, "title" | "_path">[];
}>();

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <HeaderCommand :links :hideKbd="true" class="h-10 w-full" />
  <UNavigationMenuLink
    v-for="item in links"
    :key="item._path"
    :to="item._path"
    :class="cn(navigationMenuTriggerStyle(), 'w-full justify-start')"
    @click="isOpen = false"
  >
    {{ item.title }}
  </UNavigationMenuLink>
  <div class="flex items-center justify-between px-4 py-2">
    <p>{{ $t("HEADER.SWITCH_MODE.THEME") }}</p>
    <SwitchMode />
  </div>
  <div class="flex items-center justify-between px-4 py-2">
    <p>{{ $t("HEADER.SWITCH_LANG.LANGUAGE") }}</p>
    <SwitchLang />
  </div>
</template>
