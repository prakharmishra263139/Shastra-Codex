import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FORCES, allUnits, forceCounts } from "@/content/units";
import { allEntries } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Wrap, Eyebrow } from "@/components/layout/section";

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
    <Wrap wide className="py-12 sm:py-16">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Forces" }]} />

      <header className="mt-8 max-w-[46ch] border-b border-rule pb-10">
        <Eyebrow>Order of battle</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          Browse by force
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
          {allUnits.length} arms, corps and commands across the three services — plus
          every piece of equipment each one operates.
        </p>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {FORCES.map((force, i) => (
          <Link
            key={force.slug}
            href={`/forces/${force.slug}`}
            style={{ "--tone": force.tone } as React.CSSProperties}
            className="group flex flex-col overflow-hidden rounded-xl border border-rule bg-surface shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--tone)] hover:shadow-[var(--shadow-lift)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <Image
                src={force.image.src}
                alt={force.image.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--surface)_92%,transparent),transparent_58%)]"
              />
              <span
                aria-hidden
                className="tone-bg absolute inset-x-0 bottom-0 h-[3px]"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <Eyebrow toned>{force.unitLabel}</Eyebrow>

              <h2 className="mt-4 font-display text-[22px] font-bold leading-tight tracking-[-0.025em] transition-colors group-hover:text-[var(--tone)]">
                {force.name}
              </h2>

              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
                {force.blurb}
              </p>

              <dl className="mt-auto flex gap-8 border-t border-rule pt-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {force.unitLabel}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold tabular tracking-[-0.02em]">
                    {unitCounts[force.slug] ?? 0}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    Equipment
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold tabular tracking-[-0.02em]">
                    {equipmentCounts[force.slug] ?? 0}
                  </dd>
                </div>
              </dl>
            </div>
          </Link>
        ))}
      </section>
    </Wrap>
  );
}
