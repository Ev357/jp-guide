<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value),
);

const dropdownLocale = ref(locale.value);

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as="button"
      class="i-heroicons-language-20-solid size-5 shrink-0"
    />
    <DropdownMenuContent>
      <DropdownMenuRadioGroup v-model="dropdownLocale">
        <DropdownMenuRadioItem
          v-for="locale in availableLocales"
          :key="locale.code"
          :value="locale.code"
          :as="NuxtLink"
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
