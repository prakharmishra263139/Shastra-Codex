import Link from "next/link";
import { TAXONOMY, allEntries, categoryCounts } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { EntryCard } from "@/components/entry-card";
import { RecentlyViewed } from "@/components/nav/recently-viewed";

export default function HomePage() {
  const counts = categoryCounts();
  const total = allEntries.length;

  /** Freshest verification first — the home page should show live content. */
  const recentlyAdded = toBrowseItems(allEntries)
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || a.name.localeCompare(b.name))
    .slice(0, 6);

  return (
    <div className="px-4 sm:px-6">
      <section className="py-16 max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Indian Defence Equipment
        </p>
        <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl leading-[1.03] tracking-[-0.03em]">
          Know the equipment.
          <br />
          Not just the name.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
          Specifications, roles and interview angles for the systems in service with
          the Indian Armed Forces — sourced, dated, and built to compare side by side.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 tabular">
          {total} {total === 1 ? "entry" : "entries"} · {TAXONOMY.length} categories · press
          Ctrl-K to search
        </p>
      </section>

      <RecentlyViewed />

      <section className="pb-16">
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

      <section className="pb-16">
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
