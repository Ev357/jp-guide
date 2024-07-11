<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type { SelectEvent } from "@@/node_modules/radix-vue/dist/Combobox/ComboboxItem.js";
import type { AcceptableValue } from "@@/node_modules/radix-vue/dist/Combobox/ComboboxRoot.js";
import type { SearchResult } from "minisearch";
import type { ParsedContent } from "@nuxt/content";

const props = withDefaults(
  defineProps<{
    links?: Pick<ParsedContent, "title" | "_path">[];
    hideKbd?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    hideKbd: false,
  },
);

const { links } = toRefs(props);

const open = ref(false);

const { Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "k" && e.type === "keydown") {
      e.preventDefault();
    }
  },
});

const handleOpenChange = () => {
  open.value = !open.value;
  searchTerm.value = "";
};

if (Ctrl_K) {
  whenever(Ctrl_K, handleOpenChange);
}

const { t, locale } = useI18n();
const localePath = useLocalePath();

const searchTerm = ref("");

const { data: results, status } = useAsyncData(
  "command-search",
  async () => {
    if (!searchTerm.value) {
      return [];
    }

    const data = await useSearchContent(searchTerm.value, {
      locale,
    });
    return Array.from(
      data.value
        .reduce((data, result) => {
          const resultBasePath = getBasePath(result.id);
          const groupId =
            links.value?.find((link) => link._path === resultBasePath)?._path ??
            "/";
          const group = data.get(groupId);

          if (!group) {
            data.set(groupId, new Map([[result.title, result]]));
            return data;
          }

          const existingResult = group.get(result.title);

          if (!existingResult) {
            group.set(result.title, result);
            return data;
          }

          if (existingResult.score < result.score) {
            group.set(result.title, result);
            return data;
          }

          if (existingResult.id.length !== result.id.length) {
            group.set(
              existingResult.title,
              result.id.length < existingResult.id.length
                ? result
                : existingResult,
            );
            return data;
          }

          return data;
        }, new Map<string, Map<string, SearchResult>>())
        .entries(),
    ).map(([basePath, group]) => ({
      name:
        links.value?.find((link) => link._path === basePath)?.title ??
        t("COMMON.OTHER"),
      path: basePath,
      results: Array.from(group.values()),
    }));
  },
  {
    watch: [refDebounced(searchTerm, 300), locale],
  },
);

const handleSelect = (event: SelectEvent<AcceptableValue>) => {
  if (!(typeof event.detail.value === "string")) return;

  open.value = false;
  searchTerm.value = "";
  navigateTo(localePath(event.detail.value));
};
</script>

<template>
  <UButton
    variant="outline"
    :class="cn('h-8 w-64 justify-between', props.class)"
    @click="handleOpenChange"
  >
    <span>{{ $t("HEADER.COMMAND.SEARCH") }}</span>
    <kbd
      v-if="!hideKbd"
      class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] font-medium text-muted-foreground opacity-100"
    >
      <span class="text-xs">⌘</span>
      K
    </kbd>
  </UButton>
  <UCommandDialog
    v-model:search-term="searchTerm"
    :filter-function="(items) => items"
    :open="open"
    @update:open="handleOpenChange"
  >
    <UCommandInput
      :placeholder="$t('HEADER.COMMAND.SEARCH_PLACEHOLDER')"
      :loading="status === 'pending'"
    />
    <UCommandList v-if="searchTerm && status === 'success'">
      <UCommandEmpty>{{ $t("HEADER.COMMAND.NO_RESULTS") }}</UCommandEmpty>
      <UCommandGroup
        v-for="group in results"
        :key="group.path"
        :heading="group.name"
      >
        <UCommandItem
          v-for="result in group.results"
          :key="result.id"
          :value="result.id"
          @select="handleSelect"
        >
          {{ result.title }}
        </UCommandItem>
      </UCommandGroup>
      <UCommandSeparator />
    </UCommandList>
  </UCommandDialog>
</template>
