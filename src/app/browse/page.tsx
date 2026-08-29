import Link from "next/link";
import type { Metadata } from "next";
import { TAXONOMY, allEntries, categoryCounts } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || a.name.localeCompare(b.name))
    .slice(0, 6);

  return (
    <div className="px-4 py-10 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Browse" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.025em]">
          Browse the codex
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
          {total} {total === 1 ? "entry" : "entries"} across {TAXONOMY.length} equipment
          categories. Looking for the people who operate this equipment instead?{" "}
          <Link href="/forces" className="text-accent hover:underline underline-offset-4">
            Browse by force →
          </Link>
        </p>
      </header>

      <RecentlyViewed />

      <section className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          Browse by category
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TAXONOMY.map((category) => {
            const count = counts[category.slug] ?? 0;
            const empty = count === 0;

            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                aria-disabled={empty}
                className={`group flex flex-col gap-2 rounded-md border p-5 transition-colors ${
                  empty
                    ? "border-rule-soft bg-transparent"
                    : "border-rule bg-surface hover:border-accent"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={`font-display font-semibold text-[16px] tracking-tight transition-colors ${
                      empty ? "text-ink-3" : "group-hover:text-accent"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-3 tabular">
                    {count}
                  </span>
                </div>
                <p className="text-[13.5px] leading-relaxed text-ink-2">
                  {category.blurb}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3 mt-1">
                  {category.classes.length} classes
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          Recently added
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyAdded.map((item) => (
            <EntryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
