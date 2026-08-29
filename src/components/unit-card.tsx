import Link from "next/link";
import type { Unit } from "@/content/units/schema";
import { getForce } from "@/content/forces";

const TYPE_LABEL: Record<Unit["type"], string> = {
  corps: "Corps",
  regiment: "Regiment",
  command: "Command",
};

/**
 * Units have no photographs, so the card leans on typography and a single
 * tone-coloured edge in the parent service's colour — enough to tell an Army
 * corps from an Air Force command at a glance in a mixed grid.
 */
export function UnitCard({ unit }: { unit: Unit }) {
  const tone = getForce(unit.force)?.tone ?? "var(--accent)";

  return (
    <Link
      href={`/forces/${unit.force}/${unit.slug}`}
      style={{ "--tone": tone } as React.CSSProperties}
      className="group relative flex flex-col gap-2.5 overflow-hidden rounded-lg border border-rule bg-surface p-5 pl-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--tone)] hover:shadow-[var(--shadow-lift)]"
    >
      <span
        aria-hidden
        className="tone-bg absolute inset-y-0 left-0 w-[3px] opacity-70 transition-opacity group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[16.5px] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-[var(--tone)]">
          {unit.name}
        </h3>
        <span className="whitespace-nowrap rounded-[3px] bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2">
          {TYPE_LABEL[unit.type]}
        </span>
      </div>

      <p className="text-[13.5px] leading-relaxed text-ink-2">{unit.summary}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 font-mono text-[11px] text-ink-3">
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
