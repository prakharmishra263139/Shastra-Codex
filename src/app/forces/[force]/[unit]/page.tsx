import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allUnits, getForce, unitsByForce } from "@/content/units";
import type { Unit } from "@/content/units/schema";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Wrap, Eyebrow, SubHeading } from "@/components/layout/section";
import { PageTransition } from "@/components/layout/page-transition";

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

export default async function UnitPage({
  params,
}: PageProps<"/forces/[force]/[unit]">) {
  const { force, unit: slug } = await params;
  const unit = allUnits.find((u) => u.slug === slug && u.force === force);
  if (!unit) notFound();

  const forceInfo = getForce(unit.force);
  const siblings = unitsByForce(unit.force).filter((u) => u.slug !== unit.slug);

  const facts = [
    ["Type", TYPE_LABEL[unit.type]],
    ["Force", forceInfo?.name ?? unit.force],
    ["Headquarters", unit.hq ?? ""],
    ["Raised", unit.raised ? String(unit.raised) : ""],
  ] as const;

  return (
    <PageTransition>
      <article data-force={unit.force} className="relative isolate pb-8">
        {/* A band of the parent service's colour instead of a photograph — units
            have no imagery, and a stock picture would be worse than none. The
            wash beneath it fades out by the time the body copy starts. */}
        <div aria-hidden className="tone-bg h-1 w-full" />
        <div
          aria-hidden
          className="tone-field pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem]"
        />

        <Wrap className="relative pt-12 sm:pt-14">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Forces", href: "/forces" },
              { label: forceInfo?.name ?? unit.force, href: `/forces/${unit.force}` },
              { label: unit.name },
            ]}
          />

          <header className="mt-8 max-w-[52ch]">
            <Eyebrow toned>
              {forceInfo?.name ?? unit.force} · {TYPE_LABEL[unit.type]}
            </Eyebrow>

            <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              {unit.name}
            </h1>

            {unit.aliases.length > 0 && (
              <p className="mt-3 font-mono text-[12px] text-ink-3">
                Also known as {unit.aliases.join(" · ")}
              </p>
            )}

            <p className="mt-6 text-[17px] leading-[1.7] text-ink-2">{unit.summary}</p>
          </header>

          <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-px overflow-hidden rounded-lg border border-rule bg-rule">
            {facts
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label} className="bg-surface p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {label}
                  </dt>
                  <dd className="mt-2 font-display text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                    {value}
                  </dd>
                </div>
              ))}
          </dl>
        </Wrap>

        <Wrap className="mt-14">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16">
            <div className="flex min-w-0 flex-col gap-14">
              <section>
                <SubHeading>Role</SubHeading>
                <p className="mt-5 max-w-[68ch] text-[16.5px] leading-[1.75] text-ink-2">
                  {unit.role}
                </p>
              </section>

              <section>
                <SubHeading>Overview</SubHeading>
                <div className="mt-5 flex max-w-[68ch] flex-col gap-4">
                  {unit.description.map((para, i) => (
                    <p key={i} className="text-[16.5px] leading-[1.75] text-ink-2">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              {unit.hooks.length > 0 && (
                <section>
                  <SubHeading>Memory hooks</SubHeading>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {unit.hooks.map((hook, i) => (
                      <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed">
                        <span className="mt-0.5 text-tone" aria-hidden>
                          ▸
                        </span>
                        <span>{hook}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="flex min-w-0 flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
              {siblings.length > 0 && forceInfo && (
                <section>
                  <SubHeading>Elsewhere in the {forceInfo.shortName}</SubHeading>
                  <ul className="mt-4 flex flex-col gap-2">
                    {siblings.slice(0, 6).map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/forces/${other.force}/${other.slug}`}
                          className="group block rounded-lg border border-rule bg-surface px-4 py-3 transition-colors duration-200 ease-soft hover:border-tone"
                        >
                          <span className="font-display text-[14.5px] font-semibold transition-colors group-hover:text-tone">
                            {other.name}
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-snug text-ink-3">
                            {TYPE_LABEL[other.type]}
                            {other.hq ? ` · ${other.hq}` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {siblings.length > 6 && (
                    <Link
                      href={`/forces/${unit.force}`}
                      className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-tone"
                    >
                      All {forceInfo.unitLabel.toLowerCase()} →
                    </Link>
                  )}
                </section>
              )}

              <section>
                <SubHeading>Sources</SubHeading>
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
                <p className="mt-5 font-mono text-[11px] tabular text-ink-3">
                  Last verified {unit.lastVerified}
                </p>
              </section>
            </aside>
          </div>
        </Wrap>
      </article>
    </PageTransition>
  );
}
