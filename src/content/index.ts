import { EntrySchema, type Entry } from "./schema";
import { RAW_ENTRIES } from "./entries/_registry";
import { TAXONOMY, getCategory, type Category, type CategorySlug } from "./taxonomy";

/**
 * Entries are parsed once, here, at module load. Everything downstream receives
 * fully validated objects with defaults applied, so no component has to guard
 * against a missing field.
 *
 * A malformed entry throws and fails the build. That is intentional — a broken
 * spec is worse than a missing page.
 */
function parseAll(): Entry[] {
  return RAW_ENTRIES.map((raw) => {
    const result = EntrySchema.safeParse(raw);
    if (!result.success) {
      const slug = (raw as { slug?: string }).slug ?? "<unknown slug>";
      const issues = result.error.issues
        .map((i) => `    ${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("\n");
      throw new Error(
        `Invalid entry "${slug}":\n${issues}\n\nRun \`npm run validate\` to see every problem at once.`,
      );
    }
    return result.data;
  });
}

export const allEntries: Entry[] = parseAll().sort((a, b) => a.name.localeCompare(b.name));

const bySlug = new Map(allEntries.map((e) => [e.slug, e]));

export function getEntry(slug: string): Entry | undefined {
  return bySlug.get(slug);
}

export function entriesByCategory(category: string): Entry[] {
  return allEntries.filter((e) => e.category === category);
}

export function entriesByClass(category: string, klass: string): Entry[] {
  return allEntries.filter((e) => e.category === category && e.class === klass);
}

/** How many entries sit in each class — drives the counts shown in navigation. */
export function classCounts(category: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of entriesByCategory(category)) {
    counts[e.class] = (counts[e.class] ?? 0) + 1;
  }
  return counts;
}

export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of allEntries) {
    counts[e.category] = (counts[e.category] ?? 0) + 1;
  }
  return counts;
}

/**
 * Comparison candidates: siblings in the same class, plus anything the entry
 * explicitly declares it gets confused with. Only same-category entries are
 * offered, because cross-category comparison produces a table of blanks.
 */
export function compareCandidates(entry: Entry): Entry[] {
  const picked = new Map<string, Entry>();
  for (const slug of entry.ssb.confusedWith) {
    const found = bySlug.get(slug);
    if (found && found.category === entry.category) picked.set(slug, found);
  }
  for (const sibling of entriesByClass(entry.category, entry.class)) {
    if (sibling.slug !== entry.slug) picked.set(sibling.slug, sibling);
  }
  return [...picked.values()];
}

export interface NavClass {
  slug: string;
  name: string;
  count: number;
}

export interface NavCategory {
  slug: string;
  name: string;
  count: number;
  classes: NavClass[];
}

/**
 * The whole taxonomy with counts, flattened to plain objects so the sidebar —
 * a client component, because it highlights the active route — can receive it
 * as props without pulling the content layer into the browser bundle.
 */
export function navTree(): NavCategory[] {
  const categories = categoryCounts();

  return TAXONOMY.map((category) => {
    const classes = classCounts(category.slug);
    return {
      slug: category.slug,
      name: category.name,
      count: categories[category.slug] ?? 0,
      classes: category.classes.map((k) => ({
        slug: k.slug,
        name: k.name,
        count: classes[k.slug] ?? 0,
      })),
    };
  });
}

/** Categories that actually have content — used to avoid linking to empty shelves. */
export function populatedCategories(): Category[] {
  const counts = categoryCounts();
  return TAXONOMY.filter((c) => (counts[c.slug] ?? 0) > 0);
}

export { TAXONOMY, getCategory };
export type { Entry, Category, CategorySlug };
