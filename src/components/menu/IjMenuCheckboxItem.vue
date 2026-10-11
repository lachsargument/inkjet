<script setup lang="ts">
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from "reka-ui";
import IjCheckIcon from "../../icons/IjCheckIcon.vue";

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
      <IjCheckIcon />
    </DropdownMenuItemIndicator>
  </DropdownMenuCheckboxItem>
</template>
