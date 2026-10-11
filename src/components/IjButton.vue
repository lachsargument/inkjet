<script setup lang="ts">
import { Primitive, type AsTag } from "reka-ui";
import type { Component } from "vue";

// Declared inline: the SFC compiler cannot resolve props that extend
// types imported from node_modules (reka-ui's PrimitiveProps).
interface Props {
  as?: AsTag | Component;
  asChild?: boolean;
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "md",
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :disabled="props.disabled"
    :class="['ij-button', `ij-button--${props.variant}`, `ij-button--${props.size}`]"
  >
    <slot />
  </Primitive>
</template>

<style>
.ij-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--ij-border-alpha);
  border-radius: var(--ij-radius-lg);
  background: transparent;
  color: var(--ij-text);
  font: 500 var(--ij-font-size) / 1.2 var(--ij-font);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background 20ms ease-in;
}

/* Menu/popover triggers (asChild) set aria-expanded while their popup is
   open; the hover color stays then, wherever the pointer is.
   Not data-state: a wrapping IjTooltip overwrites it with its own state. */
.ij-button:hover,
.ij-button[aria-expanded="true"] {
  background: var(--ij-bg-hover);
}

.ij-button:active {
  background: var(--ij-bg-active);
}

.ij-button:focus-visible {
  outline: 2px solid var(--ij-accent-soft);
  outline-offset: 1px;
}

.ij-button:disabled {
  color: var(--ij-text-disabled);
  cursor: default;
  background: transparent;
}

.ij-button--sm {
  height: 28px;
  padding: 0 8px;
  border-radius: var(--ij-radius);
}

.ij-button--ghost {
  border-color: transparent;
  color: var(--ij-text-secondary);
}

/* HSL lightness shifts 5 on hover and 10 while pressed: darker in light
   mode, lighter in dark mode (--ij-shade-dir). Relative color syntax keeps
   both states tied to the --ij-primary token. */
.ij-button--primary {
  border-color: transparent;
  background: var(--ij-primary);
  color: var(--ij-primary-text);
  transition: background 100ms ease-in-out;
}

.ij-button--primary:hover,
.ij-button--primary[aria-expanded="true"] {
  background: hsl(from var(--ij-primary) h s calc(l + 5 * var(--ij-shade-dir)));
}

.ij-button--primary:active {
  background: hsl(from var(--ij-primary) h s calc(l + 10 * var(--ij-shade-dir)));
}
</style>
