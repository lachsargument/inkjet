<script setup lang="ts">
import { ref } from "vue";
import { IjButton } from "../src/index.ts";

const theme = ref<"light" | "dark">(
  matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
);

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme.value;
}
</script>

<template>
  <main class="playground">
    <section>
      <h2>Button</h2>
      <div class="row">
        <IjButton>Default</IjButton>
        <IjButton variant="primary">Primary</IjButton>
        <IjButton variant="ghost">Ghost</IjButton>
        <IjButton size="sm">Small</IjButton>
        <IjButton disabled>Disabled</IjButton>
        <IjButton as-child><a href="#">Link</a></IjButton>
      </div>
    </section>
    <IjButton variant="ghost" size="sm" @click="toggleTheme">Theme: {{ theme }}</IjButton>
  </main>
</template>

<style>
body {
  margin: 0;
  background: var(--ij-bg);
  color: var(--ij-text);
  font-family: var(--ij-font);
}

.playground {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 16px;
}

.playground h2 {
  font-size: var(--ij-font-size-lg);
  font-weight: 600;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
</style>
