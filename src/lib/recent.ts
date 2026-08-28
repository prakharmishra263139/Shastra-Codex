/**
 * Recently viewed entries. Browser storage only — the roadmap rules out accounts
 * for v1, and a reading history is not worth a backend.
 *
 * Exposed as a tiny external store rather than component state: `localStorage`
 * cannot be read on the server, and `useSyncExternalStore` is the one way to
 * read it without either a hydration mismatch or a render-triggering effect.
 */

const KEY = "shastra:recent";
const LIMIT = 10;

export interface RecentEntry {
  slug: string;
  name: string;
  href: string;
}

/** Stable identity matters: a snapshot that differs every call loops forever. */
const EMPTY: RecentEntry[] = [];

let snapshot: RecentEntry[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isRecent(value: unknown): value is RecentEntry {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.slug === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.href === "string"
  );
}

function read(): RecentEntry[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(parsed)) return EMPTY;
    const valid = parsed.filter(isRecent).slice(0, LIMIT);
    return valid.length > 0 ? valid : EMPTY;
  } catch {
    // Corrupt or unavailable storage is not worth breaking a page over.
    return EMPTY;
  }
}

export function subscribeRecent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function recentSnapshot(): RecentEntry[] {
  if (!loaded) {
    snapshot = read();
    loaded = true;
  }
  return snapshot;
}

/** The server has no storage, so it renders the strip as absent. */
export function recentServerSnapshot(): RecentEntry[] {
  return EMPTY;
}

/** Most recent first, deduplicated by slug, capped. */
export function recordRecent(entry: RecentEntry): void {
  const next = [entry, ...recentSnapshot().filter((e) => e.slug !== entry.slug)].slice(0, LIMIT);
  snapshot = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode and full quotas both land here. Silently skip.
  }
  for (const listener of listeners) listener();
}
