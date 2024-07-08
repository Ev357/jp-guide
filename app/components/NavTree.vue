<script setup lang="ts">
import { TreeItem, TreeRoot } from "radix-vue";

const {
  params: { slug },
  fullPath,
} = useRoute();

const { locale } = useI18n();

const path = computed(() => getPath(slug));
const paths = computed(() => getPaths(slug));
const basePath = computed(() => getBasePath(slug));

const { data: items } = await useAsyncData(
  `tree-${fullPath}`,
  () =>
    fetchContentNavigation(
      queryContent(basePath.value).where({ _locale: locale.value }),
    ),
  {
    watch: [locale],
  },
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
    <template v-for="(item, index) in flattenItems" :key="item._id">
      <TreeItem
        v-if="item.value._path !== item.parentItem?._path"
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
          v-if="
            item.hasChildren &&
            !!item.value.children?.some(
              (childItem) => childItem._path !== item.value._path,
            )
          "
          class="i-heroicons-chevron-down-20-solid size-4 shrink-0 transition-all data-[expanded=true]:rotate-180"
          :data-expanded="isExpanded"
        ></span>
      </TreeItem>
    </template>
  </TreeRoot>
</template>
