import Link from "next/link";

/**
 * The page skeleton. With the sidebar gone every surface is full-width, so the
 * measure has to be re-established somewhere — it is established here, once,
 * rather than in a `max-w` on every page.
 */

/** The one content column width on the site. */
export function Wrap({
  children,
  className = "",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Wide is for grids of cards; the default is for reading. */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${wide ? "max-w-[1400px]" : "max-w-[1180px]"} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * The tri-service hairline: olive, sky blue and gold in equal thirds.
 *
 * The site's one piece of pure ornament, and rationed accordingly — the foot of
 * the hero and the top of the footer. Anywhere else and it stops reading as a
 * signature.
 */
export function ServiceRule({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`service-rule block h-px w-full ${className}`} />;
}

/** The small mono label that opens almost every block on the site. */
export function Eyebrow({
  children,
  index,
  className = "",
  toned = false,
}: {
  children: React.ReactNode;
  /** An optional "01" style counter, shown before the label. */
  index?: string;
  className?: string;
  /** Colour it with the surrounding section's `--tone` rather than ink. */
  toned?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] ${
        toned ? "text-tone" : "text-ink-3"
      } ${className}`}
    >
      {index && (
        <>
          <span className="tabular opacity-70">{index}</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

/**
 * A full section opener: eyebrow, title, optional lede and an optional link
 * pushed to the far edge. The rule underneath is what gives the page its
 * horizontal rhythm, and a short length of it picks up the section tone so a
 * toned band is identifiable from the heading alone.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lede,
  action,
  toned = false,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: { label: string; href: string };
  toned?: boolean;
}) {
  return (
    <div className="reveal relative border-b border-rule pb-6">
      {toned && (
        <span
          aria-hidden
          className="absolute -bottom-px left-0 h-px w-24 bg-tone"
        />
      )}

      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="min-w-0 max-w-[46ch]">
          <Eyebrow index={index} toned={toned}>
            {eyebrow}
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
            {title}
          </h2>
          {lede && (
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{lede}</p>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className="group shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors duration-200 ease-soft hover:text-accent"
          >
            {action.label}
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform duration-200 ease-soft group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

/** The quieter heading used inside an article, above a block of detail. */
export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-rule pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
      {children}
    </h2>
  );
}

/**
 * Blank cells completing the final row of a hairline grid.
 *
 * The hairline grids on this site draw their rules by showing a `--rule`
 * background through a one-pixel gap. That is a nice effect until the last row
 * is short, at which point the leftover area reads as one big pale block.
 * These fillers plug it, at each of the column counts the grids use: one at
 * base, two at `sm`, three at `lg`.
 */
export function GridFillers({ count }: { count: number }) {
  const atTwo = (2 - (count % 2)) % 2;
  const atThree = (3 - (count % 3)) % 3;

  return (
    <>
      {Array.from({ length: Math.max(atTwo, atThree) }, (_, i) => (
        <div
          key={i}
          aria-hidden
          className={`hidden bg-surface ${i < atTwo ? "sm:block" : "sm:hidden"} ${
            i < atThree ? "lg:block" : "lg:hidden"
          }`}
        />
      ))}
    </>
  );
}
