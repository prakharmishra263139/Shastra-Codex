/**
 * The search shortcut label. The server cannot know which platform is asking,
 * so it renders the Windows/Linux form and the browser corrects it on hydration
 * through `useSyncExternalStore` — the label never changes after that, hence
 * the no-op subscription.
 */

const CTRL = "Ctrl K";
const CMD = "⌘ K";

export function subscribeShortcut(): () => void {
  return () => {};
}

export function shortcutSnapshot(): string {
  return /Mac|iPhone|iPad/.test(navigator.userAgent) ? CMD : CTRL;
}

export function shortcutServerSnapshot(): string {
  return CTRL;
}
