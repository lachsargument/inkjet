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
  MessageSquare,
  MoveHorizontal,
  PanelLeft,
  Star,
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
  IjPopover,
  IjPopoverClose,
  IjPopoverContent,
  IjPopoverTrigger,
  IjSwitch,
  IjTooltip,
  IjTooltipProvider,
  useShortcut,
} from "../src/index.ts";

const lastAction = ref("none");

// App-wide bindings for when the menu is closed; while it is open, the
// menu items handle the same keys first.
useShortcut("Mod+Alt+L", () => (lastAction.value = "Copy link (shortcut)"));
useShortcut("Mod+D", () => (lastAction.value = "Duplicate (shortcut)"));
useShortcut("Mod+Shift+P", () => (lastAction.value = "Move to (shortcut)"));
const smallText = ref(false);
const fullWidth = ref(true);
const locked = ref(false);
const font = ref("default");
const showComments = ref(true);
const showBacklinks = ref(false);
const publish = ref(false);

const theme = ref<"light" | "dark">(
  matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
);

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme.value;
}
</script>

<template>
  <IjTooltipProvider>
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
        <h2>Tooltip</h2>
        <div class="row">
          <IjTooltip content="Lock sidebar open" shortcut="Mod+\" side="right">
            <IjButton variant="ghost" size="sm" aria-label="Lock sidebar open">
              <PanelLeft :size="16" :stroke-width="1.5" />
            </IjButton>
          </IjTooltip>
          <IjTooltip content="View all comments">
            <IjButton variant="ghost" size="sm" aria-label="View all comments">
              <MessageSquare :size="16" :stroke-width="1.5" />
            </IjButton>
          </IjTooltip>
          <IjTooltip content="Add to Favorites">
            <IjButton variant="ghost" size="sm" aria-label="Add to Favorites">
              <Star :size="16" :stroke-width="1.5" />
            </IjButton>
          </IjTooltip>
          <IjTooltip content="A longer tooltip wraps once it reaches the 300px max width.">
            <IjButton size="sm">Long text</IjButton>
          </IjTooltip>
        </div>
      </section>
      <section>
        <h2>Popover</h2>
        <div class="row">
          <IjPopover>
            <IjPopoverTrigger as-child>
              <IjButton variant="ghost">Share</IjButton>
            </IjPopoverTrigger>
            <IjPopoverContent align="start">
              <div class="share-panel">
                <div class="share-panel__title">Share this page</div>
                <p class="share-panel__text">
                  Anyone with the link can view. Turn on publishing to make it public.
                </p>
                <label class="share-panel__row">
                  Publish to web
                  <IjSwitch v-model="publish" />
                </label>
                <div class="share-panel__actions">
                  <IjPopoverClose as-child>
                    <IjButton size="sm">Cancel</IjButton>
                  </IjPopoverClose>
                  <IjPopoverClose as-child>
                    <IjButton size="sm" variant="primary">Done</IjButton>
                  </IjPopoverClose>
                </div>
              </div>
            </IjPopoverContent>
          </IjPopover>
          <span class="hint">Publish: {{ publish }}</span>
        </div>
      </section>
      <section>
        <h2>Menu</h2>
        <div class="row">
          <IjMenu>
            <IjMenuTrigger as-child>
              <IjTooltip content="Page settings & actions">
                <IjButton variant="ghost">···</IjButton>
              </IjTooltip>
            </IjMenuTrigger>
            <IjMenuContent>
              <IjMenuItem shortcut="Mod+Alt+L" @select="lastAction = 'Copy link'">
                <template #icon><Link :size="16" :stroke-width="1.5" /></template>
                Copy link
              </IjMenuItem>
              <IjMenuItem shortcut="Mod+D" @select="lastAction = 'Duplicate'">
                <template #icon><Copy :size="16" :stroke-width="1.5" /></template>
                Duplicate
              </IjMenuItem>
              <IjMenuItem shortcut="Mod+Shift+P" @select="lastAction = 'Move to'">
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
  </IjTooltipProvider>
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

/* Popover content is portaled to <body>, so these are not scoped under
   .playground. */
.share-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
  padding: 16px;
}

.share-panel__title {
  font-weight: 600;
}

.share-panel__text {
  margin: 0;
  color: var(--ij-text-secondary);
  font-size: var(--ij-font-size-sm);
  line-height: 1.5;
}

.share-panel__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.share-panel__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
</style>
