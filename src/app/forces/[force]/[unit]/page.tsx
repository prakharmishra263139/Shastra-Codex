import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allUnits, getForce } from "@/content/units";
import type { Unit } from "@/content/units/schema";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function generateStaticParams() {
  return allUnits.map((u) => ({ force: u.force, unit: u.slug }));
}

const TYPE_LABEL: Record<Unit["type"], string> = {
  corps: "Corps",
  regiment: "Regiment",
  command: "Command",
};

export async function generateMetadata({
  params,
}: PageProps<"/forces/[force]/[unit]">): Promise<Metadata> {
  const { unit: slug } = await params;
  const unit = allUnits.find((u) => u.slug === slug);
  if (!unit) return {};
  return { title: unit.name, description: unit.summary };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pb-3 border-b border-rule">
      {children}
    </h2>
  );
}

export default async function UnitPage({
  params,
}: PageProps<"/forces/[force]/[unit]">) {
  const { force, unit: slug } = await params;
  const unit = allUnits.find((u) => u.slug === slug && u.force === force);
  if (!unit) notFound();

  const forceInfo = getForce(unit.force);

  const facts = [
    ["Type", TYPE_LABEL[unit.type]],
    ["Force", forceInfo?.name ?? unit.force],
    ["Headquarters", unit.hq ?? ""],
    ["Raised", unit.raised ? String(unit.raised) : ""],
    ["Role", unit.role],
  ] as const;

  return (
    <article className="max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Forces", href: "/forces" },
          { label: forceInfo?.name ?? unit.force, href: `/forces/${unit.force}` },
          { label: unit.name },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-[3px] bg-surface-2 text-ink-2">
          {TYPE_LABEL[unit.type]}
        </span>

        <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-[-0.03em] leading-[1.03]">
          {unit.name}
        </h1>

        {unit.aliases.length > 0 && (
          <p className="mt-2.5 font-mono text-[12px] text-ink-3">
            Also known as {unit.aliases.join(" · ")}
          </p>
        )}

        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">{unit.summary}</p>
      </header>

      <section className="mt-10">
        <div className="grid gap-px bg-rule border border-rule rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {facts
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="bg-surface p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                  {label}
                </p>
                <p className="mt-2 font-display font-semibold text-[18px] tracking-tight leading-tight">
                  {value}
                </p>
              </div>
            ))}
        </div>
      </section>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16">
        <div className="flex flex-col gap-14 min-w-0">
          <section>
            <SectionHeading>Overview</SectionHeading>
            <div className="mt-5 flex flex-col gap-4 max-w-[68ch]">
              {unit.description.map((para, i) => (
                <p key={i} className="text-[16px] leading-[1.7] text-ink-2">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {unit.hooks.length > 0 && (
            <section>
              <SectionHeading>Memory hooks</SectionHeading>
              <ul className="mt-5 flex flex-col gap-2">
                {unit.hooks.map((hook, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="text-accent mt-0.5" aria-hidden>
                      ▸
                    </span>
                    <span>{hook}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-10 min-w-0">
          <section>
            <SectionHeading>Sources</SectionHeading>
            <ol className="mt-4 flex flex-col gap-3 text-[13px]">
              {unit.sources.map((source, i) => (
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
              Last verified {unit.lastVerified}
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}
