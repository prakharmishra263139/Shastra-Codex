import { z } from "zod";
import { CATEGORY_SLUGS, type CategorySlug } from "./taxonomy";

/**
 * The contract every entry must satisfy.
 *
 * Two halves:
 *   core  — identical for every piece of equipment, so lists and cards are generic
 *   specs — a discriminated union keyed on `category`, so a missile and a tank
 *           cannot accidentally share a field, and comparison within a category
 *           is a straight diff over the same keys.
 *
 * Lock this file once real content exists. Changes after ~100 entries ship as a
 * migration script, never as a hundred hand edits.
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/**
 * Most public defence figures are estimates or export-variant numbers.
 * Recording that honestly is the point of difference for this site, so
 * `confidence` is required — there is no sensible default to fall back on.
 */
export const Confidence = z.enum(["official", "reported", "estimated"]);
export type Confidence = z.infer<typeof Confidence>;

export const Measure = z.object({
  value: z.number(),
  /** Lower bound where a figure is genuinely a band, e.g. Akash 4.5–25 km. */
  min: z.number().optional(),
  unit: z.string().min(1),
  confidence: Confidence,
  note: z.string().optional(),
});
export type Measure = z.infer<typeof Measure>;

export const Source = z.object({
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  accessed: z.iso.date(),
});

export const ImageRef = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  /** Credit and licence are required so an unattributed image cannot reach the build. */
  credit: z.string().min(1),
  license: z.string().min(1),
  sourceUrl: z.url().optional(),
});

export const Service = z.enum([
  "army",
  "navy",
  "air-force",
  "coast-guard",
  "strategic-forces",
  "tri-service",
]);
export type Service = z.infer<typeof Service>;

export const Status = z.enum([
  "in-service",
  "trials",
  "development",
  "ordered",
  "retired",
]);
export type Status = z.infer<typeof Status>;

export const Variant = z.object({
  name: z.string().min(1),
  year: z.number().int().optional(),
  change: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Specification blocks — one shape per category
// ---------------------------------------------------------------------------

const MissileSpecs = z.object({
  category: z.literal("missiles"),
  range: Measure,
  speed: Measure,
  warhead: Measure,
  length: Measure,
  diameter: Measure,
  launchWeight: Measure,
  guidance: z.array(z.string().min(1)).min(1),
  propulsion: z.string().min(1),
  platforms: z.array(z.string().min(1)).min(1),
});

const ArmourSpecs = z.object({
  category: z.literal("armour"),
  weight: Measure,
  crew: z.number().int().positive(),
  mainGun: z.string().min(1),
  ammoCarried: z.number().int().positive().optional(),
  enginePower: Measure,
  topSpeed: Measure,
  operationalRange: Measure,
  armourType: z.string().min(1),
  fireControl: z.string().min(1),
});

const ArtillerySpecs = z.object({
  category: z.literal("artillery"),
  calibre: Measure,
  range: Measure,
  rateOfFire: z.string().min(1),
  weight: Measure,
  crew: z.number().int().positive(),
  elevation: z.string().min(1),
  mobility: z.string().min(1),
});

const AircraftSpecs = z.object({
  category: z.literal("aircraft"),
  role: z.string().min(1),
  crew: z.number().int().positive(),
  maxSpeed: Measure,
  combatRadius: Measure,
  serviceCeiling: Measure,
  payload: Measure,
  hardpoints: z.number().int().positive().optional(),
  engines: z.string().min(1),
  sensors: z.string().min(1),
});

const NavalSpecs = z.object({
  category: z.literal("naval"),
  displacement: Measure,
  length: Measure,
  beam: Measure,
  speed: Measure,
  endurance: Measure,
  complement: z.number().int().positive(),
  propulsion: z.string().min(1),
  armament: z.array(z.string().min(1)).min(1),
});

/**
 * Categories whose specifications are not yet typed use a flat label/value list.
 * They still render and still validate; they simply cannot be compared field by
 * field until a proper block is written for them in a later phase.
 */
const GenericField = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  note: z.string().optional(),
});

const genericSpecs = <T extends CategorySlug>(category: T) =>
  z.object({
    category: z.literal(category),
    fields: z.array(GenericField).min(1),
  });

export const SpecBlock = z.discriminatedUnion("category", [
  MissileSpecs,
  ArmourSpecs,
  ArtillerySpecs,
  AircraftSpecs,
  NavalSpecs,
  genericSpecs("small-arms"),
  genericSpecs("air-defence"),
  genericSpecs("sensors"),
  genericSpecs("strategic"),
]);
export type SpecBlock = z.infer<typeof SpecBlock>;

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

/** Shared by every content type that has a URL-segment slug — units included. */
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const EntrySchema = z
  .object({
    slug: z.string().regex(SLUG, "slug must be lowercase kebab-case"),
    name: z.string().min(1),
    /** Alternative names and designations. Feeds search so "PJ-10" finds BrahMos. */
    aliases: z.array(z.string().min(1)).default([]),

    category: z.enum(CATEGORY_SLUGS),
    class: z.string().regex(SLUG),
    tags: z.array(z.string().regex(SLUG)).default([]),

    origin: z.array(z.string().min(1)).min(1),
    developer: z.array(z.string().min(1)).min(1),
    manufacturer: z.array(z.string().min(1)).default([]),
    operators: z.array(Service).min(1),

    status: Status,
    inducted: z.number().int().min(1900).max(2100).optional(),
    quantity: Measure.optional(),

    /** The one line shown on cards. Keep it tight. */
    summary: z.string().min(20).max(280),
    /** Two or three paragraphs: what it is, what problem it solves. */
    description: z.array(z.string().min(1)).min(1),

    specs: SpecBlock,
    variants: z.array(Variant).default([]),
    images: z.array(ImageRef).default([]),

    ssb: z.object({
      whyItMatters: z.string().min(1),
      /** Memory aids — short, quotable, the thing you recall under pressure. */
      hooks: z.array(z.string().min(1)).min(1),
      likelyAsked: z.array(z.string().min(1)).default([]),
      /** Slugs of systems this gets confused with. Auto-builds compare shortcuts. */
      confusedWith: z.array(z.string().regex(SLUG)).default([]),
    }),

    sources: z.array(Source).min(1),
    lastVerified: z.iso.date(),
  })
  .refine((e) => e.specs.category === e.category, {
    message: "specs.category must match the entry's category",
    path: ["specs", "category"],
  });

/** What the app consumes: fully parsed, defaults applied. */
export type Entry = z.output<typeof EntrySchema>;

/** What you write in a content file: fields with defaults may be omitted. */
export type EntryInput = z.input<typeof EntrySchema>;

/**
 * Authoring helper. Gives full editor autocomplete on every field without
 * paying a parse cost at import time — the registry parses on load and
 * `npm run validate` reports every failure at once.
 */
export function defineEntry(entry: EntryInput): EntryInput {
  return entry;
}
