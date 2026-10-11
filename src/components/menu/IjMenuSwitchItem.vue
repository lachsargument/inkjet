<script setup lang="ts">
import { DropdownMenuCheckboxItem } from "reka-ui";

defineProps<{
  disabled?: boolean;
}>();

const checked = defineModel<boolean>({ default: false });

// Notion keeps the menu open when a toggle row is flipped.
function keepOpen(event: Event) {
  event.preventDefault();
}
</script>

<template>
  <DropdownMenuCheckboxItem
    v-model="checked"
    :disabled="disabled"
    class="ij-menu-item"
    @select="keepOpen"
  >
    <span v-if="$slots.icon" class="ij-menu-item__icon"><slot name="icon" /></span>
    <span class="ij-menu-item__label"><slot /></span>
    <span
      class="ij-switch"
      :data-state="checked ? 'checked' : 'unchecked'"
      :data-disabled="disabled ? '' : undefined"
      aria-hidden="true"
    >
      <span class="ij-switch__thumb" />
    </span>
  </DropdownMenuCheckboxItem>
</template>
