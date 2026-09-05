import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allEntries, getEntry, compareCandidates } from "@/content";
import { getCategory, getClass } from "@/content/taxonomy";
import { getForce } from "@/content/forces";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Wrap, Eyebrow, SubHeading } from "@/components/layout/section";
import { SpecTable, MeasureValue } from "@/components/spec-table";
import { StatusPill } from "@/components/entry-card";
import { ImageGallery } from "@/components/entry-images";
import { RecordView } from "@/components/nav/recently-viewed";
import {
  PageTransition,
  SharedPhoto,
  entryPhotoName,
} from "@/components/layout/page-transition";
import { formatService } from "@/lib/format";
import { highlights } from "@/lib/highlights";

export function generateStaticParams() {
  return allEntries.map((e) => ({
    category: e.category,
    class: e.class,
    slug: e.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[class]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return { title: entry.name, description: entry.summary };
}

export default async function EntryPage({
  params,
}: PageProps<"/[category]/[class]/[slug]">) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const category = getCategory(entry.category);
  const klass = getClass(entry.category, entry.class);
  const stats = highlights(entry);
  const candidates = compareCandidates(entry);
  const [lead, ...rest] = entry.images;

  return (
    <PageTransition>
      <article className="pb-8">
        <RecordView
          slug={entry.slug}
          name={entry.name}
          href={`/${entry.category}/${entry.class}/${entry.slug}`}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Masthead — identity on the left, the photograph on the right */}
        {/* ---------------------------------------------------------------- */}
        <Wrap className="pt-12 sm:pt-16">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Browse", href: "/browse" },
              { label: category?.name ?? entry.category, href: `/${entry.category}` },
              {
                label: klass?.name ?? entry.class,
                href: `/${entry.category}/${entry.class}`,
              },
              { label: entry.name },
            ]}
          />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <header className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={entry.status} />
                {entry.operators.map((service) => {
                  const force = getForce(service);
                  return (
                    <span
                      key={service}
                      data-force={force?.slug}
                      className="inline-flex items-center gap-2 rounded-[3px] bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2"
                    >
                      {force && (
                        <span aria-hidden className="tone-bg h-2.5 w-[2px] rounded-full" />
                      )}
                      {formatService(service)}
                    </span>
                  );
                })}
              </div>

              <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1] tracking-[-0.04em]">
                {entry.name}
              </h1>

              {entry.aliases.length > 0 && (
                <p className="mt-3 font-mono text-[12px] text-ink-3">
                  Also known as {entry.aliases.join(" · ")}
                </p>
              )}

              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-ink-2">
                {entry.summary}
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-6">
                {(
                  [
                    ["Origin", entry.origin.join(", ")],
                    ["Inducted", entry.inducted ? String(entry.inducted) : ""],
                    ["Class", klass?.name ?? entry.class],
                  ] as const
                )
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                        {label}
                      </dt>
                      <dd className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.02em]">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </header>

            {lead && (
              <figure className="min-w-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-rule bg-surface-2 shadow-[var(--shadow-card)]">
                  <SharedPhoto name={entryPhotoName(entry.slug)}>
                    <Image
                      src={lead.src}
                      alt={lead.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 26rem"
                      className="object-cover"
                    />
                  </SharedPhoto>
                </div>
                <figcaption className="mt-2.5 font-mono text-[10.5px] leading-relaxed text-ink-3">
                  {lead.sourceUrl ? (
                    <a
                      href={lead.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 ease-soft hover:text-accent"
                    >
                      {lead.credit}
                    </a>
                  ) : (
                    lead.credit
                  )}
                  <span aria-hidden className="mx-1.5 text-rule">
                    ·
                  </span>
                  {lead.license}
                </figcaption>
              </figure>
            )}
          </div>
        </Wrap>

        {/* ---------------------------------------------------------------- */}
        {/* At a glance */}
        {/* ---------------------------------------------------------------- */}
        {stats.length > 0 && (
          <Wrap className="mt-14">
            <Eyebrow className="mb-4">At a glance</Eyebrow>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-px overflow-hidden rounded-lg border border-rule bg-rule">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-display text-[24px] font-semibold leading-tight tracking-[-0.03em]">
                    {stat.measure ? <MeasureValue m={stat.measure} /> : stat.text}
                  </p>
                </div>
              ))}
            </div>
          </Wrap>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Body */}
        {/* ---------------------------------------------------------------- */}
        <Wrap className="mt-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16">
            <div className="flex min-w-0 flex-col gap-14">
              <section>
                <SubHeading>Overview</SubHeading>
                <div className="mt-5 flex max-w-[68ch] flex-col gap-4">
                  {entry.description.map((para, i) => (
                    <p key={i} className="text-[16.5px] leading-[1.75] text-ink-2">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <SubHeading>Specifications</SubHeading>
                <div className="mt-5 overflow-x-auto rounded-lg border border-rule">
                  <SpecTable entry={entry} />
                </div>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-3">
                  Dotted underline: widely reported, not officially confirmed. Dashed
                  underline with ~: estimate.
                </p>
              </section>

              {entry.variants.length > 0 && (
                <section>
                  <SubHeading>Variants</SubHeading>
                  <ol className="mt-6 border-l border-rule">
                    {entry.variants.map((variant) => (
                      <li key={variant.name} className="relative pb-7 pl-7 last:pb-0">
                        <span
                          className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-[var(--ground)]"
                          aria-hidden
                        />
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3 className="font-display text-[15.5px] font-semibold tracking-[-0.01em]">
                            {variant.name}
                          </h3>
                          {variant.year && (
                            <span className="font-mono text-[11px] tabular text-ink-3">
                              {variant.year}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-2">
                          {variant.change}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {rest.length > 0 && (
                <section>
                  <SubHeading>Gallery</SubHeading>
                  <div className="mt-5">
                    <ImageGallery images={rest} />
                  </div>
                </section>
              )}

              {/* ---------- The reason this site exists ---------- */}
              <section>
                <SubHeading>SSB angle</SubHeading>

                <div className="mt-5 rounded-lg border border-accent/35 bg-accent-dim/40 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Why it matters
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.7]">{entry.ssb.whyItMatters}</p>
                </div>

                <div className="mt-8">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    Memory hooks
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {entry.ssb.hooks.map((hook, i) => (
                      <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed">
                        <span className="mt-0.5 text-accent" aria-hidden>
                          ▸
                        </span>
                        <span>{hook}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {entry.ssb.likelyAsked.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                      Likely questions
                    </h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {entry.ssb.likelyAsked.map((question, i) => (
                        <li
                          key={i}
                          className="border-l-2 border-rule pl-4 text-[15.5px] leading-relaxed text-ink-2"
                        >
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>

            {/* ---------- Side column ---------- */}
            <aside className="flex min-w-0 flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
              <section>
                <SubHeading>Programme</SubHeading>
                <dl className="mt-4 flex flex-col gap-3.5 text-[14px]">
                  {(
                    [
                      ["Origin", entry.origin.join(", ")],
                      ["Developer", entry.developer.join(", ")],
                      ["Manufacturer", entry.manufacturer.join(", ")],
                      ["Inducted", entry.inducted ? String(entry.inducted) : ""],
                    ] as const
                  )
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                          {label}
                        </dt>
                        <dd className="mt-1 leading-relaxed text-ink-2">{value}</dd>
                      </div>
                    ))}
                </dl>
              </section>

              {candidates.length > 0 && (
                <section>
                  <SubHeading>Compare with</SubHeading>
                  <ul className="mt-4 flex flex-col gap-2">
                    {candidates.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/${other.category}/${other.class}/${other.slug}`}
                          className="group block rounded-lg border border-rule bg-surface px-4 py-3 transition-colors duration-200 ease-soft hover:border-accent"
                        >
                          <span className="font-display text-[14.5px] font-semibold transition-colors duration-200 ease-soft group-hover:text-accent">
                            {other.name}
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-snug text-ink-3">
                            {other.summary}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-3">
                    Side-by-side comparison arrives in Phase 3.
                  </p>
                </section>
              )}

              <section>
                <SubHeading>Sources</SubHeading>
                <ol className="mt-4 flex flex-col gap-3 text-[13px]">
                  {entry.sources.map((source, i) => (
                    <li key={i} className="leading-relaxed">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {source.title}
                      </a>
                      <span className="block text-ink-3">{source.publisher}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 font-mono text-[11px] tabular text-ink-3">
                  Last verified {entry.lastVerified}
                </p>
              </section>
            </aside>
          </div>
        </Wrap>
      </article>
    </PageTransition>
  );
}
