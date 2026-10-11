import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { IjButton, IjPopover, IjPopoverTrigger } from "../src/index.ts";

test("open popover trigger exposes dialog ARIA on the slotted button", async () => {
  const app = createSSRApp(() =>
    h(IjPopover, { defaultOpen: true }, () =>
      h(IjPopoverTrigger, { asChild: true }, () => h(IjButton, () => "Share")),
    ),
  );
  const html = (await renderToString(app)).replace(/<!--.*?-->/g, "");
  const button = html.match(/<button[^>]*>/)?.[0] ?? "";
  expect(button).toContain('aria-haspopup="dialog"');
  // IjButton's "open" styling keys off this.
  expect(button).toContain('aria-expanded="true"');
});
