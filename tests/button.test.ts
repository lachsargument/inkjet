import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { IjButton } from "../src/index.ts";

test("renders variant classes and forwards disabled", async () => {
  const app = createSSRApp(() => h(IjButton, { variant: "primary", disabled: true }, () => "Save"));
  const html = await renderToString(app);
  expect(html).toContain("ij-button--primary");
  expect(html).toContain("disabled");
  expect(html).toContain("Save");
});

test("asChild renders the slotted element instead of a button", async () => {
  const app = createSSRApp(() =>
    h(IjButton, { asChild: true }, () => h("a", { href: "/x" }, "Go")),
  );
  const html = await renderToString(app);
  expect(html).toMatch(/^<a[^>]*class="ij-button/);
});
