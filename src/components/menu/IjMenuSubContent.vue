<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuSubContent } from "reka-ui";

defineOptions({ inheritAttrs: false });
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
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
