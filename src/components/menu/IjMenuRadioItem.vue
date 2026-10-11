<script setup lang="ts">
import { Check } from "@lucide/vue";
import { DropdownMenuItemIndicator, DropdownMenuRadioItem } from "reka-ui";

defineProps<{
  value: string;
  disabled?: boolean;
}>();
</script>

<template>
  <DropdownMenuRadioItem :value="value" :disabled="disabled" class="ij-menu-item">
    <span v-if="$slots.icon" class="ij-menu-item__icon"><slot name="icon" /></span>
    <span class="ij-menu-item__label"><slot /></span>
    <DropdownMenuItemIndicator class="ij-menu-item__check">
      <Check :size="16" :stroke-width="1.5" />
    </DropdownMenuItemIndicator>
  </DropdownMenuRadioItem>
</template>
