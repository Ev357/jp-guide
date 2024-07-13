<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const { locale } = useI18n();

const {
  params: { slug },
} = useRoute();

const path = computed(() => getPath(slug));

const getFullPath = () => useRoute().fullPath;

const { data, error } = await useLazyAsyncData<
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

if (data.value) {
  useContentHead(data.value.page);
}

const is404 = computed(() => error.value && error.value.statusCode === 404);

const toc = computed(() => data.value?.page.body?.toc);
const links = useTocLinks(toc);
</script>

<template>
  <div>
    <MaxWidthWrapper
      v-if="!is404"
      class="pb-16 lg:grid lg:grid-cols-10 lg:gap-8"
    >
      <div class="col-span-2 hidden h-full justify-end self-start lg:block">
        <NavTree v-if="path !== '/'" />
      </div>
      <div class="flex justify-center lg:col-span-6">
        <div
          class="prose flex min-h-svh w-full max-w-4xl flex-col gap-8 dark:prose-invert"
        >
          <Breadcrumb />
          <TocMobile v-if="path !== '/'" :links />
          <ContentRenderer v-if="data?.page" :value="data.page">
            <ContentRendererMarkdown :value="data.page" class="grow" />
            <template #empty>yo</template>
          </ContentRenderer>
          <div v-else class="flex h-full w-full flex-col gap-8">
            <USkeleton class="h-12 max-w-64" />
            <USkeleton class="size-full" />
          </div>

          <template v-if="path !== '/' && data">
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
      <div class="col-span-2 hidden h-full justify-start self-start lg:block">
        <Toc v-if="path !== '/'" :links />
      </div>
    </MaxWidthWrapper>
    <Error404
      v-else
      :status-message="$t('ERROR.NOT_FOUND')"
      :description="$t('ERROR.PAGE_NOT_FOUND_DESCRIPTION')"
      :back-message="$t('ERROR.BACK_HOME')"
      class="min-h-fit pt-24"
    />
  </div>
</template>
