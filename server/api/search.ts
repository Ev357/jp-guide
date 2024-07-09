import MiniSearch from "minisearch";
import {
  serverSearchContent,
  splitPageIntoSections,
} from "@@/node_modules/@nuxt/content/dist/runtime/server/search";
import zod from "zod";

export default defineEventHandler(async (event) => {
  const { content } = useRuntimeConfig().public;
  const { ignoredTags = [], filterQuery, indexed, options } = content.search!;
  const { locales } = content;

  const result = await getValidatedQuery(event, (body) =>
    zod
      .object({
        locale: zod.enum([locales[0], ...locales.slice(1)]).default(locales[0]),
      })
      .safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0]?.code,
      message: "Bad Request",
      data: result.error.issues,
    });
  }

  const files = await serverSearchContent(event, {
    ...filterQuery,
    _locale: result.data.locale,
  });

  const sections = files
    .map((page) => splitPageIntoSections(page, { ignoredTags }))
    .flat();

  if (indexed) {
    const miniSearch = new MiniSearch(options!);
    miniSearch.addAll(sections);

    console.log(typeof miniSearch);

    return JSON.stringify(miniSearch);
  }

  return sections;
});
