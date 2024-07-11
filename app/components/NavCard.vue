<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { ParsedContent } from "@nuxt/content";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  link: Pick<ParsedContent, "_path" | "title" | "description">;
  side: "left" | "right";
}>();
</script>

<template>
  <NuxtLinkLocale :to="link._path" :class="props.class">
    <UCard>
      <UCardHeader>
        <UCardTitle
          class="flex flex-col gap-2"
          :class="{ 'items-end': side === 'right' }"
        >
          <span
            class="size-6 shrink-0"
            :class="{
              'i-heroicons-arrow-left-circle-20-solid': side === 'left',
              'i-heroicons-arrow-right-circle-20-solid': side === 'right',
            }"
          ></span>
          {{ link.title }}
        </UCardTitle>
        <UCardDescription
          class="line-clamp-2"
          :class="{ 'text-right': side === 'right' }"
        >
          {{ link.description }}
        </UCardDescription>
      </UCardHeader>
    </UCard>
  </NuxtLinkLocale>
</template>
