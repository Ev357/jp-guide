<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
import { TreeItem, TreeRoot, type FlattenedItem } from "radix-vue";

const {
  params: { slug },
  fullPath,
} = useRoute();

const { locale } = useI18n();

const path = computed(() => getPath(slug));
const paths = computed(() => getPaths(slug));
const basePath = computed(() => getBasePath(slug));

const { data: items } = await useLazyAsyncData(
  `tree-${fullPath}`,
  () =>
    fetchContentNavigation(
      queryContent(basePath.value).where({ _locale: locale.value }),
    ),
  {
    watch: [locale],
  },
);

const getFilteredItems = (items: FlattenedItem<NavItem>[]) =>
  items.reduce<(FlattenedItem<NavItem> & { showIcon?: boolean })[]>(
    (items, item) => {
      if (item.value._path === item.parentItem?._path) {
        return items;
      }

      items.push({
        ...item,
        showIcon:
          item.hasChildren &&
          item.value.children?.some(
            (childItem) => childItem._path !== item.value._path,
          ),
      });
      return items;
    },
    [],
  );
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems }"
    class="sticky top-12 select-none list-none text-sm"
    :items="items"
    :get-key="(item) => item._path"
    :default-expanded="paths"
  >
    <ValueWrapper
      :value="getFilteredItems(flattenItems)"
      v-slot="{ value: items }"
    >
      <template v-if="items.length > 1 || items[0]?.showIcon">
        <TreeItem
          v-for="(item, index) in items"
          :key="item._id"
          v-slot="{ isExpanded }"
          :style="{ 'padding-left': `${item.level - 0.5}rem` }"
          v-bind="item.bind"
          class="my-0.5 flex items-center justify-between rounded px-2 outline-none"
          :class="{ 'py-1': index !== 0 }"
        >
          <NuxtLinkLocale
            class="pl-2 text-muted-foreground hover:text-primary"
            :class="{ 'text-primary': item.value._path === path }"
            :to="item.value._path"
          >
            {{ item.value.title }}
          </NuxtLinkLocale>
          <span
            v-if="item.showIcon"
            class="i-heroicons-chevron-down-20-solid size-4 shrink-0 transition-all data-[expanded=true]:rotate-180"
            :data-expanded="isExpanded"
          ></span>
        </TreeItem>
      </template>
    </ValueWrapper>
  </TreeRoot>
</template>
