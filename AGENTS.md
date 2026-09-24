# inkjet

A Vue 3 component library. Behavior (focus, keyboard, ARIA,
positioning) comes from Reka UI primitives; all styling is our own and
driven by the CSS variables in `src/tokens.css`, which are sampled from
app.notion.com (light + dark).

## Commands

- `vp install` — install dependencies (pnpm under the hood)
- `vp dev` — playground at http://localhost:5173 (`index.html` → `playground/`)
- `vp check` — format (oxfmt) + lint + type check; `vp check --fix` to auto-format
- `vp test` — run tests in `tests/`
- `vp pack` — build the library to `dist/` (`index.js`, `index.d.ts`, `style.css`)

If `vp` is not installed globally, prefix with `pnpm exec`.

## Conventions

- Components live in `src/components/Ij*.vue` and are exported from `src/index.ts`.
- Use only `--ij-*` tokens for colors, radii, and font sizes.
- Declare props inline in SFCs: the Vue compiler cannot resolve interfaces
  that extend types from node_modules (e.g. reka-ui's `PrimitiveProps`).
- TypeScript must stay on 6.x: `vp pack` dts generation for Vue rejects TS 7.
- Consumers must import `inkjet/style.css` themselves; the JS bundle does not import CSS.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
