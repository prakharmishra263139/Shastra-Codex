import Image from "next/image";
import Link from "next/link";
import { TAXONOMY, allEntries } from "@/content";
import { FORCES, allUnits } from "@/content/units";

function EquipmentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="3" width="18" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9h10M9 13.5h10M9 18h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ForcesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="22" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="22" cy="22" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 8.6V13M14 13 6 19.5M14 13l8 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const SHOWCASE = [
  { force: "Army", src: "/images/home-army.webp" },
  { force: "Air Force", src: "/images/home-airforce.webp" },
  { force: "Navy", src: "/images/home-navy.webp" },
] as const;

export default function HomePage() {
  const totalEntries = allEntries.length;
  const totalUnits = allUnits.length;

  return (
    <div className="px-4 sm:px-6">
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="pt-16 pb-10 sm:pt-20 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Indian Defence Equipment &amp; Order of Battle
        </p>
        <h1 className="mt-5 font-display font-bold text-5xl sm:text-6xl leading-[1.02] tracking-[-0.035em]">
          Know the equipment.
          <br />
          Not just the name.
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink-2 max-w-[52ch]">
          A sourced, dated reference for SSB aspirants — the equipment in service with
          the Indian Armed Forces, and the arms, corps and commands that operate it.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Showcase */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-10">
        <div className="grid gap-3 sm:grid-cols-3">
          {SHOWCASE.map(({ force, src }) => (
            <div
              key={force}
              className="relative aspect-[3/2] overflow-hidden rounded-md border border-rule bg-surface-2"
            >
              <Image
                src={src}
                alt={`Indian ${force} personnel on parade`}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"
              />
              <span className="absolute bottom-3 left-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                {force}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Navigate */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-20">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/browse"
            className="group flex flex-1 items-center gap-3.5 rounded-md border border-rule bg-surface px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-dim text-accent">
              <EquipmentIcon />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-display font-semibold text-[15px] tracking-tight group-hover:text-accent transition-colors">
                Browse the codex
              </span>
              <span className="block font-mono text-[11px] text-ink-3 tabular">
                {totalEntries} entries · {TAXONOMY.length} categories
              </span>
            </span>
            <span aria-hidden className="text-accent text-lg">
              →
            </span>
          </Link>

          <Link
            href="/forces"
            className="group flex flex-1 items-center gap-3.5 rounded-md border border-rule bg-surface px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-dim text-accent">
              <ForcesIcon />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-display font-semibold text-[15px] tracking-tight group-hover:text-accent transition-colors">
                Browse by force
              </span>
              <span className="block font-mono text-[11px] text-ink-3 tabular">
                {totalUnits} arms &amp; commands · {FORCES.length} services
              </span>
            </span>
            <span aria-hidden className="text-accent text-lg">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
