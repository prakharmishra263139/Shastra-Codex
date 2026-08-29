"use client";

import type { Facet, FacetKey, Filters } from "@/lib/browse";

/**
 * The filter rail. With the site's navigation sidebar gone, this is the only
 * rail left on the site — so it is allowed to look like a panel rather than a
 * bare column of checkboxes.
 */
function FacetGroup({
  facet,
  selected,
  onToggle,
}: {
  facet: Facet;
  selected: string[];
  onToggle: (key: FacetKey, value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
        {facet.label}
      </legend>
      <ul className="mt-2.5 space-y-0.5">
        {facet.options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <li key={option.value}>
              <label
                className={`flex cursor-pointer items-baseline justify-between gap-2 rounded-[4px] px-2 py-1.5 text-[13px] transition-colors ${
                  checked
                    ? "bg-accent-dim text-accent"
                    : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(facet.key, option.value)}
                    className="accent-[var(--accent)]"
                  />
                  <span className="truncate">{option.label}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular text-ink-3">
                  {option.count}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function FilterPanel({
  facets,
  filters,
  onToggle,
  onClear,
  activeCount,
}: {
  facets: Facet[];
  filters: Filters;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  activeCount: number;
}) {
  if (facets.length === 0) return null;

  const body = (
    <div className="divide-y divide-rule">
      {facets.map((facet) => (
        <div key={facet.key} className="px-4 py-4 first:pt-4">
          <FacetGroup
            facet={facet}
            selected={filters[facet.key] ?? []}
            onToggle={onToggle}
          />
        </div>
      ))}

      {activeCount > 0 && (
        <div className="px-4 py-3">
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 transition-colors hover:text-accent"
          >
            Clear all {activeCount} filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Below `lg` the panel folds away rather than pushing the grid off-screen. */}
      <details className="overflow-hidden rounded-lg border border-rule bg-surface lg:hidden">
        <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
          Filters{activeCount > 0 && ` · ${activeCount}`}
        </summary>
        <div className="border-t border-rule">{body}</div>
      </details>

      <div className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 overflow-hidden rounded-lg border border-rule bg-surface">
          <p className="border-b border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Filter
          </p>
          {body}
        </div>
      </div>
    </>
  );
}
