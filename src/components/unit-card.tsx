import Link from "next/link";
import type { Unit } from "@/content/units/schema";

const TYPE_LABEL: Record<Unit["type"], string> = {
  corps: "Corps",
  regiment: "Regiment",
  command: "Command",
};

/**
 * Units have no photographs, so the card leans on typography and its parent
 * service's colour — a spine down the left edge and a wash behind the text.
 * That is enough to tell an Army corps from an Air Force command at a glance in
 * a mixed grid, which is the only job this card has that the type alone cannot
 * do.
 */
export function UnitCard({ unit }: { unit: Unit }) {
  return (
    <Link
      href={`/forces/${unit.force}/${unit.slug}`}
      data-force={unit.force}
      className="group relative flex flex-col gap-2.5 overflow-hidden rounded-lg border border-rule bg-surface p-5 pl-6 shadow-[var(--shadow-card)] transition-[translate,border-color,box-shadow] duration-300 ease-soft hover:-translate-y-1 hover:border-tone hover:shadow-[var(--shadow-lift)]"
    >
      <span aria-hidden className="tone-field absolute inset-0" />
      <span
        aria-hidden
        className="tone-bg absolute inset-y-0 left-0 w-[3px] opacity-70 transition-opacity duration-300 ease-soft group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <h3 className="font-display text-[16.5px] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200 ease-soft group-hover:text-tone">
          {unit.name}
        </h3>
        <span className="whitespace-nowrap rounded-[3px] bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2">
          {TYPE_LABEL[unit.type]}
        </span>
      </div>

      <p className="relative text-[13.5px] leading-relaxed text-ink-2">{unit.summary}</p>

      <div className="relative mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 font-mono text-[11px] text-ink-3">
        {unit.hq && <span className="truncate">{unit.hq}</span>}
        {unit.hq && unit.raised && (
          <span aria-hidden className="text-rule">
            ·
          </span>
        )}
        {unit.raised && <span className="tabular">Raised {unit.raised}</span>}
      </div>
    </Link>
  );
}
