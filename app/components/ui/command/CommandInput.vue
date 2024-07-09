<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  ComboboxInput,
  type ComboboxInputProps,
  useForwardProps,
} from "radix-vue";
import { cn } from "@/lib/utils";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    ComboboxInputProps & {
      class?: HTMLAttributes["class"];
      loading?: boolean;
    }
  >(),
  {
    loading: false,
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <span
      class="mr-2 size-5 shrink-0 opacity-50"
      :class="{
        'i-heroicons-magnifying-glass-20-solid': !loading,
        'i-heroicons-arrow-path-20-solid animate-spin': loading,
      }"
    ></span>
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    />
  </div>
</template>
