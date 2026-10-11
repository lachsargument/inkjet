<script setup lang="ts">
import { DropdownMenuItem } from "reka-ui";
import { computed, useTemplateRef } from "vue";
import { formatShortcut, useShortcut } from "../../composables/useShortcut.ts";

const props = defineProps<{
  disabled?: boolean;
  /** Key combo such as "Mod+D"; shown formatted and active while open. */
  shortcut?: string;
  /** "danger" turns the item red while highlighted, for destructive actions. */
  variant?: "default" | "danger";
}>();

const item = useTemplateRef<{ $el: HTMLElement }>("item");
const shortcutLabel = computed(() => props.shortcut && formatShortcut(props.shortcut));

// Items only exist while their menu is open, so this binding is scoped to
// that. Clicking reuses Reka's select path: `select` fires, menu closes.
useShortcut(
  () => props.shortcut,
  () => {
    if (!props.disabled) item.value?.$el.click();
  },
  { capture: true },
);
</script>

<template>
  <DropdownMenuItem
    ref="item"
    :disabled="disabled"
    class="ij-menu-item"
    :class="{ 'ij-menu-item--danger': variant === 'danger' }"
  >
    <span v-if="$slots.icon" class="ij-menu-item__icon"><slot name="icon" /></span>
    <span class="ij-menu-item__label"><slot /></span>
    <span v-if="$slots.trailing || shortcut" class="ij-menu-item__trailing">
      <slot name="trailing">{{ shortcutLabel }}</slot>
    </span>
  </DropdownMenuItem>
</template>
