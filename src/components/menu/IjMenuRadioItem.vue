<script setup lang="ts">
import { DropdownMenuItemIndicator, DropdownMenuRadioItem } from "reka-ui";
import IjCheckIcon from "../../icons/IjCheckIcon.vue";

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
      <IjCheckIcon />
    </DropdownMenuItemIndicator>
  </DropdownMenuRadioItem>
</template>
