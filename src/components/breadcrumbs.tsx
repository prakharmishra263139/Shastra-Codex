import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
        {trail.map((crumb, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <li aria-hidden className="text-rule">
                /
              </li>
            )}
            <li>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink-2">{crumb.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
