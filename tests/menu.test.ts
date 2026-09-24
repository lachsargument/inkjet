import { expect, test } from "vite-plus/test";
import { DropdownMenuContent } from "reka-ui";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { IjMenu, IjMenuItem, IjMenuSeparator, IjMenuTrigger } from "../src/index.ts";

test("open menu renders items with shortcut and disabled state", async () => {
  const app = createSSRApp(() =>
    h(IjMenu, { defaultOpen: true }, () => [
      h(IjMenuTrigger, () => "Open"),
      // Reka's portal only renders after mount, so SSR uses the bare
      // (non-portaled) content; IjMenuContent is covered in the playground.
      h(DropdownMenuContent, () => [
        h(IjMenuItem, { shortcut: "⌘D" }, () => "Duplicate"),
        h(IjMenuSeparator),
        h(IjMenuItem, { disabled: true, variant: "danger" }, () => "Move to Trash"),
      ]),
    ]),
  );
  const html = (await renderToString(app)).replace(/<!--.*?-->/g, "");
  expect(html).toContain('role="menu"');
  expect(html).toMatch(/class="ij-menu-item__trailing"[^>]*>⌘D/);
  expect(html).toMatch(/role="menuitem"[^>]*data-disabled[^>]*>.*Move to Trash/s);
  expect(html).toContain('role="separator"');
  expect(html).toMatch(/class="ij-menu-item ij-menu-item--danger"[^>]*>.*Move to Trash/s);
});
