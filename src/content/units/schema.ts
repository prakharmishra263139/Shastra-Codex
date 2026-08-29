import { z } from "zod";
import { SLUG, Source } from "../schema";

/**
 * Organisational units — the arms, corps and commands that make up the three
 * services — as opposed to the equipment they operate. A deliberately
 * separate, simpler contract from src/content/schema.ts: no discriminated
 * spec union, because "role" and "history" don't need typed comparison the
 * way a missile's range does.
 */

export const Force = z.enum(["army", "navy", "air-force"]);
export type Force = z.infer<typeof Force>;

/**
 * What kind of thing this is, per force — a corps/regiment for the Army,
 * a command for the Navy and Air Force. Kept as one field rather than three
 * schemas because every other field is identical across the three.
 */
export const UnitType = z.enum(["corps", "regiment", "command"]);
export type UnitType = z.infer<typeof UnitType>;

export const UnitSchema = z.object({
  slug: z.string().regex(SLUG, "slug must be lowercase kebab-case"),
  name: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),

  force: Force,
  type: UnitType,

  /** Year raised or formed in its current shape. Omit rather than guess. */
  raised: z.number().int().min(1700).max(2100).optional(),
  /** Headquarters, where the unit has a fixed one — commands do, most corps don't. */
  hq: z.string().min(1).optional(),
  role: z.string().min(1),

  /** The one line shown on cards. Keep it tight. */
  summary: z.string().min(20).max(280),
  /** One or two paragraphs: what it is, what it does. */
  description: z.array(z.string().min(1)).min(1),

  /** Quotable memory aids, same spirit as an equipment entry's SSB hooks. */
  hooks: z.array(z.string().min(1)).default([]),

  sources: z.array(Source).min(1),
  lastVerified: z.iso.date(),
});

/** What the app consumes: fully parsed, defaults applied. */
export type Unit = z.output<typeof UnitSchema>;

/** What you write in a content file: fields with defaults may be omitted. */
export type UnitInput = z.input<typeof UnitSchema>;

/** Authoring helper — full editor autocomplete, no parse cost at import time. */
export function defineUnit(unit: UnitInput): UnitInput {
  return unit;
}
