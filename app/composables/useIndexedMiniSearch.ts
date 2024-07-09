import MiniSearch, { type Options as MiniSearchOptions } from "minisearch";

export const useIndexedMiniSearch = <DataItem>(
  search: MaybeRefOrGetter<string>,
  indexedData: MaybeRefOrGetter<string>,
  options: MaybeRefOrGetter<MiniSearchOptions<DataItem>>,
) => {
  const indexedMiniSearch = computed(() =>
    MiniSearch.loadJSON(toValue(indexedData), toValue(options)),
  );

  const results = computed(() =>
    indexedMiniSearch.value.search(toValue(search)),
  );

  return results;
};
