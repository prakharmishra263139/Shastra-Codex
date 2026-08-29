import Link from "next/link";
import { TAXONOMY, allEntries } from "@/content";
import { FORCES, allUnits } from "@/content/units";
import { MeasureValue } from "@/components/spec-table";
import type { Measure } from "@/content/schema";

/** Illustrative only — not attributed to any real system. Demonstrates the marker system used on every entry page. */
const CONFIDENCE_DEMO: { label: string; measure: Measure }[] = [
  { label: "Main gun calibre", measure: { value: 120, unit: "mm", confidence: "official" } },
  {
    label: "Range",
    measure: {
      value: 290,
      unit: "km",
      confidence: "reported",
      note: "Figure repeated across open sources; no official release confirms it.",
    },
  },
  {
    label: "Top speed",
    measure: { value: 2.8, unit: "Mach", confidence: "estimated", note: "No public flight-test data." },
  },
];

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Browse the tree",
    body: "Nine equipment categories broken into classes, or three services broken into their arms, corps and commands. The sidebar stays visible and shows what is populated and what is not.",
  },
  {
    n: "02",
    title: "Search instantly",
    body: "Press Ctrl-K (Cmd-K on Mac) to fuzzy-search by name, alias or designation. “PJ-10” finds BrahMos, a typo still lands — no page load, no server round trip.",
  },
  {
    n: "03",
    title: "Read the SSB angle",
    body: "Every entry ends with why it matters in an interview, quotable memory hooks, and the follow-up questions boards actually ask — not just a spec sheet.",
  },
] as const;

export default function HomePage() {
  const totalEntries = allEntries.length;
  const totalUnits = allUnits.length;
  const sourcesCited = allEntries.reduce((n, e) => n + e.sources.length, 0);

  return (
    <div className="px-4 sm:px-6">
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="pt-16 pb-20 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Indian Defence Equipment &amp; Order of Battle
        </p>
        <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl leading-[1.03] tracking-[-0.03em]">
          Know the equipment.
          <br />
          Not just the name.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
          Specifications, roles and interview angles for the systems in service with
          the Indian Armed Forces, and the arms, corps and commands that operate them —
          sourced, dated, and built to compare side by side.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 tabular">
          {totalEntries} equipment {totalEntries === 1 ? "entry" : "entries"} ·{" "}
          {totalUnits} arms &amp; commands · {sourcesCited} sources cited
        </p>

        <div className="mt-7">
          <a
            href="#explore"
            className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent hover:underline underline-offset-4"
          >
            See how it&apos;s organised ↓
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* About */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-20 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="max-w-2xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
            What this is
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-2">
            <p>
              Most SSB candidates learn equipment names — BrahMos, Tejas, Akash — without
              knowing enough about them to survive a follow-up question, and even fewer
              can say what the Regiment of Artillery does or where Southern Air Command
              is headquartered. Shastra Codex is a reference built to fix both gaps: what
              a system or a service actually does, the trade-offs it makes, and the exact
              angle an interviewer is likely to push on.
            </p>
            <p>
              There are no accounts, no backend, and nothing behind a login. Every page
              here is a static file compiled from publicly available sources — Ministry
              of Defence releases, the three service websites, DRDO and HAL material, and
              established defence journalism — each one cited and dated on the page
              itself.
            </p>
          </div>
        </div>

        <div className="rounded-md border border-rule bg-surface p-5 h-fit">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
            Built for
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed">SSB aspirants and instructors</p>

          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
            Runs on
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed">
            Static pages only — no database, no login
          </p>

          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
            Sourced from
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed">
            PIB, MoD, the service websites, DRDO/HAL, and established defence journalism
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-20">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          How it works
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="rounded-md border border-rule bg-surface p-5">
              <p className="font-mono text-[11px] text-accent tabular">{step.n}</p>
              <h3 className="mt-2 font-display font-semibold text-[15px] tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Confidence markers */}
      {/* ---------------------------------------------------------------- */}
      <section className="pb-20">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          Not every figure is official — this site says so
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Most public defence specifications are estimates or export-variant numbers.
          Rather than print them as hard fact, every measured figure on Shastra Codex
          carries a confidence marker, right there in the text:
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {CONFIDENCE_DEMO.map(({ label, measure }) => (
            <div key={label} className="rounded-md border border-rule bg-surface p-5">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                {label}
              </dt>
              <dd className="mt-2 font-mono text-2xl tabular">
                <MeasureValue m={measure} />
              </dd>
              <dd className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                {measure.confidence}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-mono text-[11px] text-ink-3 leading-relaxed">
          Illustrative figures, not attributed to any real system. Dotted underline: widely
          reported, not officially confirmed. Dashed underline with ~: estimate. Open any
          entry for the real, sourced numbers marked the same way.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Two ways in */}
      {/* ---------------------------------------------------------------- */}
      <section id="explore" className="pb-20 scroll-mt-20">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          Two ways to explore
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/browse"
            className="group flex flex-col gap-3 rounded-md border border-rule bg-surface p-7 transition-colors hover:border-accent"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
              By equipment
            </span>
            <h3 className="font-display font-bold text-2xl tracking-tight group-hover:text-accent transition-colors">
              Browse the codex
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-2">
              Missiles, armour, artillery, aircraft and more — {totalEntries} entries
              across {TAXONOMY.length} categories, each with full specifications and
              sources.
            </p>
            <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              Browse the codex →
            </span>
          </Link>

          <Link
            href="/forces"
            className="group flex flex-col gap-3 rounded-md border border-rule bg-surface p-7 transition-colors hover:border-accent"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
              By force
            </span>
            <h3 className="font-display font-bold text-2xl tracking-tight group-hover:text-accent transition-colors">
              Browse by force
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-2">
              {FORCES.map((f) => f.name.replace("Indian ", "")).join(", ")} — {totalUnits}{" "}
              arms, corps and commands, plus the equipment each one operates.
            </p>
            <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              Browse by force →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
