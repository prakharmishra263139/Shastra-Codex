import Link from "next/link";
import type { Entry } from "@/content/schema";
import type { BrowseItem } from "@/lib/browse";
import { formatStatus } from "@/lib/format";
import { CardThumbnail } from "@/components/entry-images";

export function StatusPill({ status }: { status: Entry["status"] | string }) {
  const tone =
    status === "in-service"
      ? "bg-accent-dim text-accent"
      : status === "retired"
        ? "bg-surface-2 text-ink-3"
        : "bg-signal-dim text-signal";

  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-[3px] whitespace-nowrap ${tone}`}
    >
      {formatStatus(status)}
    </span>
  );
}

export function EntryCard({ item }: { item: BrowseItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col gap-2.5 rounded-md border border-rule bg-surface p-5 transition-colors hover:border-accent"
    >
      {item.image && <CardThumbnail image={item.image} />}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold text-[17px] leading-tight tracking-tight group-hover:text-accent transition-colors">
          {item.name}
        </h3>
        <StatusPill status={item.status} />
      </div>

      <p className="text-[13.5px] leading-relaxed text-ink-2">{item.summary}</p>

      <div className="mt-auto pt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-ink-3">
        <span>{item.origin.join(" / ")}</span>
        {item.inducted && <span className="tabular">Inducted {item.inducted}</span>}
      </div>
    </Link>
  );
}
