<script setup lang="ts">
export type HeaderLink = {
  title: string;
  path: string;
};

const isOpen = ref(false);

const { locale, t } = useI18n();

const { data: links } = await useAsyncData(
  "navigation",
  async () => {
    const paths = await queryContent("/")
      .where({ _locale: locale.value, _path: { $ne: "/" }, _dir: "" })
      .sort({ page_order: 1, $numeric: true })
      .only(["title", "_path"])
      .find();

    console.log(paths);

    return paths.map<HeaderLink>(({ _path: path, ...props }) => ({
      ...props,
      title: props.title ?? t("APP_NAME"),
      path: path ?? "/",
    }));
  },
  {
    watch: [locale],
  },
);
</script>

<template>
  <div class="flex justify-center">
    <header
      class="z-10 flex w-full max-w-[1400px] flex-col gap-4 p-4"
      :class="{
        'absolute inset-0 bg-background lg:static lg:inset-auto lg:bg-inherit':
          isOpen,
      }"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex gap-4">
          <NuxtLinkLocale to="/" class="flex shrink-0 items-center py-2">
            <NuxtImg src="/img/wa.png" class="size-8 shrink-0" />
            <h1>{{ $t("APP_NAME") }}</h1>
          </NuxtLinkLocale>
          <div class="hidden lg:flex">
            <HeaderNavigation v-if="links" :links="links" />
          </div>
        </div>

        <div class="hidden items-center gap-2 lg:flex">
          <HeaderCommand v-if="links" :links />
          <SwitchLang />
          <SwitchMode />
        </div>
        <button
          class="flex size-8 items-center justify-center rounded-full border lg:hidden"
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
      <div v-if="isOpen" class="flex flex-col gap-2 lg:hidden">
        <HeaderMobileNavigation v-if="links" v-model="isOpen" :links />
      </div>
    </header>
  </div>
</template>
