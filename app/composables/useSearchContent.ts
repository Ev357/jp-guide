import type { Options as MiniSearchOptions } from "minisearch";

export const useSearchContent = async <DataItem>(
  search: MaybeRefOrGetter<string>,
  options: {
    miniSearch?: MaybeRefOrGetter<MiniSearchOptions<DataItem>>;
    locale?: MaybeRefOrGetter<string>;
  } = {},
) => {
  const runtimeConfig = useRuntimeConfig();
  const { content } = runtimeConfig.public;
  const { search: searchOptions } = content;
  const { indexed: useIndexedSearch } = searchOptions || {};

  const searchRoute = "/api/search";

  if (useIndexedSearch) {
    const { options: miniSearchOptions } = searchOptions || {};

    const locale = toValue(options.locale);

    const data = await $fetch<string>(searchRoute, {
      responseType: "text",
      query: { locale },
    });

    if (!data) {
      throw createError({
        statusCode: 500,
        message: "Missing search data",
      });
    }

    const results = useIndexedMiniSearch(search, data, miniSearchOptions!);

    return results;
  }

  if (!options.miniSearch) {
    throw createError({
      statusCode: 500,
      message: "Missing miniSearch options",
    });
  }

  const data = await $fetch<DataItem[]>(searchRoute);

  if (!data) {
    throw createError({
      statusCode: 500,
      message: "Missing search data",
    });
  }

  const results = useMiniSearch(search, data, options.miniSearch);

  return results;
};
