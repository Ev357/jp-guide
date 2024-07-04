<script setup lang="ts">
import type { HeaderLink } from "@/components/Header.vue";

defineProps<{ links: HeaderLink[] }>();

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
  <div>
    <Button
      variant="outline"
      class="h-8 w-40 justify-between lg:w-64"
      @click="handleOpenChange"
    >
      <span>{{ $t("HEADER.COMMAND.SEARCH") }}</span>
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>
        K
      </kbd>
    </Button>
    <CommandDialog :open="open" @update:open="handleOpenChange">
      <CommandInput :placeholder="$t('HEADER.COMMAND.SEARCH_PLACEHOLDER')" />
      <CommandList>
        <CommandEmpty>{{ $t("HEADER.COMMAND.NO_RESULTS") }}</CommandEmpty>
        <CommandGroup
          v-for="(link, index) in links"
          :key="link.to"
          :heading="link.title"
        >
          <CommandItem :value="`thing-${index}`">Thing {{ index }}</CommandItem>
          <CommandItem :value="`second-thing-${index}`">
            Second Thing {{ index }}
          </CommandItem>
          <CommandItem :value="`third-thing-${index}`">
            Third Thing {{ index }}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  </div>
</template>
