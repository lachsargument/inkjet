<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";
import { useTemplateRef } from "vue";
import { useScrollFade } from "../../composables/useScrollFade.ts";

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

const { fadeTop, fadeBottom } = useScrollFade(useTemplateRef("viewport"));
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
      <div
        ref="viewport"
        class="ij-menu-viewport"
        :data-fade-top="fadeTop || undefined"
        :data-fade-bottom="fadeBottom || undefined"
      >
        <slot />
      </div>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
