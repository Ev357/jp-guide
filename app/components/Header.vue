<script setup lang="ts">
const isOpen = ref(false);

export type HeaderLink = {
  title: string;
  to: string;
};

const links: HeaderLink[] = [
  {
    title: "Grammar",
    to: "/grammar",
  },
  {
    title: "Classic JP",
    to: "/classic-jp",
  },
  {
    title: "Kanji",
    to: "/kanji",
  },
  {
    title: "Dictionaries",
    to: "/dictionaries",
  },
];
</script>

<template>
  <div class="flex justify-center">
    <header
      class="z-10 flex w-full max-w-[1400px] flex-col gap-4 p-4"
      :class="{
        'absolute inset-0 bg-background md:static md:inset-auto md:bg-inherit':
          isOpen,
      }"
    >
      <div class="flex justify-between gap-4">
        <div class="flex gap-4">
          <NuxtLinkLocale to="/" class="flex shrink-0 items-center py-2">
            <NuxtImg src="/img/wa.png" class="size-8 shrink-0" />
            <h1>JP Guide</h1>
          </NuxtLinkLocale>
          <div class="hidden md:flex">
            <HeaderNavigation :links />
          </div>
        </div>

        <div class="hidden items-center gap-2 md:flex">
          <HeaderCommand />
        </div>
        <button
          class="flex size-8 items-center justify-center rounded-full border md:hidden"
          @mousedown="isOpen = !isOpen"
        >
          <span
            class="size-5 shrink-0"
            :class="{
              'i-heroicons-x-mark-20-solid': isOpen,
              'i-heroicons-bars-3-20-solid': !isOpen,
            }"
          ></span>
        </button>
      </div>
      <div v-if="isOpen" class="flex flex-col gap-2 md:hidden">
        <HeaderMobileNavigation :links />
      </div>
    </header>
  </div>
</template>
