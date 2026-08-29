/**
 * Content validator. Reports every problem across every entry and every unit
 * in one pass, rather than failing on the first one.
 *
 * Errors block the build. Warnings do not, but they are the things that quietly
 * rot a reference site: stale verification dates, dangling cross-references,
 * missing images.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { EntrySchema } from "../src/content/schema";
import { RAW_ENTRIES } from "../src/content/entries/_registry";
import { CLASS_PATHS, getCategory } from "../src/content/taxonomy";
import { UnitSchema } from "../src/content/units/schema";
import { RAW_UNITS } from "../src/content/units/_registry";
import { FORCES } from "../src/content/forces";

const errors: string[] = [];
const warnings: string[] = [];

const STALE_AFTER_DAYS = 365;
const FORCE_SLUGS = new Set(FORCES.map((f) => f.slug));

// ---------------------------------------------------------------------------
// Equipment entries
// ---------------------------------------------------------------------------

const entryFiles = readdirSync(join(process.cwd(), "src", "content", "entries"))
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const seenEntrySlugs = new Map<string, number>();
const validEntrySlugs = new Set<string>();

RAW_ENTRIES.forEach((raw, i) => {
  const label = (raw as { slug?: string }).slug ?? entryFiles[i] ?? `#${i}`;
  const result = EntrySchema.safeParse(raw);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`entry ${label} → ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return;
  }

  const e = result.data;
  validEntrySlugs.add(e.slug);

  // The filename is the URL segment, so a mismatch means a broken link waiting to happen.
  if (entryFiles[i] && entryFiles[i] !== e.slug) {
    errors.push(`entry ${e.slug} → filename is "${entryFiles[i]}.ts" but slug is "${e.slug}". They must match.`);
  }

  seenEntrySlugs.set(e.slug, (seenEntrySlugs.get(e.slug) ?? 0) + 1);

  // Category and class must exist in the taxonomy.
  if (!getCategory(e.category)) {
    errors.push(`entry ${e.slug} → unknown category "${e.category}".`);
  } else if (!CLASS_PATHS.has(`${e.category}/${e.class}`)) {
    errors.push(`entry ${e.slug} → "${e.class}" is not a class of "${e.category}".`);
  }

  // Freshness.
  const ageDays = (Date.now() - new Date(e.lastVerified).getTime()) / 86_400_000;
  if (ageDays > STALE_AFTER_DAYS) {
    warnings.push(`entry ${e.slug} → last verified ${Math.round(ageDays)} days ago. Re-check the figures.`);
  }

  if (e.images.length === 0) {
    warnings.push(`entry ${e.slug} → no image yet.`);
  }

  if (!e.ssb.likelyAsked.length) {
    warnings.push(`entry ${e.slug} → no likely interview questions written.`);
  }

  // Scaffolded stubs pass the schema, so catch them by their placeholder text.
  const todos = JSON.stringify(e).match(/TODO/g)?.length ?? 0;
  if (todos > 0) {
    warnings.push(`entry ${e.slug} → ${todos} TODO placeholder${todos === 1 ? "" : "s"} still unfilled.`);
  }
});

// Cross-references are checked after every slug is known.
RAW_ENTRIES.forEach((raw) => {
  const parsed = EntrySchema.safeParse(raw);
  if (!parsed.success) return;
  const e = parsed.data;
  for (const ref of e.ssb.confusedWith) {
    if (!validEntrySlugs.has(ref)) {
      warnings.push(`entry ${e.slug} → confusedWith references "${ref}", which does not exist yet.`);
    }
  }
});

for (const [slug, count] of seenEntrySlugs) {
  if (count > 1) errors.push(`Duplicate entry slug "${slug}" used by ${count} entries.`);
}

// ---------------------------------------------------------------------------
// Organisational units
// ---------------------------------------------------------------------------

const unitFiles = readdirSync(join(process.cwd(), "src", "content", "units"))
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_") && f !== "schema.ts" && f !== "index.ts")
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const seenUnitSlugs = new Map<string, number>();

RAW_UNITS.forEach((raw, i) => {
  const label = (raw as { slug?: string }).slug ?? unitFiles[i] ?? `#${i}`;
  const result = UnitSchema.safeParse(raw);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`unit ${label} → ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return;
  }

  const u = result.data;

  if (unitFiles[i] && unitFiles[i] !== u.slug) {
    errors.push(`unit ${u.slug} → filename is "${unitFiles[i]}.ts" but slug is "${u.slug}". They must match.`);
  }

  seenUnitSlugs.set(u.slug, (seenUnitSlugs.get(u.slug) ?? 0) + 1);

  if (!FORCE_SLUGS.has(u.force)) {
    errors.push(`unit ${u.slug} → unknown force "${u.force}".`);
  }

  const ageDays = (Date.now() - new Date(u.lastVerified).getTime()) / 86_400_000;
  if (ageDays > STALE_AFTER_DAYS) {
    warnings.push(`unit ${u.slug} → last verified ${Math.round(ageDays)} days ago. Re-check the facts.`);
  }

  if (!u.hooks.length) {
    warnings.push(`unit ${u.slug} → no memory hooks written.`);
  }
});

for (const [slug, count] of seenUnitSlugs) {
  if (count > 1) errors.push(`Duplicate unit slug "${slug}" used by ${count} units.`);
}

// ---------------------------------------------------------------------------

const totalEntries = RAW_ENTRIES.length;
const totalUnits = RAW_UNITS.length;

if (warnings.length) {
  console.log(`\n  Warnings (${warnings.length})`);
  for (const w of warnings) console.log(`    · ${w}`);
}

if (errors.length) {
  console.error(`\n  Errors (${errors.length})`);
  for (const e of errors) console.error(`    ✗ ${e}`);
  console.error(
    `\n  ${totalEntries} entries, ${totalUnits} units checked — validation failed.\n`,
  );
  process.exit(1);
}

console.log(
  `\n  ${totalEntries} entries, ${totalUnits} units checked — all valid${
    warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : ""
  }.\n`,
);
