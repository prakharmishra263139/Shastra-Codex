import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allEntries, getEntry, compareCandidates } from "@/content";
import { getCategory, getClass } from "@/content/taxonomy";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SpecTable, MeasureValue } from "@/components/spec-table";
import { StatusPill } from "@/components/entry-card";
import { HeroImage, ImageGallery } from "@/components/entry-images";
import { RecordView } from "@/components/nav/recently-viewed";
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-3 border-b border-rule">
      {children}
    </h2>
  );
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

  return (
    <article className="max-w-5xl px-4 py-10 sm:px-6">
      <RecordView
        slug={entry.slug}
        name={entry.name}
        href={`/${entry.category}/${entry.class}/${entry.slug}`}
      />

      <Breadcrumbs
        trail={[
          { label: "Codex", href: "/" },
          { label: category?.name ?? entry.category, href: `/${entry.category}` },
          {
            label: klass?.name ?? entry.class,
            href: `/${entry.category}/${entry.class}`,
          },
          { label: entry.name },
        ]}
      />

      {/* ---------- Hero ---------- */}
      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <StatusPill status={entry.status} />
          {entry.operators.map((service) => (
            <span
              key={service}
              className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-[3px] bg-surface-2 text-ink-2"
            >
              {formatService(service)}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-[-0.03em] leading-[1.03]">
          {entry.name}
        </h1>

        {entry.aliases.length > 0 && (
          <p className="mt-2.5 font-mono text-[12px] text-ink-3">
            Also known as {entry.aliases.join(" · ")}
          </p>
        )}

        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">{entry.summary}</p>
      </header>

      {entry.images[0] && (
        <div className="mt-10">
          <HeroImage image={entry.images[0]} />
        </div>
      )}

      {/* ---------- At a glance ---------- */}
      {stats.length > 0 && (
        <section className="mt-10">
          <div className="grid gap-px bg-rule border border-rule rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                  {stat.label}
                </p>
                <p className="mt-2 font-display font-semibold text-[22px] tracking-tight leading-tight">
                  {stat.measure ? <MeasureValue m={stat.measure} /> : stat.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16">
        {/* ---------- Main column ---------- */}
        <div className="flex flex-col gap-14 min-w-0">
          <section>
            <SectionHeading>Overview</SectionHeading>
            <div className="mt-5 flex flex-col gap-4 max-w-[68ch]">
              {entry.description.map((para, i) => (
                <p key={i} className="text-[16px] leading-[1.7] text-ink-2">
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Specifications</SectionHeading>
            <div className="mt-5 overflow-x-auto">
              <SpecTable entry={entry} />
            </div>
            <p className="mt-3 font-mono text-[11px] text-ink-3 leading-relaxed">
              Dotted underline: widely reported, not officially confirmed. Dashed
              underline with ~: estimate.
            </p>
          </section>

          {entry.variants.length > 0 && (
            <section>
              <SectionHeading>Variants</SectionHeading>
              <ol className="mt-5 border-l border-rule">
                {entry.variants.map((variant) => (
                  <li key={variant.name} className="relative pl-6 pb-6 last:pb-0">
                    <span
                      className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                      aria-hidden
                    />
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-display font-semibold text-[15px]">
                        {variant.name}
                      </h3>
                      {variant.year && (
                        <span className="font-mono text-[11px] text-ink-3 tabular">
                          {variant.year}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-2 max-w-[62ch]">
                      {variant.change}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {entry.images.length > 1 && (
            <section>
              <SectionHeading>Gallery</SectionHeading>
              <div className="mt-5">
                <ImageGallery images={entry.images.slice(1)} />
              </div>
            </section>
          )}

          {/* ---------- The reason this site exists ---------- */}
          <section>
            <SectionHeading>SSB angle</SectionHeading>

            <div className="mt-5 rounded-md border border-accent/40 bg-accent-dim/40 p-5">
              <p className="text-[15.5px] leading-relaxed">{entry.ssb.whyItMatters}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                Memory hooks
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {entry.ssb.hooks.map((hook, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="text-accent mt-0.5" aria-hidden>
                      ▸
                    </span>
                    <span>{hook}</span>
                  </li>
                ))}
              </ul>
            </div>

            {entry.ssb.likelyAsked.length > 0 && (
              <div className="mt-7">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                  Likely questions
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {entry.ssb.likelyAsked.map((question, i) => (
                    <li
                      key={i}
                      className="text-[15px] leading-relaxed text-ink-2 pl-4 border-l-2 border-rule"
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
        <aside className="flex flex-col gap-10 min-w-0">
          <section>
            <SectionHeading>Programme</SectionHeading>
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
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                      {label}
                    </dt>
                    <dd className="mt-1 text-ink-2 leading-relaxed">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>

          {candidates.length > 0 && (
            <section>
              <SectionHeading>Compare with</SectionHeading>
              <ul className="mt-4 flex flex-col gap-2">
                {candidates.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/${other.category}/${other.class}/${other.slug}`}
                      className="block rounded-md border border-rule bg-surface px-4 py-3 transition-colors hover:border-accent group"
                    >
                      <span className="font-display font-semibold text-[14.5px] group-hover:text-accent transition-colors">
                        {other.name}
                      </span>
                      <span className="block mt-0.5 text-[12.5px] text-ink-3 leading-snug">
                        {other.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[11px] text-ink-3 leading-relaxed">
                Side-by-side comparison arrives in Phase 3.
              </p>
            </section>
          )}

          <section>
            <SectionHeading>Sources</SectionHeading>
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
            <p className="mt-5 font-mono text-[11px] text-ink-3 tabular">
              Last verified {entry.lastVerified}
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}
