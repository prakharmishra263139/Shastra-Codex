import { UnitSchema, type Unit } from "./schema";
import { RAW_UNITS } from "./_registry";
import { FORCES, getForce } from "../forces";
import type { Force } from "./schema";

/**
 * Parsed once, at module load, same discipline as the equipment loader in
 * src/content/index.ts — a malformed unit fails the build rather than
 * shipping a broken page.
 */
function parseAll(): Unit[] {
  return RAW_UNITS.map((raw) => {
    const result = UnitSchema.safeParse(raw);
    if (!result.success) {
      const slug = (raw as { slug?: string }).slug ?? "<unknown slug>";
      const issues = result.error.issues
        .map((i) => `    ${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("\n");
      throw new Error(
        `Invalid unit "${slug}":\n${issues}\n\nRun \`npm run validate\` to see every problem at once.`,
      );
    }
    return result.data;
  });
}

export const allUnits: Unit[] = parseAll().sort((a, b) => a.name.localeCompare(b.name));

const bySlug = new Map(allUnits.map((u) => [u.slug, u]));

export function getUnit(slug: string): Unit | undefined {
  return bySlug.get(slug);
}

export function unitsByForce(force: string): Unit[] {
  return allUnits.filter((u) => u.force === force);
}

export function forceCounts(): Record<Force, number> {
  const counts: Record<string, number> = {};
  for (const u of allUnits) counts[u.force] = (counts[u.force] ?? 0) + 1;
  return counts as Record<Force, number>;
}

export { FORCES, getForce };
export type { Unit, Force };
