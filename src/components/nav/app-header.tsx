"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { NavCategory } from "@/content";
import { FORCES } from "@/content/forces";
import type { BrowseItem } from "@/lib/browse";
import {
  shortcutServerSnapshot,
  shortcutSnapshot,
  subscribeShortcut,
} from "@/lib/shortcut";
import { CommandPalette } from "@/components/nav/command-palette";
import { EquipmentMenu, MobileNav } from "@/components/nav/nav-panels";

/**
 * The header owns every piece of global navigation state: the equipment
 * mega-menu, the command palette, the mobile sheet, and the keyboard shortcuts
 * that open them.
 *
 * It is also the only navigation on the site. The rail that used to hold the
 * taxonomy is gone, which is what lets every page below run full width.
 */
export function AppHeader({
  tree,
  items,
}: {
  tree: NavCategory[];
  items: BrowseItem[];
}) {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchButton = useRef<HTMLButtonElement>(null);
  const shortcut = useSyncExternalStore(
    subscribeShortcut,
    shortcutSnapshot,
    shortcutServerSnapshot,
  );

  const [, firstSegment, secondSegment] = pathname.split("/");
  const onForces = firstSegment === "forces";
  const onHome = pathname === "/";
  const activeForce = onForces ? secondSegment : undefined;
  const activeCategory = onForces || firstSegment === "browse" ? undefined : firstSegment;
  const equipmentActive = Boolean(activeCategory) || firstSegment === "browse";

  /* The home page opens on a full-bleed photograph; the header only takes on a
     background once the reader has scrolled off it. Everywhere else it is
     opaque from the first paint, so nothing needs to be measured. */
  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const solid = !onHome || scrolled;

  /* Any navigation closes whatever was open — including a back button, which no
     link handler sees. Adjusted during render rather than in an effect so the
     panel never paints for a frame on the page it was closed from. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSheetOpen(false);
  }

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
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    searchButton.current?.focus();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const linkClass = (active: boolean) =>
    `relative py-5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
      active ? "text-ink" : "text-ink-2 hover:text-ink"
    }`;

  const underline = (active: boolean, tone?: string) =>
    active ? (
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: tone ?? "var(--accent)" }}
      />
    ) : null;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          solid
            ? "border-b border-rule bg-ground/90 backdrop-blur-md"
            : "over-photo border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-2 px-5 sm:px-8">
          <Link href="/" className="mr-2 flex shrink-0 items-center gap-2.5">
            <span aria-hidden className="flex h-4 w-4 items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <path
                  d="M8 1.2 14 4v4.6c0 3.2-2.4 5.6-6 6.9-3.6-1.3-6-3.7-6-6.9V4l6-2.8Z"
                  stroke="var(--accent)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path d="M8 5.2v5.4M5.6 7.6h4.8" stroke="var(--accent)" strokeWidth="1.3" />
              </svg>
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-0.01em]">
              Shastra Codex
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="ml-4 hidden items-center gap-7 lg:flex"
          >
            <Link href="/" className={linkClass(onHome)}>
              Home
              {underline(onHome)}
            </Link>

            {FORCES.map((force) => {
              const active = activeForce === force.slug;
              return (
                <Link
                  key={force.slug}
                  href={`/forces/${force.slug}`}
                  className={linkClass(active)}
                >
                  {force.shortName}
                  {underline(active, force.tone)}
                </Link>
              );
            })}

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className={`${linkClass(equipmentActive)} flex items-center gap-1.5`}
              >
                Equipment
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden
                  className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 3.5 5 6.5l3-3" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {underline(equipmentActive)}
              </button>

              {menuOpen && (
                <EquipmentMenu
                  tree={tree}
                  activeCategory={activeCategory}
                  onClose={closeMenu}
                />
              )}
            </div>
          </nav>

          <button
            ref={searchButton}
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-[5px] border border-rule bg-surface/70 px-3 py-1.5 text-left text-[13px] text-ink-3 backdrop-blur transition-colors hover:border-accent hover:text-ink-2 sm:w-56 lg:w-64"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden fill="none">
              <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.2 9.2 12.5 12.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="hidden flex-1 truncate sm:block">Search equipment</span>
            <kbd className="hidden font-mono text-[10px] uppercase tracking-[0.1em] sm:block">
              {shortcut}
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            aria-label="Open navigation"
            className="-mr-1.5 rounded-[4px] p-2 text-ink-2 transition-colors hover:text-ink lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </header>

      {sheetOpen && <MobileNav tree={tree} onClose={() => setSheetOpen(false)} />}

      {/* Mounted only while open, so the search index is built on demand. */}
      {paletteOpen && <CommandPalette items={items} onClose={closePalette} />}
    </>
  );
}
