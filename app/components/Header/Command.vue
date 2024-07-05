<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { HeaderLink } from "@/components/Header.vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    links: HeaderLink[];
    hideKbd?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    hideKbd: false,
  },
);

const open = ref(false);

const { Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "k" && e.type === "keydown") {
      e.preventDefault();
    }
  },
});

const handleOpenChange = () => {
  open.value = !open.value;
};

if (Ctrl_K) {
  whenever(Ctrl_K, handleOpenChange);
}
</script>

<template>
  <UButton
    variant="outline"
    :class="cn('h-8 w-64 justify-between', props.class)"
    @click="handleOpenChange"
  >
    <span>{{ $t("HEADER.COMMAND.SEARCH") }}</span>
    <kbd
      v-if="!hideKbd"
      class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] font-medium text-muted-foreground opacity-100"
    >
      <span class="text-xs">⌘</span>
      K
    </kbd>
  </UButton>
  <UCommandDialog :open="open" @update:open="handleOpenChange">
    <UCommandInput :placeholder="$t('HEADER.COMMAND.SEARCH_PLACEHOLDER')" />
    <UCommandList>
      <UCommandEmpty>{{ $t("HEADER.COMMAND.NO_RESULTS") }}</UCommandEmpty>
      <UCommandGroup
        v-for="(link, index) in links"
        :key="link.path"
        :heading="link.title"
      >
        <UCommandItem :value="`thing-${index}`">Thing {{ index }}</UCommandItem>
        <UCommandItem :value="`second-thing-${index}`">
          Second Thing {{ index }}
        </UCommandItem>
        <UCommandItem :value="`third-thing-${index}`">
          Third Thing {{ index }}
        </UCommandItem>
      </UCommandGroup>
      <UCommandSeparator />
    </UCommandList>
  </UCommandDialog>
</template>
