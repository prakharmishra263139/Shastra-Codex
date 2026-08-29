import Image from "next/image";
import Link from "next/link";
import { TAXONOMY, allEntries, categoryCounts } from "@/content";
import { FORCES, allUnits, unitsByForce, forceCounts } from "@/content/units";
import type { ForceInfo } from "@/content/forces";
import { toBrowseItems } from "@/lib/browse";
import {
  Wrap,
  Eyebrow,
  SectionHeader,
  GridFillers,
} from "@/components/layout/section";
import { EntryCard } from "@/components/entry-card";
import { RecentlyViewed } from "@/components/nav/recently-viewed";

/*
  The home page is read top to bottom, once, by somebody who has never seen the
  site: what this is, then each of the three services in turn, then the
  equipment taxonomy, then how the figures are sourced.

  Everything below the hero is a band — full-bleed rule, contained content —
  so the page has a spine even where the sections look nothing alike.
*/

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero({
  entries,
  units,
}: {
  entries: number;
  units: number;
}) {
  const figures = [
    { value: entries, label: "Equipment entries" },
    { value: TAXONOMY.length, label: "Categories" },
    { value: units, label: "Arms & commands" },
    { value: FORCES.length, label: "Services" },
  ];

  return (
    <section className="on-photo relative -mt-16 flex min-h-[max(38rem,88svh)] flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero-republic-day.webp"
        alt="Indian Army contingent marching past the North Block on a foggy Republic Day morning"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />

      {/* Three stacked scrims: one to seat the photograph into the band, one to
          guarantee contrast under the headline, and — below `lg`, where the copy
          runs the full width — a flat wash in place of the side gradient. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_13_16/0.9)_0%,rgb(10_13_16/0.1)_26%,rgb(10_13_16/0.3)_58%,rgb(10_13_16/0.88)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_13_16/0.9)_0%,rgb(10_13_16/0.5)_45%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[rgb(10_13_16/0.5)] lg:hidden"
      />

      <Wrap wide className="relative pb-14 pt-32 sm:pb-20">
        <Eyebrow>Indian Defence Equipment &amp; Order of Battle</Eyebrow>

        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em]">
          Know the equipment.
          <span className="block text-ink-2">Not just the name.</span>
        </h1>

        <p className="mt-7 max-w-[54ch] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
          A sourced, dated reference for SSB aspirants — every system in service with
          the Indian Armed Forces, and the arms, corps and commands that operate it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/browse"
            className="group inline-flex items-center gap-2.5 rounded-[5px] bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ground transition-opacity hover:opacity-90"
          >
            Browse the codex
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/forces"
            className="inline-flex items-center gap-2.5 rounded-[5px] border border-rule bg-surface/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 backdrop-blur transition-colors hover:border-accent hover:text-ink"
          >
            Browse by force
          </Link>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-7 sm:grid-cols-4">
          {figures.map((figure) => (
            <div key={figure.label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                {figure.label}
              </dt>
              <dd className="mt-1.5 font-display text-3xl font-bold tabular tracking-[-0.03em]">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}

// ---------------------------------------------------------------------------
// One band per service
// ---------------------------------------------------------------------------

function ForceBand({
  force,
  index,
  units,
  unitCount,
  equipmentCount,
  flipped,
}: {
  force: ForceInfo;
  index: number;
  units: { slug: string; name: string }[];
  unitCount: number;
  equipmentCount: number;
  /** Alternate the photograph left and right down the page. */
  flipped: boolean;
}) {
  return (
    <section
      className="toned border-t border-rule py-16 sm:py-20"
      style={{ "--tone": force.tone } as React.CSSProperties}
      aria-labelledby={`force-${force.slug}`}
    >
      <Wrap wide>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={flipped ? "lg:order-2" : undefined}>
            <Eyebrow toned index={String(index).padStart(2, "0")}>
              {force.unitLabel}
            </Eyebrow>

            <h2
              id={`force-${force.slug}`}
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            >
              {force.name}
            </h2>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span lang="sa" className="text-[17px] text-ink">
                {force.motto.text}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                {force.motto.translation}
              </span>
            </p>

            <p className="mt-6 max-w-[54ch] text-[16px] leading-[1.7] text-ink-2">
              {force.tagline}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                  {force.unitLabel}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold tabular tracking-[-0.03em]">
                  {unitCount}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                  Equipment operated
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold tabular tracking-[-0.03em]">
                  {equipmentCount}
                </dd>
              </div>
            </dl>

            {units.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {units.map((unit) => (
                  <li key={unit.slug}>
                    <Link
                      href={`/forces/${force.slug}/${unit.slug}`}
                      className="inline-block rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:border-[var(--tone)] hover:text-ink"
                    >
                      {unit.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`/forces/${force.slug}`}
              className="group mt-9 inline-flex items-center gap-3 border-b border-[var(--tone)] pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] tone-text"
            >
              Explore the {force.shortName}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className={flipped ? "lg:order-1" : undefined}>
            <figure className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-rule bg-surface-2">
                <Image
                  src={force.image.src}
                  alt={force.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* A single tone-coloured edge is all the colour each band gets. */}
              <span
                aria-hidden
                className="tone-bg absolute -bottom-px left-6 right-6 h-[3px] rounded-full"
              />
            </figure>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Equipment
// ---------------------------------------------------------------------------

function EquipmentSection({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="border-t border-rule py-16 sm:py-24" id="equipment">
      <Wrap wide>
        <SectionHeader
          index="04"
          eyebrow="The codex"
          title="Equipment, by what it does"
          lede="Nine categories, each split into the classes an interviewing officer would actually name. Counts are live — an empty shelf is an honest one."
          action={{ label: "Browse everything", href: "/browse" }}
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {TAXONOMY.map((category, i) => {
            const count = counts[category.slug] ?? 0;
            const empty = count === 0;

            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative flex min-h-[11.5rem] flex-col bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-mono text-[11px] tabular ${
                      empty ? "text-ink-3" : "text-accent"
                    }`}
                  >
                    {count}
                  </span>
                </div>

                <h3
                  className={`mt-5 font-display text-[19px] font-semibold leading-tight tracking-[-0.02em] transition-colors ${
                    empty ? "text-ink-2" : "group-hover:text-accent"
                  }`}
                >
                  {category.name}
                </h3>

                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                  {category.blurb}
                </p>

                <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  {category.classes.length} classes
                </p>
              </Link>
            );
          })}
          <GridFillers count={TAXONOMY.length} />
        </div>
      </Wrap>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How the reference is built
// ---------------------------------------------------------------------------

const COMMITMENTS = [
  {
    title: "Sourced and dated",
    body: "Every entry lists where its figures came from and when they were last checked. A number without a date is a rumour with confidence.",
  },
  {
    title: "Confidence, marked",
    body: "Officially published, widely reported and estimated figures look different on the page. You always know which one you are about to quote.",
  },
  {
    title: "Written for the board",
    body: "Each entry carries why the system matters, the hooks that make it stick, and the questions it tends to attract in an interview.",
  },
];

function MethodSection() {
  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <Wrap wide>
        <SectionHeader
          index="05"
          eyebrow="Method"
          title="Built to be quoted out loud"
          lede="The difference between knowing a name and knowing a system is whether you can say something true about it under pressure."
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-3">
          {COMMITMENTS.map((commitment, i) => (
            <div key={commitment.title} className="bg-surface p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[19px] font-semibold tracking-[-0.02em]">
                {commitment.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-ink-2">
                {commitment.body}
              </p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

// ---------------------------------------------------------------------------

export default function HomePage() {
  const counts = categoryCounts();
  const unitCounts = forceCounts();

  const equipmentByForce: Record<string, number> = {};
  for (const entry of allEntries) {
    for (const service of entry.operators) {
      equipmentByForce[service] = (equipmentByForce[service] ?? 0) + 1;
    }
  }

  const featured = toBrowseItems(allEntries)
    .sort(
      (a, b) =>
        b.lastVerified.localeCompare(a.lastVerified) || a.name.localeCompare(b.name),
    )
    .slice(0, 3);

  return (
    <>
      <Hero entries={allEntries.length} units={allUnits.length} />

      {/* -------------------------------------------------------------- */}
      {/* The three services */}
      {/* -------------------------------------------------------------- */}
      <section className="border-t border-rule py-16 sm:py-20">
        <Wrap wide>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div className="max-w-[42ch]">
              <Eyebrow index="01">Order of battle</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
                Three services, three ways of organising
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2">
                The Army is built from arms and corps; the Air Force and Navy from
                commands. Learning the shape of each is half of what a board is
                testing.
              </p>
            </div>

            {/* A contents page for the three bands that follow. */}
            <ol className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface">
              {FORCES.map((force, i) => (
                <li key={force.slug}>
                  <Link
                    href={`/forces/${force.slug}`}
                    style={{ "--tone": force.tone } as React.CSSProperties}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <span aria-hidden className="tone-bg h-8 w-[3px] rounded-full" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] tabular text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[16px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--tone)]">
                        {force.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] tabular text-ink-3">
                        {unitCounts[force.slug] ?? 0} {force.unitLabel.toLowerCase()} ·{" "}
                        {equipmentByForce[force.slug] ?? 0} equipment
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-ink-3 transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {FORCES.map((force, i) => (
        <ForceBand
          key={force.slug}
          force={force}
          index={i + 1}
          units={unitsByForce(force.slug).slice(0, 4)}
          unitCount={unitCounts[force.slug] ?? 0}
          equipmentCount={equipmentByForce[force.slug] ?? 0}
          flipped={i % 2 === 1}
        />
      ))}

      {/* -------------------------------------------------------------- */}
      <EquipmentSection counts={counts} />

      {featured.length > 0 && (
        <section className="border-t border-rule py-16 sm:py-24">
          <Wrap wide>
            <SectionHeader
              eyebrow="Latest"
              title="Most recently verified"
              lede="The entries whose figures were checked most recently."
              action={{ label: "See all entries", href: "/browse" }}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <EntryCard key={item.slug} item={item} />
              ))}
            </div>

            <RecentlyViewed />
          </Wrap>
        </section>
      )}

      <MethodSection />

      {/* -------------------------------------------------------------- */}
      {/* Close */}
      {/* -------------------------------------------------------------- */}
      <section className="border-t border-rule">
        <Wrap wide className="py-20 sm:py-28">
          <div className="blueprint relative overflow-hidden rounded-xl border border-rule bg-surface px-8 py-14 text-center sm:px-14">
            <Eyebrow className="justify-center">Start here</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              {allEntries.length} entries, every figure dated.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">
              Filter by service, origin, manufacturer or decade — or hit{" "}
              <kbd className="rounded-[3px] border border-rule bg-surface-2 px-1.5 py-0.5 font-mono text-[11px]">
                /
              </kbd>{" "}
              anywhere on the site and type a name.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/browse"
                className="group inline-flex items-center gap-2.5 rounded-[5px] bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ground transition-opacity hover:opacity-90"
              >
                Browse the codex
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/forces"
                className="inline-flex items-center gap-2.5 rounded-[5px] border border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:border-accent hover:text-ink"
              >
                Browse by force
              </Link>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
