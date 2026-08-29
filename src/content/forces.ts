import type { Force } from "./units/schema";

/**
 * The second browsing axis: by service, rather than by equipment category.
 * Deliberately just the three uniformed services with combat commands the
 * roadmap names — Coast Guard and Strategic Forces Command stay under
 * `operators` on the equipment side rather than getting a force page here.
 *
 * Each force also carries what it needs to be *presented* — a motto, a
 * photograph, a colour. Three services means three chances to make a page look
 * generic; giving each one a fixed identity here means every surface that
 * renders a force renders the same one.
 */
export interface ForceInfo {
  slug: Force;
  name: string;
  /** Name without the "Indian" prefix, for tight spaces like navigation. */
  shortName: string;
  blurb: string;
  /** One line of character, shown under the name on the home page. */
  tagline: string;
  /** Official motto: the Sanskrit, then the usual English rendering. */
  motto: { text: string; translation: string };
  /** What its sub-segments are actually called — "Regiments & Corps" reads oddly for the Navy. */
  unitLabel: string;
  unitLabelSingular: string;
  /** CSS custom property holding this force's colour, set on `--tone`. */
  tone: string;
  image: { src: string; alt: string };
}

export const FORCES: ForceInfo[] = [
  {
    slug: "army",
    name: "Indian Army",
    shortName: "Army",
    blurb:
      "The largest of the three services, organised into arms and services that each carry their own history, role and identity.",
    tagline:
      "Armour, artillery, infantry and engineers — the ground the other two services fight to protect.",
    motto: { text: "सेवा परमो धर्म:", translation: "Service Before Self" },
    unitLabel: "Arms & Corps",
    unitLabelSingular: "Arm / Corps",
    tone: "var(--army)",
    image: {
      src: "/images/force-army.webp",
      alt: "Indian Army contingent marching past a tricolour dais in the rain",
    },
  },
  {
    slug: "air-force",
    name: "Indian Air Force",
    shortName: "Air Force",
    blurb:
      "Air power organised into operational and functional commands, each responsible for a region or a role rather than a type of aircraft.",
    tagline:
      "Seven commands, split by geography and by function — not by the aircraft they happen to fly.",
    motto: { text: "नभः स्पृशं दीप्तम्", translation: "Touch the Sky with Glory" },
    unitLabel: "Commands",
    unitLabelSingular: "Command",
    tone: "var(--air-force)",
    image: {
      src: "/images/force-air-force.webp",
      alt: "Fighter pilot in the cockpit of a jet, canopy open",
    },
  },
  {
    slug: "navy",
    name: "Indian Navy",
    shortName: "Navy",
    blurb:
      "Maritime power projected from three commands, each covering a stretch of coastline or, in one case, the Navy's own training establishment.",
    tagline:
      "A blue-water force built around carriers, submarines and the commands that keep them at sea.",
    motto: {
      text: "शं नो वरुणः",
      translation: "May the Lord of the Oceans be Auspicious unto Us",
    },
    unitLabel: "Commands",
    unitLabelSingular: "Command",
    tone: "var(--navy)",
    image: {
      src: "/images/force-navy.webp",
      alt: "Indian Navy sailors formed up in ranks on a foggy parade route",
    },
  },
];

const forceIndex = new Map(FORCES.map((f) => [f.slug, f]));

export function getForce(slug: string): ForceInfo | undefined {
  return forceIndex.get(slug as Force);
}
