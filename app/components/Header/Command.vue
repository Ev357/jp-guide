<script setup lang="ts">
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
      <span>Search...</span>
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>
        K
      </kbd>
    </Button>
    <CommandDialog :open="open" @update:open="handleOpenChange">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="search-emoji">Search Emoji</CommandItem>
          <CommandItem value="calculator">Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">Profile</CommandItem>
          <CommandItem value="billing">Billing</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
