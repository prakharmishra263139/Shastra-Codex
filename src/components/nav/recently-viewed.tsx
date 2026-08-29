"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import {
  recentServerSnapshot,
  recentSnapshot,
  recordRecent,
  subscribeRecent,
  type RecentEntry,
} from "@/lib/recent";

export function useRecent(): RecentEntry[] {
  return useSyncExternalStore(subscribeRecent, recentSnapshot, recentServerSnapshot);
}

/**
 * Written on the entry page. Rendering nothing keeps it out of the way of the
 * page it sits on and out of the prerendered HTML.
 */
export function RecordView({ slug, name, href }: RecentEntry) {
  useEffect(() => recordRecent({ slug, name, href }), [slug, name, href]);
  return null;
}

/** Home-page strip. Absent until the reader has been somewhere. */
export function RecentlyViewed() {
  const recent = useRecent();
  if (recent.length === 0) return null;

  return (
    <section className="mt-12 border-t border-rule pt-6">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        Recently viewed
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {recent.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={entry.href}
              className="inline-block rounded-[5px] border border-rule bg-surface px-3.5 py-2 text-[13px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              {entry.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
