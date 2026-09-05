import Link from "next/link";
import type { Metadata } from "next";
import { TAXONOMY, allEntries, categoryCounts } from "@/content";
import { FORCES } from "@/content/forces";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Wrap,
  Eyebrow,
  SectionHeader,
  ServiceRule,
  GridFillers,
} from "@/components/layout/section";
import { PageTransition } from "@/components/layout/page-transition";
import { EntryCard } from "@/components/entry-card";
import { RecentlyViewed } from "@/components/nav/recently-viewed";

export const metadata: Metadata = {
  title: "Browse the codex",
  description: "Every entry, by equipment category.",
};

export default function BrowsePage() {
  const counts = categoryCounts();
  const total = allEntries.length;

  const items = toBrowseItems(allEntries);
  const recentlyAdded = [...items]
    .sort(
      (a, b) =>
        b.lastVerified.localeCompare(a.lastVerified) || a.name.localeCompare(b.name),
    )
    .slice(0, 6);

  return (
    <PageTransition>
      <Wrap wide className="py-12 sm:py-16">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Browse" }]} />

        <header className="mt-8 pb-10">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-[46ch]">
              <Eyebrow>The codex</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                Browse the codex
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
                {total} {total === 1 ? "entry" : "entries"} across {TAXONOMY.length}{" "}
                equipment categories, each split into the classes a board would name.
              </p>
            </div>

            {/* The other axis, offered rather than assumed. */}
            <nav aria-label="Browse by force" className="shrink-0">
              <Eyebrow>Or browse by force</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FORCES.map((force) => (
                  <li key={force.slug}>
                    <Link
                      href={`/forces/${force.slug}`}
                      data-force={force.slug}
                      className="inline-flex items-center gap-2.5 rounded-[5px] border border-rule bg-surface px-3.5 py-2 text-[13px] text-ink-2 transition-[translate,border-color,color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-tone hover:text-ink"
                    >
                      <span aria-hidden className="tone-bg h-3.5 w-[3px] rounded-full" />
                      {force.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <ServiceRule />

        <RecentlyViewed />

        <section className="mt-14">
          <SectionHeader
            index="01"
            eyebrow="Taxonomy"
            title="Browse by category"
            lede="Counts are live. A category showing zero has been mapped but not yet written."
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {TAXONOMY.map((category, i) => {
              const count = counts[category.slug] ?? 0;
              const empty = count === 0;

              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group reveal relative flex min-h-[13rem] flex-col bg-surface p-6 transition-colors duration-200 ease-soft hover:bg-surface-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] tabular text-ink-3">
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

                  <ul className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                    {category.classes.slice(0, 3).map((klass) => (
                      <li key={klass.slug} className="after:ml-2 after:content-['·'] last:after:content-['']">
                        {klass.name}
                      </li>
                    ))}
                    {category.classes.length > 3 && (
                      <li>+{category.classes.length - 3} more</li>
                    )}
                  </ul>

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-soft group-hover:scale-x-100"
                  />
                </Link>
              );
            })}
            <GridFillers count={TAXONOMY.length} />
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader
            index="02"
            eyebrow="Latest"
            title="Most recently verified"
            lede="Sorted by the date each entry's figures were last checked."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyAdded.map((item) => (
              <div key={item.slug} className="reveal">
                <EntryCard item={item} />
              </div>
            ))}
          </div>
        </section>
      </Wrap>
    </PageTransition>
  );
}
