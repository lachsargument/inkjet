<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuSubContent } from "reka-ui";
import { useTemplateRef } from "vue";
import { useScrollFade } from "../../composables/useScrollFade.ts";

defineOptions({ inheritAttrs: false });

const { fadeTop, fadeBottom } = useScrollFade(useTemplateRef("viewport"));
</script>

<template>
  <DropdownMenuPortal>
    <!-- -5 = content padding + ring, so the first sub item lines up with its trigger. -->
    <DropdownMenuSubContent
      v-bind="$attrs"
      :side-offset="2"
      :align-offset="-5"
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
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
