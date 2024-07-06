export const getPath = (slug: string | string[] | undefined) => {
  if (Array.isArray(slug)) {
    return `/${slug.join("/")}`;
  }

  return `/${slug}`;
};
