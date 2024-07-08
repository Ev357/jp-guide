export const getPaths = (slug: string | string[] | undefined) => {
  if (Array.isArray(slug)) {
    return slug.reduce<string[]>((paths, slug) => {
      paths.push(`${paths.join("/")}/${slug}`);
      return paths;
    }, []);
  }

  return [slug || "/"];
};
