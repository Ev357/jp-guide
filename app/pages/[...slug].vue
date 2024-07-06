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
    <MaxWidthWrapper v-if="data" class="pb-16">
      <ContentRenderer :value="data">
        <div class="prose flex flex-col gap-8 dark:prose-invert">
          <Breadcrumb />
          <ContentRendererMarkdown :value="data" />
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
