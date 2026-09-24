<script setup lang="ts">
import { DropdownMenuItem } from "reka-ui";

defineProps<{
  disabled?: boolean;
  shortcut?: string;
  /** "danger" turns the item red while highlighted, like Notion's "Move to Trash". */
  variant?: "default" | "danger";
}>();
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    class="ij-menu-item"
    :class="{ 'ij-menu-item--danger': variant === 'danger' }"
  >
    <span v-if="$slots.icon" class="ij-menu-item__icon"><slot name="icon" /></span>
    <span class="ij-menu-item__label"><slot /></span>
    <span v-if="$slots.trailing || shortcut" class="ij-menu-item__trailing">
      <slot name="trailing">{{ shortcut }}</slot>
    </span>
  </DropdownMenuItem>
</template>
