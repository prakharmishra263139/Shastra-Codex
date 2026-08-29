import Link from "next/link";
import type { Unit } from "@/content/units/schema";

const TYPE_LABEL: Record<Unit["type"], string> = {
  corps: "Corps",
  regiment: "Regiment",
  command: "Command",
};

export function UnitCard({ unit }: { unit: Unit }) {
  return (
    <Link
      href={`/forces/${unit.force}/${unit.slug}`}
      className="group flex flex-col gap-2.5 rounded-md border border-rule bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold text-[16px] leading-tight tracking-tight group-hover:text-accent transition-colors">
          {unit.name}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-[3px] whitespace-nowrap bg-surface-2 text-ink-2">
          {TYPE_LABEL[unit.type]}
        </span>
      </div>

      <p className="text-[13.5px] leading-relaxed text-ink-2">{unit.summary}</p>

      <div className="mt-auto pt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-ink-3">
        {unit.hq && <span>{unit.hq}</span>}
        {unit.raised && <span className="tabular">Raised {unit.raised}</span>}
      </div>
    </Link>
  );
}
