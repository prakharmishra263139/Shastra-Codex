import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TAXONOMY, getCategory, getClass } from "@/content/taxonomy";
import { entriesByClass } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Wrap, Eyebrow } from "@/components/layout/section";
import { PhotoMasthead } from "@/components/layout/masthead";
import { EntryBrowser } from "@/components/browse/entry-browser";

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

  const items = toBrowseItems(entriesByClass(category, klass));

  const trail = [
    { label: "Home", href: "/" },
    { label: "Browse", href: "/browse" },
    { label: cat.name, href: `/${cat.slug}` },
    { label: found.name },
  ];

  const heading = (
    <>
      <Eyebrow>{cat.name}</Eyebrow>
      <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
        {found.name}
      </h1>
      <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-ink-2">
        {found.blurb}
      </p>
      {items.length > 0 && (
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] tabular text-ink-3">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </p>
      )}
    </>
  );

  return (
    <>
      {/* Same rule as a category: a photograph only where we hold an honest
          one of the class in Indian service. */}
      {found.image ? (
        <PhotoMasthead image={found.image}>
          <Breadcrumbs trail={trail} />
          <div className="mt-6">{heading}</div>
        </PhotoMasthead>
      ) : null}

      <Wrap wide className={found.image ? "pb-16 pt-12" : "py-12 sm:py-16"}>
        {!found.image && (
          <>
            <Breadcrumbs trail={trail} />
            <header className="mt-8 border-b border-rule pb-10">{heading}</header>
          </>
        )}

        <section className={found.image ? "" : "mt-10"}>
          {items.length > 0 ? (
            <EntryBrowser
              items={items}
              facetKeys={["service", "status", "origin", "manufacturer", "decade"]}
            />
          ) : (
            <div className="rounded-lg border border-dashed border-rule p-12 text-center">
              <p className="font-display text-[17px] font-semibold">Nothing here yet</p>
              <p className="mt-2 text-[14px] text-ink-2">
                No entries have been written for {found.name.toLowerCase()} so far.
              </p>
              <p className="mt-6 inline-block rounded-[4px] border border-rule bg-surface px-3 py-2 font-mono text-[12px] text-ink-3">
                npm run new -- --category {cat.slug} --class {found.slug}
              </p>
            </div>
          )}
        </section>
      </Wrap>
    </>
  );
}
