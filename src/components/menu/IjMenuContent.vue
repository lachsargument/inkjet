<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";

// Remaining DropdownMenuContent props/listeners arrive via $attrs, which
// must land on the content rather than the portal wrapper.
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }>(),
  { side: "bottom", align: "start", sideOffset: 4 },
);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="$attrs"
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      class="ij-menu-content"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
