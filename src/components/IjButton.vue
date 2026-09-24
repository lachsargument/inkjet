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

.ij-button:hover {
  background: var(--ij-bg-hover);
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

.ij-button--primary {
  border-color: transparent;
  background: var(--ij-accent);
  color: #fff;
}

.ij-button--primary:hover {
  background: var(--ij-accent-hover);
}
</style>
