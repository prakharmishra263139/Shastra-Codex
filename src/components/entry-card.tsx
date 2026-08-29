import Link from "next/link";
import type { Entry } from "@/content/schema";
import type { BrowseItem } from "@/lib/browse";
import { formatStatus } from "@/lib/format";
import {
  CardThumbnail,
  CardThumbnailPlaceholder,
} from "@/components/entry-images";

export function StatusPill({ status }: { status: Entry["status"] | string }) {
  const tone =
    status === "in-service"
      ? "bg-accent-dim text-accent"
      : status === "retired"
        ? "bg-surface-2 text-ink-3"
        : "bg-signal-dim text-signal";

  return (
    <span
      className={`whitespace-nowrap rounded-[3px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${tone}`}
    >
      {formatStatus(status)}
    </span>
  );
}

/**
 * The card used everywhere a list of entries appears. The photograph does the
 * recognising and the class label does the placing, so a reader landing on a
 * grid mid-site still knows what they are looking at.
 */
export function EntryCard({ item }: { item: BrowseItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-rule bg-surface shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-lift)]"
    >
      {item.image ? <CardThumbnail image={item.image} /> : <CardThumbnailPlaceholder />}

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {item.className}
          </span>
          <StatusPill status={item.status} />
        </div>

        <h3 className="mt-3 font-display text-[18px] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent">
          {item.name}
        </h3>

        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{item.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 font-mono text-[11px] text-ink-3">
          <span className="truncate">{item.origin.join(" / ")}</span>
          {item.inducted && (
            <>
              <span aria-hidden className="text-rule">
                ·
              </span>
              <span className="tabular">Inducted {item.inducted}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
