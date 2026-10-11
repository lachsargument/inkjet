import { DropdownMenuContent } from "reka-ui";
import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  IjMenu,
  IjMenuCheckboxItem,
  IjMenuRadioGroup,
  IjMenuRadioItem,
  IjMenuSwitchItem,
  IjMenuTrigger,
  IjSwitch,
} from "../src/index.ts";

const render = async (fn: () => ReturnType<typeof h>) =>
  (await renderToString(createSSRApp(fn))).replace(/<!--.*?-->/g, "");

test("switch reflects its model as aria-checked", async () => {
  const on = await render(() => h(IjSwitch, { modelValue: true }));
  const off = await render(() => h(IjSwitch, { disabled: true }));
  expect(on).toMatch(/role="switch"[^>]*aria-checked="true"/);
  expect(on).toContain('data-state="checked"');
  expect(off).toMatch(/aria-checked="false"/);
  expect(off).toContain("data-disabled");
});

test("menu switch, checkbox, and radio items expose checked state", async () => {
  const html = await render(() =>
    h(IjMenu, { defaultOpen: true }, () => [
      h(IjMenuTrigger, () => "Open"),
      // Bare content: Reka's portal only renders after mount.
      h(DropdownMenuContent, () => [
        h(IjMenuSwitchItem, { modelValue: true }, () => "Small text"),
        h(IjMenuCheckboxItem, { modelValue: false }, () => "Show outline"),
        h(IjMenuRadioGroup, { modelValue: "serif" }, () => [
          h(IjMenuRadioItem, { value: "default" }, () => "Default"),
          h(IjMenuRadioItem, { value: "serif" }, () => "Serif"),
        ]),
      ]),
    ]),
  );
  expect(html).toMatch(
    /role="menuitemcheckbox"[^>]*aria-checked="true".*Small text.*class="ij-switch" data-state="checked"/s,
  );
  expect(html).toMatch(/role="menuitemcheckbox"[^>]*aria-checked="false"[^>]*>.*Show outline/s);
  expect(html).toMatch(/role="menuitemradio"[^>]*aria-checked="false"[^>]*>.*Default/s);
  expect(html).toMatch(/role="menuitemradio"[^>]*aria-checked="true"[^>]*>.*Serif/s);
});
