<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const { locale } = useI18n();

const {
  params: { slug },
} = useRoute();

const path = computed(() => getPath(slug));

const getFullPath = () => useRoute().fullPath;

const { data, error } = await useAsyncData<
  {
    page: ParsedContent;
    surround: {
      prev?: Pick<ParsedContent, "_path" | "title" | "description">;
      next?: Pick<ParsedContent, "_path" | "title" | "description">;
    };
  },
  Error & {
    statusCode: number;
  }
>(`nuxt-content:${getFullPath()}`, async () => {
  const [page, [prev, next]] = await Promise.all([
    queryContent("/")
      .where({ _locale: locale.value, _path: path.value })
      .findOne(),
    queryContent()
      .only(["_path", "title", "description"])
      .where({ _locale: locale.value })
      .findSurround(path.value),
  ]);

  return { page, surround: { prev, next } };
});

const title = computed(() => data.value?.page.title);

useHead({
  title: title.value,
});

const is404 = computed(() => error.value && error.value.statusCode === 404);

const toc = computed(() => data.value?.page.body?.toc);
const links = useTocLinks(toc);
</script>

<template>
  <div>
    <MaxWidthWrapper v-if="data" class="pb-16 lg:grid lg:grid-cols-10 lg:gap-8">
      <div class="col-span-2 hidden h-full justify-end self-start lg:block">
        <NavTree v-if="path !== '/'" />
      </div>
      <ContentRenderer :value="data.page">
        <div class="flex justify-center lg:col-span-6">
          <div
            class="prose flex min-h-svh max-w-4xl flex-col gap-8 dark:prose-invert"
          >
            <Breadcrumb />
            <TocMobile v-if="path !== '/'" :links />
            <ContentRendererMarkdown :value="data.page" class="grow" />
            <template v-if="path !== '/'">
              <USeparator />
              <div class="not-prose grid gap-8 sm:grid-cols-2">
                <NavCard
                  v-if="data.surround.prev"
                  :link="data.surround.prev"
                  side="left"
                  class="sm:col-start-1"
                />
                <NavCard
                  v-if="data.surround.next"
                  :link="data.surround.next"
                  side="right"
                  class="sm:col-start-2"
                />
              </div>
            </template>
          </div>
        </div>
      </ContentRenderer>
      <div class="col-span-2 hidden h-full justify-start self-start lg:block">
        <Toc v-if="path !== '/'" :links />
      </div>
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
