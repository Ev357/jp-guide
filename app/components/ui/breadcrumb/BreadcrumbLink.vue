<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { NuxtLinkProps } from "#app";
import { cn } from "@/lib/utils";
import { useForwardPropsEmits } from "radix-vue";

const props = defineProps<
  NuxtLinkProps & {
    locale?: string | undefined;
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps);
</script>

<template>
  <NuxtLinkLocale
    v-bind="forwarded"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </NuxtLinkLocale>
</template>
