<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "reka-ui";

defineProps<{
  disabled?: boolean;
}>();

const checked = defineModel<boolean>({ default: false });
</script>

<template>
  <SwitchRoot v-model="checked" :disabled="disabled" class="ij-switch">
    <SwitchThumb class="ij-switch__thumb" />
  </SwitchRoot>
</template>
