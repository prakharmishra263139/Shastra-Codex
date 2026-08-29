import Link from "next/link";
import { TAXONOMY } from "@/content/taxonomy";
import { FORCES } from "@/content/forces";
import { Wrap } from "@/components/layout/section";

/**
 * The footer carries the sitemap the sidebar used to carry: every category and
 * every service, one click from the bottom of any page. It also carries the
 * sourcing statement, which belongs on every page rather than tucked into an
 * about page nobody opens.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-ground-2">
      <Wrap wide className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.6fr]">
          <div className="max-w-[38ch]">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-4 w-4">
                <path
                  d="M8 1.2 14 4v4.6c0 3.2-2.4 5.6-6 6.9-3.6-1.3-6-3.7-6-6.9V4l6-2.8Z"
                  stroke="var(--accent)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path d="M8 5.2v5.4M5.6 7.6h4.8" stroke="var(--accent)" strokeWidth="1.3" />
              </svg>
              <span className="font-display text-[15px] font-bold tracking-[-0.01em]">
                Shastra Codex
              </span>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-2">
              A browsable, comparable reference of Indian defence equipment and order
              of battle, written for SSB aspirants.
            </p>
          </div>

          <nav aria-label="Services">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              The services
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FORCES.map((force) => (
                <li key={force.slug}>
                  <Link
                    href={`/forces/${force.slug}`}
                    className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                  >
                    {force.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/forces"
                  className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                >
                  All arms &amp; commands
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Equipment categories">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Equipment
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {TAXONOMY.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-[62ch] font-mono text-[11px] leading-relaxed text-ink-3">
            Compiled from publicly available sources. Every figure carries a confidence
            marker and a verification date.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Not an official publication
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
