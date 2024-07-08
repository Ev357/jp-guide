<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const { locale } = useI18n();

const {
  params: { slug },
} = useRoute();

const path = computed(() => getPath(slug));

const getFullPath = () => useRoute().fullPath;

const { data, error } = await useAsyncData<
  ParsedContent,
  Error & {
    statusCode: number;
  }
>(`nuxt-content:${getFullPath()}`, () =>
  queryContent("/")
    .where({ _locale: locale.value, _path: path.value })
    .findOne(),
);

useHead({
  title: data.value?.title,
});

const is404 = computed(() => error.value && error.value.statusCode === 404);
</script>

<template>
  <div>
    <MaxWidthWrapper v-if="data" class="pb-16 lg:grid lg:grid-cols-10 lg:gap-8">
      <div class="col-span-2 hidden h-full justify-end self-start lg:block">
        <NavTree v-if="path !== '/'" />
      </div>
      <ContentRenderer :value="data">
        <div class="flex justify-center lg:col-span-6">
          <div class="prose relative flex flex-col gap-8 dark:prose-invert">
            <Breadcrumb />
            <ContentRendererMarkdown :value="data" />
          </div>
        </div>
      </ContentRenderer>
    </MaxWidthWrapper>
    <Error404
      v-if="is404"
      :status-message="$t('ERROR.NOT_FOUND')"
      :description="$t('ERROR.PAGE_NOT_FOUND_DESCRIPTION')"
      :back-message="$t('ERROR.BACK_HOME')"
      class="min-h-fit pt-24"
    />
  </div>
</template>
