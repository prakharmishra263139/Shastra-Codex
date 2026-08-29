import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAXONOMY, getCategory } from "@/content/taxonomy";
import { classCounts, entriesByCategory } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntryBrowser } from "@/components/browse/entry-browser";

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

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const counts = classCounts(found.slug);
  const items = toBrowseItems(entriesByCategory(found.slug));

  return (
    <div className="px-4 py-10 sm:px-6">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Browse", href: "/browse" }, { label: found.name }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.025em]">
          {found.name}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{found.blurb}</p>
      </header>

      <section className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          Classes
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {found.classes.map((klass) => {
            const count = counts[klass.slug] ?? 0;
            const empty = count === 0;

            return (
              <Link
                key={klass.slug}
                href={`/${found.slug}/${klass.slug}`}
                className={`group flex flex-col gap-2 rounded-md border p-5 transition-colors ${
                  empty
                    ? "border-rule-soft"
                    : "border-rule bg-surface hover:border-accent"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={`font-display font-semibold text-[15.5px] tracking-tight transition-colors ${
                      empty ? "text-ink-3" : "group-hover:text-accent"
                    }`}
                  >
                    {klass.name}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-3 tabular">{count}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-ink-2">{klass.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {items.length > 0 && (
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
            All {found.name.toLowerCase()}
          </h2>
          <div className="mt-6">
            <EntryBrowser items={items} />
          </div>
        </section>
      )}
    </div>
  );
}
