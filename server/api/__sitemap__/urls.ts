import { serverQueryContent } from "#content/server";
import zod from "zod";

export default defineSitemapEventHandler(async (event) => {
  const { content } = useRuntimeConfig(event).public;
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

  const contentList = await serverQueryContent(event)
    .where({ _locale: result.data.locale })
    .find();

  return contentList
    .map((c) => ({
      ...c.sitemap,
      loc: `${c._locale !== locales[0] ? `/${c._locale}` : ""}${c.sitemap?.loc ?? "/"}`,
    }))
    .filter(Boolean);
});
