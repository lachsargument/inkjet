<script setup lang="ts">
import { ArrowRight, Bell, Copy, Languages, Link, Trash } from "@lucide/vue";
import { ref } from "vue";
import {
  IjButton,
  IjMenu,
  IjMenuContent,
  IjMenuFooter,
  IjMenuItem,
  IjMenuLabel,
  IjMenuSeparator,
  IjMenuSub,
  IjMenuSubContent,
  IjMenuSubTrigger,
  IjMenuTrigger,
} from "../src/index.ts";

const lastAction = ref("none");

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
    <section>
      <h2>Menu</h2>
      <div class="row">
        <IjMenu>
          <IjMenuTrigger as-child>
            <IjButton variant="ghost">···</IjButton>
          </IjMenuTrigger>
          <IjMenuContent>
            <IjMenuItem shortcut="⌘⌥L" @select="lastAction = 'Copy link'">
              <template #icon><Link :size="16" :stroke-width="1.5" /></template>
              Copy link
            </IjMenuItem>
            <IjMenuItem shortcut="⌘D" @select="lastAction = 'Duplicate'">
              <template #icon><Copy :size="16" :stroke-width="1.5" /></template>
              Duplicate
            </IjMenuItem>
            <IjMenuItem shortcut="⌘⇧P" @select="lastAction = 'Move to'">
              <template #icon><ArrowRight :size="16" :stroke-width="1.5" /></template>
              Move to
            </IjMenuItem>
            <IjMenuItem variant="danger" @select="lastAction = 'Move to Trash'">
              <template #icon><Trash :size="16" :stroke-width="1.5" /></template>
              Move to Trash
            </IjMenuItem>
            <IjMenuSeparator />
            <IjMenuLabel>Page</IjMenuLabel>
            <IjMenuSub>
              <IjMenuSubTrigger>
                <template #icon><Languages :size="16" :stroke-width="1.5" /></template>
                Translate
              </IjMenuSubTrigger>
              <IjMenuSubContent>
                <IjMenuItem @select="lastAction = 'English'">English</IjMenuItem>
                <IjMenuItem @select="lastAction = '中文'">中文</IjMenuItem>
                <IjMenuItem @select="lastAction = '日本語'">日本語</IjMenuItem>
              </IjMenuSubContent>
            </IjMenuSub>
            <IjMenuItem @select="lastAction = 'Notify me'">
              <template #icon><Bell :size="16" :stroke-width="1.5" /></template>
              Notify me
              <template #trailing>Comments</template>
            </IjMenuItem>
            <IjMenuSeparator />
            <IjMenuFooter>
              <div>7 words</div>
              <div>Last edited by Khangai Yan</div>
              <div>Today at 9:04 AM</div>
            </IjMenuFooter>
          </IjMenuContent>
        </IjMenu>
        <span class="hint">Last action: {{ lastAction }}</span>
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

.hint {
  color: var(--ij-text-secondary);
  font-size: var(--ij-font-size);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
</style>
