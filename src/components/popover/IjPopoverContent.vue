<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";

// Remaining PopoverContent props/listeners arrive via $attrs, which must
// land on the content rather than the portal wrapper.
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }>(),
  { side: "bottom", align: "center", sideOffset: 8 },
);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="$attrs"
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      class="ij-popover"
    >
      <div class="ij-popover__viewport"><slot /></div>
    </PopoverContent>
  </PopoverPortal>
</template>

<style>
/* No padding by default: panels are built from their own padded sections.
   Same two-layer structure as menus: the painted box does not scroll, so
   elastic overscroll never shows the page behind the rounded corners. */
.ij-popover {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: min(524px, var(--reka-popover-content-available-width));
  max-height: var(--reka-popover-content-available-height);
  overflow: hidden;
  border-radius: var(--ij-radius-2xl);
  background: var(--ij-bg-popover);
  box-shadow: var(--ij-shadow-panel);
  color: var(--ij-text);
  font-family: var(--ij-font);
  font-size: var(--ij-font-size);
  outline: none;
  z-index: 1000;
  transform-origin: var(--reka-popover-content-transform-origin);
}

.ij-popover__viewport {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  /* Own background so Chromium picks the matching overlay scrollbar. */
  background: var(--ij-bg-popover);
}

.ij-popover[data-state="open"] {
  animation: ij-popup-in 200ms ease;
}

.ij-popover[data-state="closed"] {
  animation: ij-popup-out 70ms ease-in;
}

@media (prefers-reduced-motion: reduce) {
  .ij-popover[data-state] {
    animation: none;
  }
}
</style>
