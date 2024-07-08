<script setup lang="ts">
import type { Toc, TocLink } from "@nuxt/content";
import { cn } from "@/lib/utils";

const props = defineProps<{
  toc?: Toc;
}>();
const { toc } = toRefs(props);

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
</script>

<template>
  <div v-if="links?.length" class="sticky top-12 flex flex-col gap-2">
    <p>{{ $t("TOC.TITLE") }}</p>
    <ul>
      <li v-for="link in links" :key="link.text">
        <a
          :href="`#${link.id}`"
          :class="
            cn('text-muted-foreground hover:text-foreground', {
              'text-foreground': link.isVisible,
            })
          "
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
