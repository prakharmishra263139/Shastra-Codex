/**
 * The taxonomy is the spine of the site: category -> class -> entry.
 * Slugs here become URL segments, so treat them as permanent once content exists.
 */

export const CATEGORY_SLUGS = [
  "missiles",
  "armour",
  "artillery",
  "aircraft",
  "naval",
  "small-arms",
  "air-defence",
  "sensors",
  "strategic",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

/** Categories whose specifications are fully typed. The rest use the generic block. */
export const TYPED_CATEGORIES = [
  "missiles",
  "armour",
  "artillery",
  "aircraft",
  "naval",
] as const satisfies readonly CategorySlug[];

export interface EquipmentClass {
  slug: string;
  name: string;
  blurb: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  classes: EquipmentClass[];
}

export const TAXONOMY: Category[] = [
  {
    slug: "missiles",
    name: "Missiles & Rockets",
    blurb: "Guided and unguided weapons launched from land, sea and air.",
    classes: [
      { slug: "air-to-air", name: "Air-to-Air", blurb: "Fired from an aircraft at another aircraft." },
      { slug: "air-to-surface", name: "Air-to-Surface", blurb: "Fired from an aircraft at a ground or sea target." },
      { slug: "surface-to-air", name: "Surface-to-Air", blurb: "Ground- or ship-launched interceptors." },
      { slug: "ballistic", name: "Ballistic", blurb: "Rocket-boosted, largely unpowered ballistic trajectory." },
      { slug: "cruise", name: "Cruise", blurb: "Powered, sustained low-altitude flight to the target." },
      { slug: "anti-tank", name: "Anti-Tank", blurb: "Guided munitions for armoured targets." },
      { slug: "anti-ship", name: "Anti-Ship", blurb: "Sea-skimming weapons against surface vessels." },
      { slug: "anti-radiation", name: "Anti-Radiation & Hypersonic", blurb: "Radar-killers and hypersonic demonstrators." },
      { slug: "rocket-artillery", name: "Rocket Artillery", blurb: "Multi-barrel rocket launcher systems." },
    ],
  },
  {
    slug: "armour",
    name: "Armoured Vehicles",
    blurb: "Tracked and wheeled fighting vehicles of the mechanised forces.",
    classes: [
      { slug: "main-battle-tank", name: "Main Battle Tanks", blurb: "The primary armoured punch of the Army." },
      { slug: "light-tank", name: "Light Tanks", blurb: "Air-portable armour for high-altitude and riverine terrain." },
      { slug: "infantry-combat-vehicle", name: "Infantry Combat Vehicles", blurb: "Armoured transport that also fights." },
      { slug: "protected-vehicle", name: "Protected & Utility Vehicles", blurb: "Mine-protected and light specialist vehicles." },
      { slug: "engineering-vehicle", name: "Engineering & Recovery", blurb: "Bridge layers, recovery vehicles, CBRN reconnaissance." },
    ],
  },
  {
    slug: "artillery",
    name: "Artillery",
    blurb: "Tube and rocket systems providing indirect fire support.",
    classes: [
      { slug: "towed-gun", name: "Towed Guns", blurb: "Guns moved by a prime mover and emplaced to fire." },
      { slug: "self-propelled", name: "Self-Propelled", blurb: "Guns mounted on their own tracked or wheeled chassis." },
      { slug: "mortar", name: "Mortars & Infantry Support", blurb: "Short-range, high-angle organic fire." },
      { slug: "fire-control", name: "Fire Control & Locating", blurb: "Weapon-locating radars and artillery command systems." },
    ],
  },
  {
    slug: "aircraft",
    name: "Air Power",
    blurb: "Fixed-wing, rotary-wing and unmanned platforms.",
    classes: [
      { slug: "fighter", name: "Fighters & Multirole", blurb: "Air superiority and strike aircraft in service." },
      { slug: "in-development", name: "Under Development", blurb: "Programmes not yet inducted." },
      { slug: "transport", name: "Transport", blurb: "Strategic and tactical airlift." },
      { slug: "rotary-wing", name: "Rotary Wing", blurb: "Attack, utility and heavy-lift helicopters." },
      { slug: "special-mission", name: "Special Mission", blurb: "Airborne early warning, maritime patrol, refuelling." },
      { slug: "unmanned", name: "Unmanned", blurb: "Reconnaissance drones, armed UAVs and loitering munitions." },
      { slug: "trainer", name: "Trainers", blurb: "Basic, intermediate and advanced jet training." },
    ],
  },
  {
    slug: "naval",
    name: "Naval Platforms",
    blurb: "Surface combatants, submarines and naval aviation.",
    classes: [
      { slug: "aircraft-carrier", name: "Aircraft Carriers", blurb: "Capital ships projecting air power at sea." },
      { slug: "destroyer", name: "Destroyers", blurb: "Large multi-role surface combatants." },
      { slug: "frigate", name: "Frigates", blurb: "General-purpose escorts." },
      { slug: "corvette", name: "Corvettes & OPVs", blurb: "Coastal combatants and patrol vessels." },
      { slug: "submarine", name: "Submarines", blurb: "Conventional and nuclear-powered boats." },
      { slug: "amphibious", name: "Amphibious & Auxiliary", blurb: "Landing ships, tankers and support vessels." },
      { slug: "naval-aviation", name: "Naval Aviation & Weapons", blurb: "Carrier aircraft, helicopters, torpedoes, decoys." },
    ],
  },
  {
    slug: "small-arms",
    name: "Small Arms & Infantry",
    blurb: "Weapons and equipment carried by the individual soldier.",
    classes: [
      { slug: "assault-rifle", name: "Assault Rifles", blurb: "The infantryman's primary weapon." },
      { slug: "carbine", name: "Carbines & SMGs", blurb: "Compact weapons for close quarters." },
      { slug: "sniper", name: "Sniper & Marksman", blurb: "Precision rifles and anti-materiel weapons." },
      { slug: "support-weapon", name: "Support Weapons", blurb: "Machine guns, rocket launchers, grenade launchers." },
      { slug: "soldier-system", name: "Soldier Systems", blurb: "Body armour, night vision, integrated soldier programmes." },
    ],
  },
  {
    slug: "air-defence",
    name: "Air Defence Systems",
    blurb: "Layered protection of airspace against aircraft, missiles and drones.",
    classes: [
      { slug: "sam-network", name: "Layered SAM Networks", blurb: "Long, medium and short-range surface-to-air systems." },
      { slug: "bmd", name: "Ballistic Missile Defence", blurb: "Exo- and endo-atmospheric interception." },
      { slug: "gun-based", name: "Gun-Based & Point Defence", blurb: "Anti-aircraft guns and close-in weapon systems." },
      { slug: "counter-drone", name: "Counter-Drone", blurb: "Detection and neutralisation of unmanned threats." },
    ],
  },
  {
    slug: "sensors",
    name: "Sensors, EW & Space",
    blurb: "Detection, electronic warfare, satellites and battlefield networks.",
    classes: [
      { slug: "radar", name: "Radars", blurb: "Surveillance, tracking and fire-control radars." },
      { slug: "electronic-warfare", name: "Electronic Warfare", blurb: "Jamming, deception and self-protection suites." },
      { slug: "satellite", name: "Military Satellites", blurb: "Communication, imaging and electronic intelligence." },
      { slug: "c4i", name: "Navigation & C4I", blurb: "NavIC, air defence networks and command systems." },
    ],
  },
  {
    slug: "strategic",
    name: "Strategic & Emerging",
    blurb: "Nuclear forces, doctrine and next-generation capability.",
    classes: [
      { slug: "nuclear-triad", name: "Nuclear Triad", blurb: "Land, air and sea legs of the deterrent." },
      { slug: "directed-energy", name: "Directed Energy & Novel", blurb: "Lasers, anti-satellite and experimental weapons." },
      { slug: "autonomy", name: "Autonomy & Swarms", blurb: "Drone swarms, robotic platforms, battlefield AI." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

const categoryIndex = new Map(TAXONOMY.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryIndex.get(slug as CategorySlug);
}

export function getClass(categorySlug: string, classSlug: string): EquipmentClass | undefined {
  return getCategory(categorySlug)?.classes.find((c) => c.slug === classSlug);
}

/** Every valid "category/class" pair — used by the validator to reject typos. */
export const CLASS_PATHS: ReadonlySet<string> = new Set(
  TAXONOMY.flatMap((c) => c.classes.map((k) => `${c.slug}/${k.slug}`)),
);
