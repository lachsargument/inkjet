import { expect, test } from "vite-plus/test";
import { formatShortcut, matchShortcut } from "../src/index.ts";

const key = (code: string, key: string, mods: Partial<Record<string, boolean>> = {}) => ({
  code,
  key,
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  ...mods,
});

test("Mod maps to ⌘ on Apple and Ctrl elsewhere", () => {
  expect(matchShortcut(key("KeyD", "d", { metaKey: true }), "Mod+D", true)).toBe(true);
  expect(matchShortcut(key("KeyD", "d", { ctrlKey: true }), "Mod+D", true)).toBe(false);
  expect(matchShortcut(key("KeyD", "d", { ctrlKey: true }), "Mod+D", false)).toBe(true);
});

test("modifiers must match exactly", () => {
  expect(matchShortcut(key("KeyD", "D", { metaKey: true, shiftKey: true }), "Mod+D", true)).toBe(
    false,
  );
  expect(matchShortcut(key("KeyD", "d"), "Mod+D", true)).toBe(false);
});

test("letters match by physical key, so ⌥ combos work on macOS", () => {
  // ⌥L produces "¬" as event.key on a US layout.
  expect(matchShortcut(key("KeyL", "¬", { metaKey: true, altKey: true }), "Mod+Alt+L", true)).toBe(
    true,
  );
});

test("non-letter keys match by event.key", () => {
  expect(matchShortcut(key("Backslash", "\\", { metaKey: true }), "Mod+\\", true)).toBe(true);
  expect(matchShortcut(key("Enter", "Enter", { metaKey: true }), "Mod+Enter", true)).toBe(true);
});

test("formatting follows the platform", () => {
  expect(formatShortcut("Mod+Shift+P", true)).toBe("⌘⇧P");
  expect(formatShortcut("Mod+Alt+L", true)).toBe("⌘⌥L");
  expect(formatShortcut("Mod+Shift+P", false)).toBe("Ctrl+Shift+P");
});
