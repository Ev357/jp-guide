<script setup lang="ts">
import type { BreadcrumbItemProps } from "@@/node_modules/@nuxtjs/seo/dist/runtime/nuxt/composables/useBreadcrumbItems.js";

const {
  params: { slug },
  fullPath,
} = useRoute();

const { t, locale } = useI18n();

const paths = computed(() => getPaths(slug));
const basePath = computed(() => getBasePath(slug));

const { data } = await useAsyncData(
  `breadcrumbs-${fullPath}`,
  async () => {
    const items = await queryContent(basePath.value)
      .where({ _locale: locale.value, _path: { $in: paths.value } })
      .only(["title", "_path"])
      .find();

    const breadcrumbItems = [
      ...items.map<BreadcrumbItemProps>((breadcrumb) => ({
        label: breadcrumb.title ?? t("APP_NAME"),
        to: breadcrumb._path,
      })),
    ].sort((a, b) => (a.to && b.to ? a.to?.length - b.to?.length : 0));

    const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
    if (lastItem) {
      lastItem.current = true;
    }

    return breadcrumbItems;
  },
  {
    watch: [locale],
  },
);

const unfilteredBreadcrumbItems = useBreadcrumbItems({
  overrides: [undefined, ...(data.value ?? [])],
});

const breadcrumbItems = computed(() =>
  unfilteredBreadcrumbItems.value.filter(
    (item) => item.to !== "/" && item.to !== `/${locale.value}`,
  ),
);
</script>

<template>
  <UBreadcrumb
    v-if="breadcrumbItems && breadcrumbItems.length > 1"
    class="not-prose"
  >
    <UBreadcrumbList>
      <template v-for="item in breadcrumbItems" :key="item.to">
        <UBreadcrumbItem>
          <UBreadcrumbLink v-if="!item.current" :to="item.to">
            {{ item.label }}
          </UBreadcrumbLink>
          <UBreadcrumbPage v-else>{{ item.label }}</UBreadcrumbPage>
        </UBreadcrumbItem>
        <UBreadcrumbSeparator v-if="!item.current" />
      </template>
    </UBreadcrumbList>
  </UBreadcrumb>
</template>
