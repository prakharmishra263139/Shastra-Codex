"use client";

import type { Facet, FacetKey, Filters } from "@/lib/browse";

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
    <fieldset className="border-t border-rule pt-3">
      <legend className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        {facet.label}
      </legend>
      <ul className="mt-2 space-y-1">
        {facet.options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <li key={option.value}>
              <label
                className={`flex cursor-pointer items-baseline justify-between gap-2 text-[13px] transition-colors ${
                  checked ? "text-accent" : "text-ink-2 hover:text-ink"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(facet.key, option.value)}
                    className="accent-[var(--accent)]"
                  />
                  <span>{option.label}</span>
                </span>
                <span className="font-mono text-[11px] tabular text-ink-3">{option.count}</span>
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
    <div className="space-y-4">
      {facets.map((facet) => (
        <FacetGroup
          key={facet.key}
          facet={facet}
          selected={filters[facet.key] ?? []}
          onToggle={onToggle}
        />
      ))}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 hover:text-accent"
        >
          Clear all
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Below `lg` the panel folds away rather than pushing the grid off-screen. */}
      <details className="lg:hidden rounded-md border border-rule bg-surface p-4">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
          Filters{activeCount > 0 && ` · ${activeCount}`}
        </summary>
        <div className="mt-4">{body}</div>
      </details>

      <div className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-20">
          <p className="pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            Filters
          </p>
          {body}
        </div>
      </div>
    </>
  );
}
