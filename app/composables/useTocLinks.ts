import type { TocLink, Toc } from "@nuxt/content";

export const useTocLinks = (toc: Ref<Toc | undefined>) => {
  const links = ref<
    | (TocLink & {
        isVisible?: boolean;
      })[]
    | undefined
  >(toc.value?.links);

  onMounted(() => {
    watchEffect(() => {
      toc.value?.links.forEach((tocLink) => {
        useIntersectionObserver(
          document.getElementById(tocLink.id),
          ([intersect]) => {
            const link = links.value?.find(
              (targetLink) => targetLink.id === tocLink.id,
            );
            if (!link) return;

            link.isVisible = intersect?.isIntersecting;
          },
        );
      });
    });
  });

  return links;
};
