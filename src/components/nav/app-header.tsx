"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { NavCategory } from "@/content";
import type { BrowseItem } from "@/lib/browse";
import {
  shortcutServerSnapshot,
  shortcutSnapshot,
  subscribeShortcut,
} from "@/lib/shortcut";
import { CommandPalette } from "@/components/nav/command-palette";
import { NavTree } from "@/components/nav/sidebar-nav";

/**
 * The header owns every piece of global navigation state: the command palette,
 * the mobile navigation sheet, and the keyboard shortcuts that open them.
 */
export function AppHeader({
  tree,
  items,
}: {
  tree: NavCategory[];
  items: BrowseItem[];
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const searchButton = useRef<HTMLButtonElement>(null);
  const shortcut = useSyncExternalStore(
    subscribeShortcut,
    shortcutSnapshot,
    shortcutServerSnapshot,
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const typing =
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === "Escape") {
        setSheetOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    searchButton.current?.focus();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule bg-ground/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setSheetOpen((open) => !open)}
            aria-expanded={sheetOpen}
            aria-label="Categories"
            className="lg:hidden -ml-1 rounded-[3px] p-1.5 text-ink-2 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-[2px] bg-accent" aria-hidden />
            <span className="font-display text-[15px] font-bold tracking-tight">
              Shastra Codex
            </span>
          </Link>

          <button
            ref={searchButton}
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="ml-auto flex w-full max-w-xs items-center gap-2 rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-left text-[13px] text-ink-3 transition-colors hover:border-accent"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden fill="none">
              <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.2 9.2 12.5 12.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="flex-1 truncate">Search equipment</span>
            <kbd className="font-mono text-[10px] uppercase tracking-[0.1em]">{shortcut}</kbd>
          </button>
        </div>
      </header>

      {sheetOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-black/55 lg:hidden"
          onClick={() => setSheetOpen(false)}
          role="presentation"
        >
          <div
            className="h-full w-72 max-w-[85%] overflow-y-auto border-r border-rule bg-ground"
            onClick={(event) => event.stopPropagation()}
          >
            <NavTree tree={tree} onNavigate={() => setSheetOpen(false)} />
          </div>
        </div>
      )}

      {/* Mounted only while open, so the search index is built on demand. */}
      {paletteOpen && <CommandPalette items={items} onClose={closePalette} />}
    </>
  );
}
