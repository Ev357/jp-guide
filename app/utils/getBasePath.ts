export const getBasePath = (slug: string | string[] | undefined) => {
  if (Array.isArray(slug)) {
    return `/${slug[0] ?? ""}`;
  }

  return `/${slug ?? ""}`;
};