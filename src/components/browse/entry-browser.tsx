"use client";

import { Suspense, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_SORT,
  FACET_KEYS,
  PAGE_SIZE,
  SORTS,
  applyFilters,
  facetsFor,
  isSort,
  paginate,
  sortItems,
  type BrowseItem,
  type FacetKey,
  type Filters,
} from "@/lib/browse";
import { EntryCard } from "@/components/entry-card";
import { FilterPanel } from "@/components/browse/filter-panel";

/**
 * The one browse surface, shared by the category and class routes.
 *
 * Filters, sort and page live in the query string, so a filtered view is a
 * shareable link and the back button does what a reader expects. The data
 * itself arrives prerendered from the server — nothing is fetched.
 */
function Browser({ items, facetKeys }: { items: BrowseItem[]; facetKeys: readonly FacetKey[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const filters: Filters = useMemo(() => {
    const parsed: Filters = {};
    for (const key of facetKeys) {
      const raw = params.get(key);
      if (raw) parsed[key] = raw.split(",").filter(Boolean);
    }
    return parsed;
  }, [params, facetKeys]);

  const sortParam = params.get("sort");
  const sort = isSort(sortParam) ? sortParam : DEFAULT_SORT;
  const page = Number(params.get("page")) || 1;

  const facets = useMemo(() => facetsFor(items, facetKeys), [items, facetKeys]);
  const filtered = useMemo(() => applyFilters(items, filters), [items, filters]);
  const sorted = useMemo(() => sortItems(filtered, sort), [filtered, sort]);
  const { items: pageItems, page: current, pageCount } = paginate(sorted, page);

  const activeCount = Object.values(filters).reduce((n, values) => n + values.length, 0);

  /** Every control funnels through here, so the URL is the only state there is. */
  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mutate(next);
      next.delete("page"); // any change to the result set invalidates the page number
      const query = next.toString();
      // push, not replace: a filter change is a place the reader can go back from
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const toggle = useCallback(
    (key: FacetKey, value: string) =>
      update((next) => {
        const selected = new Set((next.get(key) ?? "").split(",").filter(Boolean));
        if (selected.has(value)) selected.delete(value);
        else selected.add(value);
        if (selected.size === 0) next.delete(key);
        else next.set(key, [...selected].join(","));
      }),
    [update],
  );

  const clear = useCallback(
    () => update((next) => FACET_KEYS.forEach((key) => next.delete(key))),
    [update],
  );

  const pageHref = (target: number) => {
    const next = new URLSearchParams(params.toString());
    if (target <= 1) next.delete("page");
    else next.set("page", String(target));
    const query = next.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
      <FilterPanel
        facets={facets}
        filters={filters}
        onToggle={toggle}
        onClear={clear}
        activeCount={activeCount}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] tabular text-ink-3">
            {filtered.length === items.length
              ? `${items.length} ${items.length === 1 ? "entry" : "entries"}`
              : `${filtered.length} of ${items.length}`}
            {pageCount > 1 && ` · page ${current} of ${pageCount}`}
          </p>

          <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            Sort
            <select
              value={sort}
              onChange={(event) => update((next) => next.set("sort", event.target.value))}
              className="rounded-[4px] border border-rule bg-surface px-2.5 py-1.5 text-[12.5px] normal-case tracking-normal text-ink transition-colors duration-200 ease-soft hover:border-accent"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {pageItems.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pageItems.map((item) => (
              <EntryCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-rule p-12 text-center">
            <p className="font-display text-[17px] font-semibold">No entry matches</p>
            <p className="mt-2 text-[14px] text-ink-2">
              {activeCount} {activeCount === 1 ? "filter is" : "filters are"} narrowing this list
              to nothing.
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-5 rounded-[4px] border border-rule px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors duration-200 ease-soft hover:border-accent"
            >
              Clear filters
            </button>
          </div>
        )}

        {pageCount > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-1.5 border-t border-rule pt-6 font-mono text-[11px]"
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((target) => (
              <Link
                key={target}
                href={pageHref(target)}
                scroll={false}
                aria-current={target === current ? "page" : undefined}
                className={`min-w-8 rounded-[4px] border px-2.5 py-1.5 text-center tabular transition-colors duration-200 ease-soft ${
                  target === current
                    ? "border-accent bg-accent-dim text-accent"
                    : "border-transparent text-ink-3 hover:border-rule hover:text-accent"
                }`}
              >
                {target}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export function EntryBrowser({
  items,
  facetKeys = FACET_KEYS,
}: {
  items: BrowseItem[];
  /** Class is fixed on a class route, so that facet is dropped there. */
  facetKeys?: readonly FacetKey[];
}) {
  return (
    // useSearchParams opts a component out of prerendering; the boundary keeps
    // the rest of the page static.
    <Suspense
      fallback={
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.slice(0, PAGE_SIZE).map((item) => (
            // The fallback duplicates cards the resolved browser also renders,
            // so it must not claim their view transition names.
            <EntryCard key={item.slug} item={item} morph={false} />
          ))}
        </div>
      }
    >
      <Browser items={items} facetKeys={facetKeys} />
    </Suspense>
  );
}
