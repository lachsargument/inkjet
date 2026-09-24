<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { DropdownMenuSubTrigger } from "reka-ui";

defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <DropdownMenuSubTrigger :disabled="disabled" class="ij-menu-item">
    <span v-if="$slots.icon" class="ij-menu-item__icon"><slot name="icon" /></span>
    <span class="ij-menu-item__label"><slot /></span>
    <span class="ij-menu-item__trailing">
      <slot name="trailing" />
      <ChevronRight :size="16" :stroke-width="1.5" aria-hidden="true" />
    </span>
  </DropdownMenuSubTrigger>
</template>
