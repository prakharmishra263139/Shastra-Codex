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
  ServiceRule,
  GridFillers,
} from "@/components/layout/section";
import { EntryCard } from "@/components/entry-card";
import {
  PageTransition,
  SharedPhoto,
  forcePhotoName,
} from "@/components/layout/page-transition";
import { RecentlyViewed } from "@/components/nav/recently-viewed";

/*
  The home page is read top to bottom, once, by somebody who has never seen the
  site: what this is, then each of the three services in turn, then the
  equipment taxonomy, then how the figures are sourced.

  Everything below the hero is a band — full-bleed rule, contained content — so
  the page has a spine even where the sections look nothing alike. The three
  service bands are the exception: each one washes itself in that service's
  field colour, so the middle of the page reads as three chapters rather than
  one long scroll.

  Numbering runs 01 order of battle, 02 the codex, 03 latest, 04 method. The
  service bands sit *inside* 01 and take the service's own ordinal instead, so
  the spine never shows the same number twice.
*/

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero({ entries, units }: { entries: number; units: number }) {
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
        className="settle object-cover object-[50%_35%]"
      />

      {/* Three stacked scrims: one to seat the photograph into the band, one to
          guarantee contrast under the headline, and — below `lg`, where the copy
          runs the full width — a flat wash in place of the side gradient. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(8_11_14/0.9)_0%,rgb(8_11_14/0.1)_26%,rgb(8_11_14/0.3)_58%,rgb(8_11_14/0.9)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(8_11_14/0.9)_0%,rgb(8_11_14/0.5)_45%,transparent_80%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[rgb(8_11_14/0.5)] lg:hidden" />

      {/* The stack settles in over the first second: label, headline, lede,
          buttons, figures. Delays are read from one variable per element so the
          rhythm can be retimed in one place. */}
      <Wrap wide className="relative pb-14 pt-32 sm:pb-20">
        <div className="rise" style={{ "--rise-delay": "60ms" } as React.CSSProperties}>
          <Eyebrow>Indian Defence Equipment &amp; Order of Battle</Eyebrow>
        </div>

        <h1
          className="rise mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em]"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          Know the equipment.
          <span className="block text-ink-2">Not just the name.</span>
        </h1>

        <p
          className="rise mt-7 max-w-[54ch] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]"
          style={{ "--rise-delay": "240ms" } as React.CSSProperties}
        >
          A sourced, dated reference for SSB aspirants — every system in service with
          the Indian Armed Forces, and the arms, corps and commands that operate it.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          <Link
            href="/browse"
            className="group inline-flex items-center gap-2.5 rounded-[5px] bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ground transition-[translate,opacity] duration-200 ease-soft hover:-translate-y-0.5 hover:opacity-90"
          >
            Browse the codex
            <span
              aria-hidden
              className="transition-transform duration-200 ease-soft group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/forces"
            className="inline-flex items-center gap-2.5 rounded-[5px] border border-rule bg-surface/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 backdrop-blur transition-[translate,border-color,color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-accent hover:text-ink"
          >
            Browse by force
          </Link>
        </div>

        <dl
          className="rise mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-7 sm:grid-cols-4"
          style={{ "--rise-delay": "440ms" } as React.CSSProperties}
        >
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

      {/* The site signs itself: three services, three colours, one hairline. */}
      <ServiceRule className="absolute inset-x-0 bottom-0" />
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
  const ordinal = String(index).padStart(2, "0");

  return (
    <section
      data-force={force.slug}
      className="relative isolate overflow-hidden py-20 sm:py-24"
      aria-labelledby={`force-${force.slug}`}
    >
      {/* The band's own colour, laid under everything and fading out before the
          next band starts. */}
      <div aria-hidden className="tone-field absolute inset-0 -z-10" />
      <span aria-hidden className="tone-rule absolute inset-x-0 top-0 h-px" />

      <Wrap wide>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={`reveal ${flipped ? "lg:order-2" : ""}`}>
            <Eyebrow toned index={ordinal}>
              {force.unitLabel}
            </Eyebrow>

            <h2
              id={`force-${force.slug}`}
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            >
              {force.name}
            </h2>

            {/* The motto is the one place a service speaks in its own words, so
                it gets a rule in its own colour rather than a run of body text. */}
            <figure className="mt-5 border-l-2 border-tone pl-4">
              <p lang="sa" className="text-[18px] leading-snug text-ink">
                {force.motto.text}
              </p>
              <figcaption className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                {force.motto.translation}
              </figcaption>
            </figure>

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
                      className="inline-block rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 transition-[translate,border-color,color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-tone hover:text-ink"
                    >
                      {unit.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`/forces/${force.slug}`}
              className="group mt-9 inline-flex items-center gap-3 border-b border-tone pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-tone"
            >
              Explore the {force.shortName}
              <span
                aria-hidden
                className="transition-transform duration-200 ease-soft group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div className={`reveal ${flipped ? "lg:order-1" : ""}`}>
            <Link
              href={`/forces/${force.slug}`}
              aria-label={`Explore the ${force.name}`}
              className="group relative block"
            >
              {/* A plate in the service colour, offset behind the photograph.
                  It is the whole reason the picture reads as mounted on the
                  band rather than dropped onto it. */}
              <span
                aria-hidden
                className="tone-bg absolute inset-0 translate-x-3 translate-y-3 rounded-lg opacity-20 transition-transform duration-500 ease-soft group-hover:translate-x-4 group-hover:translate-y-4"
              />

              <figure className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-rule bg-surface-2">
                  <SharedPhoto name={forcePhotoName(force.slug)}>
                    <Image
                      src={force.image.src}
                      alt={force.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                    />
                  </SharedPhoto>
                </div>
                {/* A single tone-coloured edge is all the colour the frame gets. */}
                <span
                  aria-hidden
                  className="tone-bg absolute -bottom-px left-6 right-6 h-[3px] rounded-full"
                />
              </figure>
            </Link>
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
          index="02"
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
                className="group reveal relative flex min-h-[11.5rem] flex-col bg-surface p-6 transition-colors duration-200 ease-soft hover:bg-surface-2"
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
                  className={`mt-5 font-display text-[19px] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200 ease-soft ${
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

                {/* The cell lights along its lower edge on hover — the hairline
                    grid has no border of its own to colour. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-soft group-hover:scale-x-100"
                />
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
          index="04"
          eyebrow="Method"
          title="Built to be quoted out loud"
          lede="The difference between knowing a name and knowing a system is whether you can say something true about it under pressure."
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-3">
          {COMMITMENTS.map((commitment, i) => (
            <div key={commitment.title} className="reveal bg-surface p-7">
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
    <PageTransition>
      <Hero entries={allEntries.length} units={allUnits.length} />

      {/* -------------------------------------------------------------- */}
      {/* The three services */}
      {/* -------------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <Wrap wide>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div className="reveal max-w-[42ch]">
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
            <ol className="reveal divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface">
              {FORCES.map((force, i) => (
                <li key={force.slug}>
                  <Link
                    href={`/forces/${force.slug}`}
                    data-force={force.slug}
                    className="group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 ease-soft hover:bg-surface-2"
                  >
                    <span aria-hidden className="tone-bg h-8 w-[3px] rounded-full" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] tabular text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[16px] font-semibold tracking-[-0.02em] transition-colors duration-200 ease-soft group-hover:text-tone">
                        {force.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] tabular text-ink-3">
                        {unitCounts[force.slug] ?? 0} {force.unitLabel.toLowerCase()} ·{" "}
                        {equipmentByForce[force.slug] ?? 0} equipment
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-ink-3 transition-transform duration-200 ease-soft group-hover:translate-x-1"
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
              index="03"
              eyebrow="Latest"
              title="Most recently verified"
              lede="The entries whose figures were checked most recently."
              action={{ label: "See all entries", href: "/browse" }}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                // The reveal sits on a wrapper so the card keeps `transform`
                // free for its hover lift.
                <div key={item.slug} className="reveal">
                  <EntryCard item={item} />
                </div>
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
          <div className="blueprint reveal relative overflow-hidden rounded-xl border border-rule bg-surface px-8 py-14 text-center sm:px-14">
            <ServiceRule className="absolute inset-x-0 top-0" />

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
                className="group inline-flex items-center gap-2.5 rounded-[5px] bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ground transition-[translate,opacity] duration-200 ease-soft hover:-translate-y-0.5 hover:opacity-90"
              >
                Browse the codex
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-soft group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/forces"
                className="inline-flex items-center gap-2.5 rounded-[5px] border border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-[translate,border-color,color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-accent hover:text-ink"
              >
                Browse by force
              </Link>
            </div>
          </div>
        </Wrap>
      </section>
    </PageTransition>
  );
}
