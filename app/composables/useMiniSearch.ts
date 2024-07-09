import MiniSearch, { type Options as MiniSearchOptions } from "minisearch";

export const useMiniSearch = function <T = any>(
  search: MaybeRefOrGetter<string>,
  data: MaybeRefOrGetter<T[]>,
  options: MaybeRefOrGetter<MiniSearchOptions<T>>,
) {
  const miniSearch = computed(() => new MiniSearch(toValue(options)));

  miniSearch.value.addAll(toValue(data));

  const results = computed(() => miniSearch.value.search(toValue(search)));

  return results;
};
