import { onBeforeUnmount, onMounted, toValue, type MaybeRefOrGetter } from "vue";

/**
 * Shortcut strings are "+"-joined, modifiers first, key last:
 * "Mod+D", "Mod+Shift+P", "Mod+Alt+L". `Mod` is ⌘ on Apple platforms and
 * Ctrl elsewhere, so one string works for both.
 */

export const isApple =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

interface Combo {
  meta: boolean;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  key: string;
}

function parse(shortcut: string, apple: boolean): Combo {
  const parts = shortcut.toLowerCase().split("+");
  const key = parts.pop() ?? "";
  const has = (...names: string[]) => parts.some((p) => names.includes(p));
  return {
    meta: has("meta", "cmd") || (apple && has("mod")),
    ctrl: has("ctrl") || (!apple && has("mod")),
    alt: has("alt", "option"),
    shift: has("shift"),
    key,
  };
}

type KeyEventLike = Pick<
  KeyboardEvent,
  "key" | "code" | "metaKey" | "ctrlKey" | "altKey" | "shiftKey"
>;

export function matchShortcut(event: KeyEventLike, shortcut: string, apple = isApple): boolean {
  const c = parse(shortcut, apple);
  if (
    event.metaKey !== c.meta ||
    event.ctrlKey !== c.ctrl ||
    event.altKey !== c.alt ||
    event.shiftKey !== c.shift
  )
    return false;
  // Letters/digits compare by physical key: with ⌥ held, macOS turns
  // event.key for "L" into "¬", so event.key alone would never match.
  if (/^[a-z]$/.test(c.key)) return event.code === `Key${c.key.toUpperCase()}`;
  if (/^[0-9]$/.test(c.key)) return event.code === `Digit${c.key}`;
  return event.key.toLowerCase() === c.key;
}

const appleSymbols: Record<string, string> = {
  mod: "⌘",
  meta: "⌘",
  cmd: "⌘",
  ctrl: "⌃",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
};

const otherNames: Record<string, string> = {
  mod: "Ctrl",
  ctrl: "Ctrl",
  meta: "Win",
  cmd: "Win",
  alt: "Alt",
  option: "Alt",
  shift: "Shift",
};

/** "Mod+Shift+P" -> "⌘⇧P" on Apple platforms, "Ctrl+Shift+P" elsewhere. */
export function formatShortcut(shortcut: string, apple = isApple): string {
  const parts = shortcut.split("+");
  const key = parts.pop() ?? "";
  const keyLabel = key.length === 1 ? key.toUpperCase() : key;
  const mods = parts.map((p) => (apple ? appleSymbols : otherNames)[p.toLowerCase()] ?? p);
  return apple ? mods.join("") + keyLabel : [...mods, keyLabel].join("+");
}

/**
 * Runs `handler` while the calling component is mounted. A match calls
 * preventDefault, so browser defaults such as ⌘D (bookmark) don't fire.
 *
 * `capture: true` listens on document in the capture phase and stops
 * propagation; menu items use it so an open menu wins over the same
 * shortcut registered app-wide (window, bubble phase, the default).
 */
export function useShortcut(
  shortcut: MaybeRefOrGetter<string | undefined>,
  handler: (event: KeyboardEvent) => void,
  options: { capture?: boolean } = {},
) {
  const onKeydown = (event: KeyboardEvent) => {
    const s = toValue(shortcut);
    if (!s || event.repeat || !matchShortcut(event, s)) return;
    event.preventDefault();
    if (options.capture) event.stopPropagation();
    handler(event);
  };
  const target = () => (options.capture ? document : window);
  onMounted(() =>
    target().addEventListener("keydown", onKeydown as EventListener, options.capture),
  );
  onBeforeUnmount(() =>
    target().removeEventListener("keydown", onKeydown as EventListener, options.capture),
  );
}
