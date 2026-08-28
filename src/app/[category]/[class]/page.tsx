import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAXONOMY, getCategory, getClass } from "@/content/taxonomy";
import { entriesByClass } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntryCard } from "@/components/entry-card";

export function generateStaticParams() {
  return TAXONOMY.flatMap((c) =>
    c.classes.map((k) => ({ category: c.slug, class: k.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[class]">): Promise<Metadata> {
  const { category, class: klass } = await params;
  const found = getClass(category, klass);
  if (!found) return {};
  return { title: found.name, description: found.blurb };
}

export default async function ClassPage({ params }: PageProps<"/[category]/[class]">) {
  const { category, class: klass } = await params;
  const cat = getCategory(category);
  const found = getClass(category, klass);
  if (!cat || !found) notFound();

  const entries = entriesByClass(category, klass);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        trail={[
          { label: "Codex", href: "/" },
          { label: cat.name, href: `/${cat.slug}` },
          { label: found.name },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.025em]">
          {found.name}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{found.blurb}</p>
      </header>

      <section className="mt-12">
        {entries.length > 0 ? (
          <>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule tabular">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <EntryCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-md border border-dashed border-rule p-10 text-center">
            <p className="font-display font-semibold text-[16px]">Nothing here yet</p>
            <p className="mt-2 text-[14px] text-ink-2">
              No entries have been written for {found.name.toLowerCase()} so far.
            </p>
            <p className="mt-4 font-mono text-[12px] text-ink-3">
              npm run new -- --category {cat.slug} --class {found.slug}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
