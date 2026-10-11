<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from "reka-ui";
import { formatShortcut } from "../composables/useShortcut.ts";

// Attrs go to the trigger so an outer `IjMenuTrigger as-child` can wrap this
// component and land its handlers/ARIA on the same button. The reverse
// nesting (tooltip outside the menu trigger) breaks: the menu anchor would
// register with the tooltip's popper context and the menu never positions.
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    content?: string;
    /** Key combo such as "Mod+\\", shown formatted on a second, dimmer line. */
    shortcut?: string;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    disabled?: boolean;
  }>(),
  { side: "bottom", sideOffset: 6 },
);
</script>

<template>
  <TooltipRoot :disabled="disabled">
    <TooltipTrigger v-bind="$attrs" as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent :side="side" :side-offset="sideOffset" class="ij-tooltip">
        <slot name="content">{{ content }}</slot>
        <div v-if="shortcut" class="ij-tooltip__shortcut">{{ formatShortcut(shortcut) }}</div>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style>
.ij-tooltip {
  box-sizing: border-box;
  max-width: 300px;
  padding: 5px 8px;
  border-radius: var(--ij-radius);
  background: var(--ij-tooltip-bg);
  box-shadow: var(--ij-shadow-tooltip);
  color: var(--ij-tooltip-text);
  font: var(--ij-font-size-sm) / 1.4 var(--ij-font);
  z-index: 1001;
}

.ij-tooltip[data-state="delayed-open"],
.ij-tooltip[data-state="instant-open"] {
  animation: ij-tooltip-fade 50ms ease-out;
}

.ij-tooltip[data-state="closed"] {
  animation: ij-tooltip-fade 50ms ease-in reverse;
}

@keyframes ij-tooltip-fade {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ij-tooltip[data-state] {
    animation: none;
  }
}

.ij-tooltip__shortcut {
  color: var(--ij-tooltip-text-secondary);
}
</style>
