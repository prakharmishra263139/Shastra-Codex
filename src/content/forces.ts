import type { Force } from "./units/schema";

/**
 * The second browsing axis: by service, rather than by equipment category.
 * Deliberately just the three uniformed services with combat commands the
 * roadmap names — Coast Guard and Strategic Forces Command stay under
 * `operators` on the equipment side rather than getting a force page here.
 */
export interface ForceInfo {
  slug: Force;
  name: string;
  blurb: string;
  /** What its sub-segments are actually called — "Regiments & Corps" reads oddly for the Navy. */
  unitLabel: string;
  unitLabelSingular: string;
}

export const FORCES: ForceInfo[] = [
  {
    slug: "army",
    name: "Indian Army",
    blurb:
      "The largest of the three services, organised into arms and services that each carry their own history, role and identity.",
    unitLabel: "Arms & Corps",
    unitLabelSingular: "Arm / Corps",
  },
  {
    slug: "air-force",
    name: "Indian Air Force",
    blurb:
      "Air power organised into operational and functional commands, each responsible for a region or a role rather than a type of aircraft.",
    unitLabel: "Commands",
    unitLabelSingular: "Command",
  },
  {
    slug: "navy",
    name: "Indian Navy",
    blurb:
      "Maritime power projected from three commands, each covering a stretch of coastline or, in one case, the Navy's own training establishment.",
    unitLabel: "Commands",
    unitLabelSingular: "Command",
  },
];

const forceIndex = new Map(FORCES.map((f) => [f.slug, f]));

export function getForce(slug: string): ForceInfo | undefined {
  return forceIndex.get(slug as Force);
}
