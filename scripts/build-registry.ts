/**
 * Scans src/content/entries and src/content/units and regenerates each
 * folder's _registry.ts.
 *
 * This exists so adding an entry or a unit is a matter of dropping in one
 * file — there is no central list to remember to update, which is the usual
 * way a content set of a few hundred items silently loses items.
 *
 * Run with `npm run index`. Runs automatically before dev and build.
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function buildRegistry(opts: {
  dir: string;
  typeName: string;
  typeImportPath: string;
  exportName: string;
  varPrefix: string;
  noun: string;
}) {
  const dirPath = join(process.cwd(), "src", "content", opts.dir);
  const outFile = join(dirPath, "_registry.ts");

  const NON_CONTENT_FILES = new Set(["schema.ts", "index.ts"]);
  const ids = readdirSync(dirPath)
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_") && !NON_CONTENT_FILES.has(f))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();

  const varFor = (id: string) => `${opts.varPrefix}_${id.replace(/[^a-zA-Z0-9]/g, "_")}`;

  const contents = `// GENERATED FILE — do not edit by hand.
// Regenerate with \`npm run index\`.

import type { ${opts.typeName} } from "${opts.typeImportPath}";
${ids.map((id) => `import ${varFor(id)} from "./${id}";`).join("\n")}

export const ${opts.exportName}: ${opts.typeName}[] = [
${ids.map((id) => `  ${varFor(id)},`).join("\n")}
];
`;

  writeFileSync(outFile, contents, "utf8");
  console.log(`${opts.noun} registry rebuilt — ${ids.length} ${ids.length === 1 ? "item" : "items"}.`);
}

buildRegistry({
  dir: "entries",
  typeName: "EntryInput",
  typeImportPath: "../schema",
  exportName: "RAW_ENTRIES",
  varPrefix: "entry",
  noun: "Entries",
});

buildRegistry({
  dir: "units",
  typeName: "UnitInput",
  typeImportPath: "./schema",
  exportName: "RAW_UNITS",
  varPrefix: "unit",
  noun: "Units",
});
