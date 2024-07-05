<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

defineProps<{
  links: HeaderLink[];
}>();

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <HeaderCommand :links :hideKbd="true" class="h-10 w-full" />
  <NavigationMenuLink
    v-for="item in links"
    :key="item.path"
    :to="item.path"
    :class="cn(navigationMenuTriggerStyle(), 'w-full justify-start')"
    @click="isOpen = false"
  >
    {{ item.title }}
  </NavigationMenuLink>
  <div class="flex items-center justify-between px-4 py-2">
    <p>{{ $t("HEADER.SWITCH_MODE.THEME") }}</p>
    <SwitchMode />
  </div>
  <div class="flex items-center justify-between px-4 py-2">
    <p>{{ $t("HEADER.SWITCH_LANG.LANGUAGE") }}</p>
    <SwitchLang />
  </div>
</template>
