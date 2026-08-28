import type { Entry, Measure } from "@/content/schema";
import { labelFor } from "@/lib/format";

export interface Highlight {
  label: string;
  measure?: Measure;
  text?: string;
}

/**
 * The four or five figures an interviewer actually asks for, per category.
 * Shown large at the top of an entry so the headline numbers are readable
 * without scrolling into the full specification table.
 */
const KEY_FIELDS: Record<string, string[]> = {
  missiles: ["range", "speed", "warhead", "launchWeight"],
  armour: ["weight", "crew", "mainGun", "topSpeed"],
  artillery: ["calibre", "range", "rateOfFire", "crew"],
  aircraft: ["maxSpeed", "combatRadius", "serviceCeiling", "payload"],
  naval: ["displacement", "speed", "complement", "length"],
};

function isMeasureLike(v: unknown): v is Measure {
  return typeof v === "object" && v !== null && "value" in v && "unit" in v;
}

export function highlights(entry: Entry): Highlight[] {
  const specs = entry.specs;

  if ("fields" in specs) {
    return specs.fields.slice(0, 4).map((f) => ({ label: f.label, text: f.value }));
  }

  const keys = KEY_FIELDS[specs.category] ?? [];
  const record = specs as unknown as Record<string, unknown>;

  return keys
    .filter((key) => record[key] !== undefined)
    .map((key) => {
      const value = record[key];
      return isMeasureLike(value)
        ? { label: labelFor(key), measure: value }
        : { label: labelFor(key), text: String(value) };
    });
}
