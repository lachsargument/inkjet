<script setup lang="ts">
// A sharper checkmark than Lucide's `check` (45°/45°, a right angle):
// 50°/58° strokes meeting at ~71°, long/short ratio ~1.95. The 1.875
// stroke renders 1.25px at 16px, a touch heavier than the 1.5 icon
// default so the state mark stands out.
withDefaults(
  defineProps<{
    size?: number | string;
    strokeWidth?: number | string;
  }>(),
  { size: 16, strokeWidth: 1.875 },
);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m5.5 12.5 5 6 8-13" />
  </svg>
</template>
