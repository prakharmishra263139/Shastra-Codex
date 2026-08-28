/**
 * Scans src/content/entries and regenerates _registry.ts.
 *
 * This exists so adding an entry is a matter of dropping in one file — there is
 * no central list to remember to update, which is the usual way a content set
 * of a few hundred items silently loses items.
 *
 * Run with `npm run index`. Runs automatically before dev and build.
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRIES_DIR = join(process.cwd(), "src", "content", "entries");
const OUT_FILE = join(ENTRIES_DIR, "_registry.ts");

const ids = readdirSync(ENTRIES_DIR)
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const varFor = (id: string) => `entry_${id.replace(/[^a-zA-Z0-9]/g, "_")}`;

const contents = `// GENERATED FILE — do not edit by hand.
// Regenerate with \`npm run index\`.

import type { EntryInput } from "../schema";
${ids.map((id) => `import ${varFor(id)} from "./${id}";`).join("\n")}

export const RAW_ENTRIES: EntryInput[] = [
${ids.map((id) => `  ${varFor(id)},`).join("\n")}
];
`;

writeFileSync(OUT_FILE, contents, "utf8");
console.log(`Registry rebuilt — ${ids.length} entr${ids.length === 1 ? "y" : "ies"}.`);
