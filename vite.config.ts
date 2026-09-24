import { defineConfig } from "vite-plus";
import VueRolldown from "unplugin-vue/rolldown";
import VueVite from "unplugin-vue/vite";

export default defineConfig({
  // Used by `vp dev` (playground) and `vp test`; `vp pack` has its own
  // plugin list because tsdown takes Rolldown plugins, not Vite ones.
  plugins: [VueVite()],
  // Vite ignores $PORT on its own; honoring it lets preview tooling pick
  // a free port when 5173 is taken by another dev server.
  server: { port: Number(process.env.PORT) || 5173 },
  pack: {
    entry: ["src/index.ts"],
    platform: "neutral",
    plugins: [VueRolldown({ isProduction: true })],
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    // tsgo cannot read .vue files, so declarations go through vue-tsc.
    dts: { vue: true },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: [".claude/**"],
  },
});
