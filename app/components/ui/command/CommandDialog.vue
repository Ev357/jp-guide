<script setup lang="ts">
import { useForwardPropsEmits, type ComboboxRootProps } from "radix-vue";
import {
  type DialogRootEmits,
  type DialogRootProps,
  VisuallyHidden,
} from "radix-vue";
import Command from "./Command.vue";

const props = defineProps<
  DialogRootProps & Pick<ComboboxRootProps, "filterFunction">
>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const searchTerm = defineModel<string>("searchTerm", { required: true });
</script>

<template>
  <UDialog v-bind="forwarded">
    <UDialogContent class="overflow-hidden p-0 shadow-lg">
      <VisuallyHidden>
        <UDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{ $t("HEADER.COMMAND.TITLE") }}
        </UDialogTitle>
        <UDialogDescription
          class="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal"
        >
          {{ $t("HEADER.COMMAND.DESCRIPTION") }}
        </UDialogDescription>
      </VisuallyHidden>
      <Command
        :filter-function
        v-model:search-term="searchTerm"
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      >
        <slot />
      </Command>
    </UDialogContent>
  </UDialog>
</template>
