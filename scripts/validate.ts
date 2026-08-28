/**
 * Content validator. Reports every problem across every entry in one pass,
 * rather than failing on the first one.
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

const errors: string[] = [];
const warnings: string[] = [];

const STALE_AFTER_DAYS = 365;

const files = readdirSync(join(process.cwd(), "src", "content", "entries"))
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const seenSlugs = new Map<string, number>();
const validSlugs = new Set<string>();

RAW_ENTRIES.forEach((raw, i) => {
  const label = (raw as { slug?: string }).slug ?? files[i] ?? `#${i}`;
  const result = EntrySchema.safeParse(raw);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${label} → ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return;
  }

  const e = result.data;
  validSlugs.add(e.slug);

  // The filename is the URL segment, so a mismatch means a broken link waiting to happen.
  if (files[i] && files[i] !== e.slug) {
    errors.push(`${e.slug} → filename is "${files[i]}.ts" but slug is "${e.slug}". They must match.`);
  }

  seenSlugs.set(e.slug, (seenSlugs.get(e.slug) ?? 0) + 1);

  // Category and class must exist in the taxonomy.
  if (!getCategory(e.category)) {
    errors.push(`${e.slug} → unknown category "${e.category}".`);
  } else if (!CLASS_PATHS.has(`${e.category}/${e.class}`)) {
    errors.push(`${e.slug} → "${e.class}" is not a class of "${e.category}".`);
  }

  // Freshness.
  const ageDays = (Date.now() - new Date(e.lastVerified).getTime()) / 86_400_000;
  if (ageDays > STALE_AFTER_DAYS) {
    warnings.push(`${e.slug} → last verified ${Math.round(ageDays)} days ago. Re-check the figures.`);
  }

  if (e.images.length === 0) {
    warnings.push(`${e.slug} → no image yet.`);
  }

  if (!e.ssb.likelyAsked.length) {
    warnings.push(`${e.slug} → no likely interview questions written.`);
  }

  // Scaffolded stubs pass the schema, so catch them by their placeholder text.
  const todos = JSON.stringify(e).match(/TODO/g)?.length ?? 0;
  if (todos > 0) {
    warnings.push(`${e.slug} → ${todos} TODO placeholder${todos === 1 ? "" : "s"} still unfilled.`);
  }
});

// Cross-references are checked after every slug is known.
RAW_ENTRIES.forEach((raw) => {
  const parsed = EntrySchema.safeParse(raw);
  if (!parsed.success) return;
  const e = parsed.data;
  for (const ref of e.ssb.confusedWith) {
    if (!validSlugs.has(ref)) {
      warnings.push(`${e.slug} → confusedWith references "${ref}", which does not exist yet.`);
    }
  }
});

for (const [slug, count] of seenSlugs) {
  if (count > 1) errors.push(`Duplicate slug "${slug}" used by ${count} entries.`);
}

// ---------------------------------------------------------------------------

const total = RAW_ENTRIES.length;

if (warnings.length) {
  console.log(`\n  Warnings (${warnings.length})`);
  for (const w of warnings) console.log(`    · ${w}`);
}

if (errors.length) {
  console.error(`\n  Errors (${errors.length})`);
  for (const e of errors) console.error(`    ✗ ${e}`);
  console.error(`\n  ${total} entries checked — validation failed.\n`);
  process.exit(1);
}

console.log(
  `\n  ${total} entries checked — all valid${warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : ""}.\n`,
);
