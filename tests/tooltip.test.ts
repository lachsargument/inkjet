import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { IjButton, IjMenu, IjMenuTrigger, IjTooltip, IjTooltipProvider } from "../src/index.ts";

test("tooltip trigger merges onto the slotted button", async () => {
  const app = createSSRApp(() =>
    h(IjTooltipProvider, () =>
      h(IjTooltip, { content: "Page settings & actions" }, () => h(IjButton, () => "···")),
    ),
  );
  const html = (await renderToString(app)).replace(/<!--.*?-->/g, "");
  // asChild: a single <button> carries both the Ij styling and Reka's state.
  const button = html.match(/^<button[^>]*>/)?.[0] ?? "";
  expect(button).toContain('class="ij-button');
  expect(button).toContain('data-state="closed"');
  expect(html.match(/<button/g)).toHaveLength(1);
});

test("menu trigger can wrap a tooltip and still own the button", async () => {
  const app = createSSRApp(() =>
    h(IjTooltipProvider, () =>
      h(IjMenu, () =>
        h(IjMenuTrigger, { asChild: true }, () =>
          h(IjTooltip, { content: "Page settings & actions" }, () => h(IjButton, () => "···")),
        ),
      ),
    ),
  );
  const html = (await renderToString(app)).replace(/<!--.*?-->/g, "");
  // IjTooltip forwards attrs to its trigger, so the menu's ARIA reaches the button.
  const button = html.match(/<button[^>]*>/)?.[0] ?? "";
  expect(button).toContain('aria-haspopup="menu"');
  expect(button).toContain('class="ij-button');
  expect(html.match(/<button/g)).toHaveLength(1);
});
