<script setup lang="ts">
import {
  ALargeSmall,
  ArrowRight,
  Bell,
  Copy,
  Eye,
  Languages,
  Link,
  Lock,
  MoveHorizontal,
  Trash,
  Type,
} from "@lucide/vue";
import { ref } from "vue";
import {
  IjButton,
  IjMenu,
  IjMenuCheckboxItem,
  IjMenuContent,
  IjMenuFooter,
  IjMenuItem,
  IjMenuLabel,
  IjMenuRadioGroup,
  IjMenuRadioItem,
  IjMenuSeparator,
  IjMenuSub,
  IjMenuSubContent,
  IjMenuSubTrigger,
  IjMenuSwitchItem,
  IjMenuTrigger,
  IjSwitch,
} from "../src/index.ts";

const lastAction = ref("none");
const smallText = ref(false);
const fullWidth = ref(true);
const locked = ref(false);
const font = ref("default");
const showComments = ref(true);
const showBacklinks = ref(false);

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
      <h2>Switch</h2>
      <div class="row">
        <IjSwitch v-model="smallText" />
        <span class="hint">Small text: {{ smallText }}</span>
        <IjSwitch v-model="fullWidth" />
        <span class="hint">Full width: {{ fullWidth }}</span>
        <IjSwitch disabled />
        <span class="hint">Disabled</span>
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
            <IjMenuSwitchItem v-model="smallText">
              <template #icon><ALargeSmall :size="16" :stroke-width="1.5" /></template>
              Small text
            </IjMenuSwitchItem>
            <IjMenuSwitchItem v-model="fullWidth">
              <template #icon><MoveHorizontal :size="16" :stroke-width="1.5" /></template>
              Full width
            </IjMenuSwitchItem>
            <IjMenuSwitchItem v-model="locked" disabled>
              <template #icon><Lock :size="16" :stroke-width="1.5" /></template>
              Lock page
            </IjMenuSwitchItem>
            <IjMenuSeparator />
            <IjMenuLabel>Page</IjMenuLabel>
            <IjMenuSub>
              <IjMenuSubTrigger>
                <template #icon><Type :size="16" :stroke-width="1.5" /></template>
                Font
                <template #trailing>{{ font }}</template>
              </IjMenuSubTrigger>
              <IjMenuSubContent>
                <IjMenuRadioGroup v-model="font">
                  <IjMenuRadioItem value="default">Default</IjMenuRadioItem>
                  <IjMenuRadioItem value="serif">Serif</IjMenuRadioItem>
                  <IjMenuRadioItem value="mono">Mono</IjMenuRadioItem>
                </IjMenuRadioGroup>
              </IjMenuSubContent>
            </IjMenuSub>
            <IjMenuSub>
              <IjMenuSubTrigger>
                <template #icon><Eye :size="16" :stroke-width="1.5" /></template>
                Show
              </IjMenuSubTrigger>
              <IjMenuSubContent>
                <IjMenuCheckboxItem v-model="showComments">Comments</IjMenuCheckboxItem>
                <IjMenuCheckboxItem v-model="showBacklinks">Backlinks</IjMenuCheckboxItem>
              </IjMenuSubContent>
            </IjMenuSub>
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
