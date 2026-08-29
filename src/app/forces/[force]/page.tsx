import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FORCES, getForce, unitsByForce } from "@/content/units";
import { allEntries } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
    <div className="px-4 py-10 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Forces", href: "/forces" },
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
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
          {found.unitLabel}
        </h2>

        {units.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <UnitCard key={unit.slug} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-md border border-dashed border-rule p-10 text-center">
            <p className="font-display font-semibold text-[16px]">Nothing here yet</p>
            <p className="mt-2 text-[14px] text-ink-2">
              No {found.unitLabel.toLowerCase()} have been written up for the {found.name}{" "}
              so far.
            </p>
          </div>
        )}
      </section>

      {equipment.length > 0 && (
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-4 border-b border-rule">
            Equipment operated by the {found.name}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
              <EntryCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
