<script setup lang="ts">
import { TooltipProvider } from "reka-ui";

// Mount once near the app root. Besides being required by Reka, the
// provider makes neighbouring tooltips open instantly once one is shown
// (skipDelayDuration), so sweeping across a toolbar doesn't re-wait.
withDefaults(
  defineProps<{
    delayDuration?: number;
    skipDelayDuration?: number;
  }>(),
  { delayDuration: 500, skipDelayDuration: 300 },
);
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration" :skip-delay-duration="skipDelayDuration">
    <slot />
  </TooltipProvider>
</template>
