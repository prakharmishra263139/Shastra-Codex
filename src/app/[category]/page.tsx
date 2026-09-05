import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAXONOMY, getCategory } from "@/content/taxonomy";
import { classCounts, entriesByCategory } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Wrap,
  Eyebrow,
  SectionHeader,
  GridFillers,
} from "@/components/layout/section";
import { PhotoMasthead } from "@/components/layout/masthead";
import { EntryBrowser } from "@/components/browse/entry-browser";
import { PageTransition } from "@/components/layout/page-transition";

export function generateStaticParams() {
  return TAXONOMY.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) return {};
  return { title: found.name, description: found.blurb };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const counts = classCounts(found.slug);
  const items = toBrowseItems(entriesByCategory(found.slug));
  const position = TAXONOMY.findIndex((c) => c.slug === found.slug) + 1;

  const trail = [
    { label: "Home", href: "/" },
    { label: "Browse", href: "/browse" },
    { label: found.name },
  ];

  const figures = (
    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
      <div>
        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
          Entries
        </dt>
        <dd className="mt-1 font-display text-2xl font-bold tabular tracking-[-0.03em]">
          {items.length}
        </dd>
      </div>
      <div>
        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
          Classes
        </dt>
        <dd className="mt-1 font-display text-2xl font-bold tabular tracking-[-0.03em]">
          {found.classes.length}
        </dd>
      </div>
    </dl>
  );

  const heading = (
    <>
      <Eyebrow index={String(position).padStart(2, "0")}>
        Equipment category
      </Eyebrow>
      <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
        {found.name}
      </h1>
      <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-ink-2">
        {found.blurb}
      </p>
    </>
  );

  return (
    <PageTransition>
      {/* A category only gets a masthead where we hold a photograph that
          honestly shows it; the rest open on type alone. */}
      {found.image ? (
        <PhotoMasthead image={found.image}>
          <Breadcrumbs trail={trail} />
          <div className="mt-6">{heading}</div>
          {figures}
        </PhotoMasthead>
      ) : null}

      <Wrap wide className={found.image ? "pb-16 pt-12" : "py-12 sm:py-16"}>
        {!found.image && (
          <>
            <Breadcrumbs trail={trail} />
            <header className="mt-8 border-b border-rule pb-10">
              {heading}
              {figures}
            </header>
          </>
        )}

        <section className={found.image ? "" : "mt-12"}>
          <SectionHeader
            eyebrow="Within this category"
            title="Classes"
            lede="A class is the level a board actually asks about — not the category, and not the individual system."
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {found.classes.map((klass) => {
              const count = counts[klass.slug] ?? 0;
              const empty = count === 0;

              return (
                <Link
                  key={klass.slug}
                  href={`/${found.slug}/${klass.slug}`}
                  className="group reveal relative flex min-h-[9.5rem] flex-col bg-surface p-6 transition-colors duration-200 ease-soft hover:bg-surface-2"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className={`font-display text-[16.5px] font-semibold leading-tight tracking-[-0.02em] transition-colors ${
                        empty ? "text-ink-2" : "group-hover:text-accent"
                      }`}
                    >
                      {klass.name}
                    </h3>
                    <span
                      className={`font-mono text-[11px] tabular ${
                        empty ? "text-ink-3" : "text-accent"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                    {klass.blurb}
                  </p>

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-soft group-hover:scale-x-100"
                  />
                </Link>
              );
            })}
            <GridFillers count={found.classes.length} />
          </div>
        </section>

        {items.length > 0 && (
          <section className="mt-16">
            <SectionHeader
              eyebrow="Inventory"
              title={`All ${found.name.toLowerCase()}`}
              lede="Filter by service, status, origin, manufacturer or decade — every combination is a shareable link."
            />
            <div className="mt-8">
              <EntryBrowser items={items} />
            </div>
          </section>
        )}
      </Wrap>
    </PageTransition>
  );
}
