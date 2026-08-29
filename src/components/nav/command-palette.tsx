"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import type { BrowseItem } from "@/lib/browse";
import { useRecent } from "@/components/nav/recently-viewed";

/**
 * Ctrl-K search. MiniSearch runs in the browser over the same `BrowseItem[]`
 * the page already ships, so there is no index artefact to keep in sync. The
 * component is mounted only while the palette is open, which is also when the
 * index gets built — a reader who never searches never pays for it.
 */
function buildIndex(items: BrowseItem[]): MiniSearch<BrowseItem> {
  const index = new MiniSearch<BrowseItem>({
    idField: "slug",
    fields: ["name", "aliasText", "summary", "tagText", "categoryName", "className"],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      // A name match beats a passing mention in a summary.
      boost: { name: 4, aliasText: 3, className: 1.5 },
    },
    extractField: (item, field) => {
      if (field === "aliasText") return item.aliases.join(" ");
      if (field === "tagText") return item.tags.join(" ");
      return String(item[field as keyof BrowseItem] ?? "");
    },
  });
  index.addAll(items);
  return index;
}

const MAX_RESULTS = 12;

export function CommandPalette({
  items,
  onClose,
}: {
  items: BrowseItem[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const index = useMemo(() => buildIndex(items), [items]);
  const bySlug = useMemo(() => new Map(items.map((i) => [i.slug, i])), [items]);

  const recent = useRecent();
  const suggestions = useMemo(() => {
    const viewed = recent
      .map((r) => bySlug.get(r.slug))
      .filter((i): i is BrowseItem => Boolean(i));
    return viewed.length > 0 ? viewed : items.slice(0, MAX_RESULTS);
  }, [recent, bySlug, items]);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return suggestions;
    return index
      .search(trimmed)
      .slice(0, MAX_RESULTS)
      .map((hit) => bySlug.get(String(hit.id)))
      .filter((i): i is BrowseItem => Boolean(i));
  }, [trimmed, suggestions, index, bySlug]);

  const go = (item: BrowseItem | undefined) => {
    if (!item) return;
    onClose();
    router.push(item.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (results.length === 0 ? 0 : (i + 1) % results.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (results.length === 0 ? 0 : (i - 1 + results.length) % results.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the codex"
        className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-rule bg-surface shadow-[var(--shadow-lift)]"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Find
          </span>
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Name, alias or class — try “brah” or “PJ-10”"
            aria-label="Search equipment"
            className="flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-ink-3"
          />
          <kbd className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Esc</kbd>
        </div>

        {results.length === 0 ? (
          <p className="px-4 py-6 text-[14px] text-ink-2">Nothing matches “{trimmed}”.</p>
        ) : (
          <ul className="max-h-[52vh] overflow-y-auto py-1.5">
            {!trimmed && recent.length > 0 && (
              <li className="px-4 pb-1.5 pt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                Recently viewed
              </li>
            )}
            {results.map((item, i) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item)}
                  className={`flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left transition-colors ${
                    i === active ? "bg-surface-2" : ""
                  }`}
                >
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-[14.5px] ${i === active ? "text-accent" : ""}`}
                    >
                      {item.name}
                    </span>
                    <span className="block truncate text-[12.5px] text-ink-3">
                      {item.summary}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                    {item.className}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4 border-t border-rule px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
          <span>↑ ↓ move</span>
          <span>↵ open</span>
          <span className="ml-auto tabular">{results.length} shown</span>
        </div>
      </div>
    </div>
  );
}
