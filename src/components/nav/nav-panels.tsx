"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavCategory } from "@/content";
import { FORCES } from "@/content/forces";

/**
 * The two panels that replaced the sidebar rail: a desktop mega-menu holding
 * the equipment taxonomy, and a mobile sheet holding all of navigation.
 *
 * Both render the same category data. Neither is mounted until it is opened,
 * so the taxonomy only crosses into the browser when somebody asks for it.
 */

function CategoryLink({
  category,
  activeCategory,
  onNavigate,
}: {
  category: NavCategory;
  activeCategory?: string;
  onNavigate: () => void;
}) {
  const empty = category.count === 0;
  const active = category.slug === activeCategory;

  return (
    <Link
      href={`/${category.slug}`}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`group flex items-baseline justify-between gap-3 rounded-[4px] px-3 py-2 transition-colors duration-200 ease-soft ${
        active ? "bg-accent-dim text-accent" : "hover:bg-surface-2"
      }`}
    >
      <span className="min-w-0">
        <span
          className={`block truncate text-[13.5px] font-medium transition-colors ${
            active ? "text-accent" : empty ? "text-ink-3" : "text-ink group-hover:text-accent"
          }`}
        >
          {category.name}
        </span>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
          {category.classes.length} classes
        </span>
      </span>
      <span className="shrink-0 font-mono text-[11px] tabular text-ink-3">
        {category.count}
      </span>
    </Link>
  );
}

/** Desktop dropdown under "Equipment". Closes on Escape or a click outside. */
export function EquipmentMenu({
  tree,
  activeCategory,
  onClose,
}: {
  tree: NavCategory[];
  activeCategory?: string;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      // The trigger button handles its own toggle; ignore clicks inside it.
      if (panel.current?.parentElement?.contains(target)) return;
      onClose();
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [onClose]);

  const total = tree.reduce((n, category) => n + category.count, 0);

  return (
    <div
      ref={panel}
      className="anim-drop absolute left-0 top-full z-50 mt-2 w-[min(46rem,calc(100vw-3rem))] overflow-hidden rounded-lg border border-rule bg-ground shadow-[var(--shadow-lift)]"
    >
      <div className="grid gap-1 p-3 sm:grid-cols-3">
        {tree.map((category) => (
          <CategoryLink
            key={category.slug}
            category={category}
            activeCategory={activeCategory}
            onNavigate={onClose}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-rule bg-surface px-5 py-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3 tabular">
          {total} {total === 1 ? "entry" : "entries"} · {tree.length} categories
        </span>
        <Link
          href="/browse"
          onClick={onClose}
          className="group font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent"
        >
          Browse everything
          <span
            aria-hidden
            className="ml-2 inline-block transition-transform duration-200 ease-soft group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

/** Full-height sheet for phones. Everything the desktop header holds, stacked. */
export function MobileNav({
  tree,
  onClose,
}: {
  tree: NavCategory[];
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="anim-fade fixed inset-0 z-50 bg-black/70 lg:hidden"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="anim-sheet ml-auto flex h-full w-[min(21rem,88%)] flex-col border-l border-rule bg-ground"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Navigate
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-1.5 rounded-[4px] p-1.5 text-ink-2 transition-colors hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav aria-label="Site" className="flex-1 overflow-y-auto px-3 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="block rounded-[4px] px-3 py-2 font-display text-[16px] font-semibold tracking-tight hover:bg-surface-2"
          >
            Home
          </Link>

          <p className="mt-6 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
            The services
          </p>
          <ul className="mt-1.5">
            {FORCES.map((force) => (
              <li key={force.slug}>
                <Link
                  href={`/forces/${force.slug}`}
                  onClick={onClose}
                  data-force={force.slug}
                  className="group flex items-center gap-3 rounded-[4px] px-3 py-2 transition-colors duration-200 ease-soft hover:bg-surface-2"
                >
                  <span aria-hidden className="tone-bg h-4 w-[3px] rounded-full" />
                  <span className="font-display text-[15px] font-semibold tracking-tight transition-colors duration-200 ease-soft group-hover:text-tone">
                    {force.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
            Equipment
          </p>
          <ul className="mt-1.5">
            {tree.map((category) => (
              <li key={category.slug}>
                <CategoryLink category={category} onNavigate={onClose} />
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-rule pt-4">
            <Link
              href="/browse"
              onClick={onClose}
              className="block rounded-[4px] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:bg-surface-2"
            >
              Browse everything →
            </Link>
            <Link
              href="/forces"
              onClick={onClose}
              className="block rounded-[4px] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:bg-surface-2"
            >
              All arms &amp; commands →
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
