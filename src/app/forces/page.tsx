import Link from "next/link";
import type { Metadata } from "next";
import { FORCES, allUnits, forceCounts } from "@/content/units";
import { allEntries } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Browse by force",
  description: "Army, Air Force and Navy — the arms, corps and commands of each service.",
};

export default function ForcesPage() {
  const unitCounts = forceCounts();

  const equipmentCounts: Record<string, number> = {};
  for (const e of allEntries) {
    for (const service of e.operators) {
      equipmentCounts[service] = (equipmentCounts[service] ?? 0) + 1;
    }
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Forces" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.025em]">
          Browse by force
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
          {allUnits.length} arms, corps and commands across the three services — plus
          every piece of equipment each one operates.
        </p>
      </header>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {FORCES.map((force) => (
          <Link
            key={force.slug}
            href={`/forces/${force.slug}`}
            className="group flex flex-col gap-3 rounded-md border border-rule bg-surface p-6 transition-colors hover:border-accent"
          >
            <h2 className="font-display font-bold text-xl tracking-tight group-hover:text-accent transition-colors">
              {force.name}
            </h2>
            <p className="text-[13.5px] leading-relaxed text-ink-2">{force.blurb}</p>
            <div className="mt-auto pt-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">
              <span className="tabular">
                {unitCounts[force.slug] ?? 0} {force.unitLabel.toLowerCase()}
              </span>
              <span className="tabular">
                {equipmentCounts[force.slug] ?? 0} equipment
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
