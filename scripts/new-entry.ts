/**
 * Entry scaffolder. Writes a pre-filled stub with the correct spec block for the
 * chosen category, so authoring an entry is filling blanks rather than
 * remembering forty field names.
 *
 *   npm run new
 *   npm run new -- --name "Pinaka Mk-II" --category missiles --class rocket-artillery
 */

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { TAXONOMY, getCategory, getClass } from "../src/content/taxonomy";

const TODAY = new Date().toISOString().slice(0, 10);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(`--${flag}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const MEASURE = (unit: string) =>
  `{ value: 0, unit: "${unit}", confidence: "reported" }`;

const SPEC_STUBS: Record<string, string> = {
  missiles: `    range: ${MEASURE("km")},
    speed: ${MEASURE("Mach")},
    warhead: ${MEASURE("kg")},
    length: ${MEASURE("m")},
    diameter: ${MEASURE("m")},
    launchWeight: ${MEASURE("kg")},
    guidance: ["TODO"],
    propulsion: "TODO",
    platforms: ["TODO"],`,

  armour: `    weight: ${MEASURE("t")},
    crew: 3,
    mainGun: "TODO",
    ammoCarried: 40,
    enginePower: ${MEASURE("hp")},
    topSpeed: ${MEASURE("km/h")},
    operationalRange: ${MEASURE("km")},
    armourType: "TODO",
    fireControl: "TODO",`,

  artillery: `    calibre: ${MEASURE("mm")},
    range: ${MEASURE("km")},
    rateOfFire: "TODO",
    weight: ${MEASURE("t")},
    crew: 6,
    elevation: "TODO",
    mobility: "TODO",`,

  aircraft: `    role: "TODO",
    crew: 1,
    maxSpeed: ${MEASURE("Mach")},
    combatRadius: ${MEASURE("km")},
    serviceCeiling: ${MEASURE("m")},
    payload: ${MEASURE("kg")},
    hardpoints: 8,
    engines: "TODO",
    sensors: "TODO",`,

  naval: `    displacement: ${MEASURE("t")},
    length: ${MEASURE("m")},
    beam: ${MEASURE("m")},
    speed: ${MEASURE("knots")},
    endurance: ${MEASURE("nmi")},
    complement: 300,
    propulsion: "TODO",
    armament: ["TODO"],`,
};

const GENERIC_STUB = `    fields: [
      { label: "TODO", value: "TODO" },
    ],`;

function template(name: string, slug: string, category: string, klass: string): string {
  const specs = SPEC_STUBS[category] ?? GENERIC_STUB;
  return `import { defineEntry } from "../schema";

export default defineEntry({
  slug: "${slug}",
  name: "${name}",
  aliases: [],

  category: "${category}",
  class: "${klass}",
  tags: [],

  origin: ["India"],
  developer: ["TODO"],
  manufacturer: [],
  operators: ["army"],

  status: "in-service",
  // inducted: 2020,

  summary:
    "TODO — one line, under 280 characters, shown on cards.",

  description: [
    "TODO — what it is.",
    "TODO — what problem it solves and how it works.",
  ],

  specs: {
    category: "${category}",
${specs}
  },

  variants: [],
  images: [],

  ssb: {
    whyItMatters: "TODO — the interview angle.",
    hooks: ["TODO — the line you recall under pressure."],
    likelyAsked: ["TODO"],
    confusedWith: [],
  },

  sources: [
    {
      title: "TODO",
      publisher: "TODO",
      url: "https://example.com/",
      accessed: "${TODAY}",
    },
  ],

  lastVerified: "${TODAY}",
});
`;
}

async function main() {
  let name = arg("name");
  let category = arg("category");
  let klass = arg("class");

  const interactive = !name || !category || !klass;
  const rl = interactive ? createInterface({ input: stdin, output: stdout }) : null;

  if (rl) {
    if (!name) name = (await rl.question("Name (e.g. Pinaka Mk-II): ")).trim();

    if (!category) {
      console.log("\nCategories:");
      for (const c of TAXONOMY) console.log(`  ${c.slug.padEnd(14)} ${c.name}`);
      category = (await rl.question("\nCategory slug: ")).trim();
    }

    const cat = getCategory(category!);
    if (!cat) {
      console.error(`\n  Unknown category "${category}".\n`);
      rl.close();
      process.exit(1);
    }

    if (!klass) {
      console.log(`\nClasses in ${cat.name}:`);
      for (const k of cat.classes) console.log(`  ${k.slug.padEnd(24)} ${k.name}`);
      klass = (await rl.question("\nClass slug: ")).trim();
    }
    rl.close();
  }

  if (!name || !category || !klass) {
    console.error("\n  Need --name, --category and --class.\n");
    process.exit(1);
  }

  if (!getCategory(category)) {
    console.error(`\n  Unknown category "${category}".\n`);
    process.exit(1);
  }
  if (!getClass(category, klass)) {
    console.error(`\n  "${klass}" is not a class of "${category}".\n`);
    process.exit(1);
  }

  const slug = slugify(name);
  const path = join(process.cwd(), "src", "content", "entries", `${slug}.ts`);

  if (existsSync(path)) {
    console.error(`\n  ${slug}.ts already exists. Nothing written.\n`);
    process.exit(1);
  }

  writeFileSync(path, template(name, slug, category, klass), "utf8");
  console.log(`\n  Created src/content/entries/${slug}.ts`);
  console.log(`  Route  /${category}/${klass}/${slug}`);
  console.log(`\n  Fill in the TODOs, then run \`npm run validate\`.\n`);
}

main();
