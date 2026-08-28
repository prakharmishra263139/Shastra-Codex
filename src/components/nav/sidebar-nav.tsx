"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavCategory } from "@/content";

/**
 * Category tree, collapsed to the branch you are standing in. Two levels only —
 * a third would turn navigation into a filing cabinet.
 */
export function NavTree({
  tree,
  onNavigate,
}: {
  tree: NavCategory[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [, activeCategory, activeClass] = pathname.split("/");

  return (
    <nav aria-label="Categories" className="py-6">
      <ul className="space-y-0.5">
        {tree.map((category) => {
          const open = category.slug === activeCategory;

          return (
            <li key={category.slug}>
              <Link
                href={`/${category.slug}`}
                onClick={onNavigate}
                aria-current={open && !activeClass ? "page" : undefined}
                className={`flex items-baseline justify-between gap-2 rounded-[3px] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  open ? "text-accent" : "text-ink-2 hover:text-ink"
                }`}
              >
                <span>{category.name}</span>
                <span className="tabular text-ink-3">{category.count}</span>
              </Link>

              {open && (
                <ul className="mt-0.5 mb-2 ml-3 border-l border-rule">
                  {category.classes.map((klass) => {
                    const current = klass.slug === activeClass;

                    return (
                      <li key={klass.slug}>
                        <Link
                          href={`/${category.slug}/${klass.slug}`}
                          onClick={onNavigate}
                          aria-current={current ? "page" : undefined}
                          className={`-ml-px flex items-baseline justify-between gap-2 border-l pl-3 pr-3 py-1.5 text-[13px] transition-colors ${
                            current
                              ? "border-accent text-accent"
                              : klass.count === 0
                                ? "border-transparent text-ink-3 hover:text-ink-2"
                                : "border-transparent text-ink-2 hover:text-ink hover:border-rule"
                          }`}
                        >
                          <span>{klass.name}</span>
                          <span className="font-mono text-[11px] tabular text-ink-3">
                            {klass.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** The persistent rail. Hidden below `lg`, where the sheet takes over. */
export function SidebarNav({ tree }: { tree: NavCategory[] }) {
  return (
    <aside className="hidden lg:block w-60 shrink-0 border-r border-rule">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
        <NavTree tree={tree} />
      </div>
    </aside>
  );
}
