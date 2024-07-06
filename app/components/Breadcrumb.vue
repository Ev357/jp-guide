<script setup lang="ts">
import type { BreadcrumbItemProps } from "@@/node_modules/@nuxtjs/seo/dist/runtime/nuxt/composables/useBreadcrumbItems.js";
import BreadcrumbSeparator from "./ui/breadcrumb/BreadcrumbSeparator.vue";

const {
  params: { slug },
  fullPath,
} = useRoute();

const { t, locale } = useI18n();

const basePath = computed(() => {
  if (Array.isArray(slug)) {
    return `/${slug[0] ?? ""}`;
  }

  return `/${slug ?? ""}`;
});

const paths = computed(() => {
  if (Array.isArray(slug)) {
    return slug.reduce<string[]>((paths, slug) => {
      paths.push(`${paths.join("/")}/${slug}`);
      return paths;
    }, []);
  }

  return [slug || "/"];
});

const { data } = await useAsyncData(
  `breadcrumbs-${fullPath}`,
  async () => {
    const items = await queryContent(basePath.value)
      .where({ _locale: locale.value, _path: { $in: paths.value } })
      .only(["title", "_path"])
      .find();

    return items.map<BreadcrumbItemProps>((breadcrumb, index) => ({
      label: breadcrumb.title ?? t("APP_NAME"),
      to: breadcrumb._path,
      current: index === items.length - 1,
    }));
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
      <template v-for="(item, index) in breadcrumbItems" :key="item.to">
        <UBreadcrumbItem>
          <UBreadcrumbLink v-if="!item.current" :to="item.to">
            {{ item.label }}
          </UBreadcrumbLink>
          <UBreadcrumbPage v-else>{{ item.label }}</UBreadcrumbPage>
        </UBreadcrumbItem>
        <BreadcrumbSeparator v-if="!item.current" />
      </template>
    </UBreadcrumbList>
  </UBreadcrumb>
</template>
