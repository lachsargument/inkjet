<script setup lang="ts">
import { Check } from "@lucide/vue";
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from "reka-ui";

defineProps<{
  disabled?: boolean;
}>();

const checked = defineModel<boolean>({ default: false });

// Multi-select lists stay open so several options can be toggled in a row.
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
    <DropdownMenuItemIndicator class="ij-menu-item__check">
      <Check :size="16" :stroke-width="1.5" />
    </DropdownMenuItemIndicator>
  </DropdownMenuCheckboxItem>
</template>
