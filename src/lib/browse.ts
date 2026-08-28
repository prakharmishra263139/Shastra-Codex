import type { Entry } from "@/content/schema";
import { getCategory, getClass } from "@/content/taxonomy";
import { formatService, formatStatus } from "@/lib/format";

/**
 * The projection of an entry that browse surfaces need: cards, filters and
 * search hits. Entries carry description paragraphs, sources and the SSB block,
 * none of which a list view uses — shipping the whole thing to the client would
 * multiply the page payload for no gain.
 *
 * Everything here is a plain scalar or array of scalars, so it crosses the
 * server/client boundary untouched.
 */
export interface BrowseItem {
  slug: string;
  name: string;
  aliases: string[];
  summary: string;
  category: string;
  categoryName: string;
  class: string;
  className: string;
  origin: string[];
  developer: string[];
  manufacturer: string[];
  operators: string[];
  tags: string[];
  status: string;
  inducted?: number;
  /** Induction decade as a label, e.g. "2010s" — the filter operates on this. */
  decade?: string;
  lastVerified: string;
  image?: { src: string; alt: string };
  href: string;
}

export function toBrowseItem(entry: Entry): BrowseItem {
  const [image] = entry.images;
  const categoryName = getCategory(entry.category)?.name ?? entry.category;
  const className = getClass(entry.category, entry.class)?.name ?? entry.class;

  return {
    slug: entry.slug,
    name: entry.name,
    aliases: entry.aliases,
    summary: entry.summary,
    category: entry.category,
    categoryName,
    class: entry.class,
    className,
    origin: entry.origin,
    developer: entry.developer,
    manufacturer: entry.manufacturer,
    operators: entry.operators,
    tags: entry.tags,
    status: entry.status,
    inducted: entry.inducted,
    decade: entry.inducted ? `${Math.floor(entry.inducted / 10) * 10}s` : undefined,
    lastVerified: entry.lastVerified,
    image: image ? { src: image.src, alt: image.alt } : undefined,
    href: `/${entry.category}/${entry.class}/${entry.slug}`,
  };
}

export function toBrowseItems(entries: Entry[]): BrowseItem[] {
  return entries.map(toBrowseItem);
}

// ---------------------------------------------------------------------------
// Facets
// ---------------------------------------------------------------------------

export const FACET_KEYS = [
  "service",
  "status",
  "origin",
  "manufacturer",
  "decade",
  "class",
] as const;

export type FacetKey = (typeof FACET_KEYS)[number];

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface Facet {
  key: FacetKey;
  label: string;
  options: FacetOption[];
}

const FACET_LABELS: Record<FacetKey, string> = {
  service: "Service",
  status: "Status",
  origin: "Origin",
  manufacturer: "Manufacturer",
  decade: "Inducted",
  class: "Class",
};

/** Which values of an item belong to a facet. One item can sit in several. */
function valuesFor(item: BrowseItem, key: FacetKey): string[] {
  switch (key) {
    case "service":
      return item.operators;
    case "status":
      return [item.status];
    case "origin":
      return item.origin;
    case "manufacturer":
      return item.manufacturer;
    case "decade":
      return item.decade ? [item.decade] : [];
    case "class":
      return [item.class];
  }
}

function labelFor(key: FacetKey, value: string, items: BrowseItem[]): string {
  if (key === "service") return formatService(value);
  if (key === "status") return formatStatus(value);
  if (key === "class") return items.find((i) => i.class === value)?.className ?? value;
  return value;
}

/**
 * Options are derived from the entries actually present, never hardcoded — a
 * fixed list drifts from the content the moment a new manufacturer appears.
 */
export function facetsFor(items: BrowseItem[], keys: readonly FacetKey[] = FACET_KEYS): Facet[] {
  return keys
    .map((key) => {
      const counts = new Map<string, number>();
      for (const item of items) {
        for (const value of valuesFor(item, key)) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }

      const options = [...counts.entries()]
        .map(([value, count]) => ({ value, label: labelFor(key, value, items), count }))
        .sort((a, b) =>
          key === "decade" ? a.value.localeCompare(b.value) : b.count - a.count || a.label.localeCompare(b.label),
        );

      return { key, label: FACET_LABELS[key], options };
    })
    .filter((facet) => facet.options.length > 1);
}

// ---------------------------------------------------------------------------
// Filtering, sorting, pagination
// ---------------------------------------------------------------------------

export type Filters = Partial<Record<FacetKey, string[]>>;

/** AND across facets, OR within one — the behaviour every shopping filter has. */
export function applyFilters(items: BrowseItem[], filters: Filters): BrowseItem[] {
  const active = FACET_KEYS.map((key) => [key, filters[key] ?? []] as const).filter(
    ([, selected]) => selected.length > 0,
  );
  if (active.length === 0) return items;

  return items.filter((item) =>
    active.every(([key, selected]) => valuesFor(item, key).some((v) => selected.includes(v))),
  );
}

export const SORTS = [
  { value: "name", label: "Name A–Z" },
  { value: "-name", label: "Name Z–A" },
  { value: "-inducted", label: "Newest inducted" },
  { value: "inducted", label: "Oldest inducted" },
  { value: "-verified", label: "Recently verified" },
] as const;

export type Sort = (typeof SORTS)[number]["value"];

export const DEFAULT_SORT: Sort = "name";

export function isSort(value: string | null | undefined): value is Sort {
  return SORTS.some((s) => s.value === value);
}

export function sortItems(items: BrowseItem[], sort: Sort): BrowseItem[] {
  const sorted = [...items];
  const byName = (a: BrowseItem, b: BrowseItem) => a.name.localeCompare(b.name);

  switch (sort) {
    case "name":
      return sorted.sort(byName);
    case "-name":
      return sorted.sort((a, b) => byName(b, a));
    case "inducted":
      // Undated entries sort last either way — an unknown year is not a zero.
      return sorted.sort((a, b) => (a.inducted ?? Infinity) - (b.inducted ?? Infinity) || byName(a, b));
    case "-inducted":
      return sorted.sort((a, b) => (b.inducted ?? -Infinity) - (a.inducted ?? -Infinity) || byName(a, b));
    case "-verified":
      return sorted.sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || byName(a, b));
  }
}

export const PAGE_SIZE = 24;

export interface Page {
  items: BrowseItem[];
  page: number;
  pageCount: number;
}

export function paginate(items: BrowseItem[], page: number): Page {
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * PAGE_SIZE;
  return { items: items.slice(start, start + PAGE_SIZE), page: current, pageCount };
}
