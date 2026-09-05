import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FORCES, getForce, unitsByForce } from "@/content/units";
import { allEntries } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Wrap, Eyebrow, SectionHeader } from "@/components/layout/section";
import { PhotoMasthead } from "@/components/layout/masthead";
import {
  PageTransition,
  forcePhotoName,
} from "@/components/layout/page-transition";
import { UnitCard } from "@/components/unit-card";
import { EntryCard } from "@/components/entry-card";

export function generateStaticParams() {
  return FORCES.map((f) => ({ force: f.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/forces/[force]">): Promise<Metadata> {
  const { force } = await params;
  const found = getForce(force);
  if (!found) return {};
  return { title: found.name, description: found.blurb };
}

export default async function ForcePage({ params }: PageProps<"/forces/[force]">) {
  const { force } = await params;
  const found = getForce(force);
  if (!found) notFound();

  const units = unitsByForce(found.slug);
  const equipment = toBrowseItems(
    allEntries.filter((e) => e.operators.includes(found.slug)),
  );

  return (
    <PageTransition>
      {/* One attribute themes the whole page: the masthead tint, every eyebrow,
          every rule and every hover state below it. */}
      <div data-force={found.slug}>
        {/* ---------------------------------------------------------------- */}
        {/* Masthead — the photograph sits behind the title, not beside it */}
        {/* ---------------------------------------------------------------- */}
        <PhotoMasthead
          image={found.image}
          force={found.slug}
          photoName={forcePhotoName(found.slug)}
          minHeight="min-h-[26rem] sm:min-h-[32rem]"
        >
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Forces", href: "/forces" },
              { label: found.name },
            ]}
          />

          <h1
            className="rise mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1] tracking-[-0.04em]"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            {found.name}
          </h1>

          <p
            className="rise mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            <span lang="sa" className="text-[18px] text-ink">
              {found.motto.text}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-tone">
              {found.motto.translation}
            </span>
          </p>

          <p
            className="rise mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-2"
            style={{ "--rise-delay": "260ms" } as React.CSSProperties}
          >
            {found.blurb}
          </p>
        </PhotoMasthead>

        <Wrap wide className="pb-4">
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-px overflow-hidden rounded-lg border border-rule bg-rule">
            {[
              [found.unitLabel, String(units.length)],
              ["Equipment operated", String(equipment.length)],
              [
                "In service",
                String(equipment.filter((e) => e.status === "in-service").length),
              ],
              ["Categories", String(new Set(equipment.map((e) => e.category)).size)],
            ].map(([label, value]) => (
              <div key={label} className="relative bg-surface p-5">
                <span aria-hidden className="tone-bg absolute inset-x-0 top-0 h-px opacity-60" />
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  {label}
                </dt>
                <dd className="mt-2 font-display text-[26px] font-bold tabular leading-none tracking-[-0.03em]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Wrap>

        {/* ---------------------------------------------------------------- */}
        <Wrap wide className="py-14 sm:py-16">
          <SectionHeader
            toned
            index="01"
            eyebrow={found.unitLabel}
            title={`How the ${found.shortName} is organised`}
            lede={found.tagline}
          />

          {units.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <div key={unit.slug} className="reveal">
                  <UnitCard unit={unit} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-rule p-12 text-center">
              <p className="font-display text-[17px] font-semibold">Nothing here yet</p>
              <p className="mt-2 text-[14px] text-ink-2">
                No {found.unitLabel.toLowerCase()} have been written up for the{" "}
                {found.name} so far.
              </p>
            </div>
          )}
        </Wrap>

        {equipment.length > 0 && (
          <Wrap wide className="pb-20">
            <SectionHeader
              toned
              index="02"
              eyebrow="Inventory"
              title={`Equipment operated by the ${found.shortName}`}
              lede={`${equipment.length} ${equipment.length === 1 ? "entry" : "entries"} in the codex list the ${found.name} as an operator.`}
              action={{ label: "Browse everything", href: "/browse" }}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {equipment.map((item) => (
                <div key={item.slug} className="reveal">
                  <EntryCard item={item} />
                </div>
              ))}
            </div>
          </Wrap>
        )}

        {/* A quiet way out of a leaf page. Each link carries its own service
            colour, so the choice is already colour-coded. */}
        <Wrap wide className="pb-8">
          <nav
            aria-label="Other services"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-8"
          >
            <Eyebrow>Other services</Eyebrow>
            {FORCES.filter((f) => f.slug !== found.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/forces/${other.slug}`}
                data-force={other.slug}
                className="group font-display text-[16px] font-semibold tracking-[-0.02em] text-ink-2 transition-colors duration-200 ease-soft hover:text-tone"
              >
                {other.name}
                <span
                  aria-hidden
                  className="ml-2 inline-block transition-transform duration-200 ease-soft group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>
        </Wrap>
      </div>
    </PageTransition>
  );
}
