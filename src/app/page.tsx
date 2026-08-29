import Link from "next/link";
import { TAXONOMY, allEntries } from "@/content";
import { FORCES, allUnits } from "@/content/units";

function EquipmentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="3" width="18" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9h10M9 13.5h10M9 18h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ForcesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="22" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="22" cy="22" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 8.6V13M14 13 6 19.5M14 13l8 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const totalEntries = allEntries.length;
  const totalUnits = allUnits.length;
  const sourcesCited = allEntries.reduce((n, e) => n + e.sources.length, 0);

  return (
    <div className="px-4 sm:px-6">
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: "radial-gradient(var(--rule) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="pt-20 pb-16 sm:pt-28 sm:pb-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Indian Defence Equipment &amp; Order of Battle
          </p>
          <h1 className="mt-5 font-display font-bold text-5xl sm:text-6xl leading-[1.02] tracking-[-0.035em]">
            Know the equipment.
            <br />
            Not just the name.
          </h1>
          <p className="mt-6 text-[17px] sm:text-[18px] leading-relaxed text-ink-2 max-w-[52ch]">
            A sourced, dated reference for SSB aspirants — full specifications for the
            equipment in service with the Indian Armed Forces, and the arms, corps and
            commands that operate it. No accounts, no backend, just static, cited pages.
          </p>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 tabular">
            {totalEntries} equipment {totalEntries === 1 ? "entry" : "entries"} ·{" "}
            {totalUnits} arms &amp; commands · {sourcesCited} sources cited
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Two ways in */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/browse"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-rule bg-surface p-8 transition-colors hover:border-accent"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 origin-left"
            />
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-dim text-accent">
              <EquipmentIcon />
            </span>
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                By equipment
              </span>
              <h2 className="mt-1.5 font-display font-bold text-2xl tracking-tight group-hover:text-accent transition-colors">
                Browse the codex
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-ink-2">
              Missiles, armour, artillery, aircraft and more — {totalEntries} entries
              across {TAXONOMY.length} categories, each with full specifications and
              sources.
            </p>
            <span className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              Browse the codex →
            </span>
          </Link>

          <Link
            href="/forces"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-rule bg-surface p-8 transition-colors hover:border-accent"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 origin-left"
            />
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-dim text-accent">
              <ForcesIcon />
            </span>
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                By force
              </span>
              <h2 className="mt-1.5 font-display font-bold text-2xl tracking-tight group-hover:text-accent transition-colors">
                Browse by force
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-ink-2">
              {FORCES.map((f) => f.name.replace("Indian ", "")).join(", ")} —{" "}
              {totalUnits} arms, corps and commands, plus the equipment each one
              operates.
            </p>
            <span className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              Browse by force →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
