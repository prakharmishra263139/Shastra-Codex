import { defineEntry } from "../schema";

export default defineEntry({
  slug: "mi-17-v5",
  name: "Mil Mi-17 V-5",
  aliases: ["Mi-17V-5", "Mi-8/17 family", "Hip"],

  category: "aircraft",
  class: "rotary-wing",
  tags: ["utility-helicopter", "medium-lift", "hadr", "high-altitude"],

  origin: ["Russia"],
  developer: ["Mil Moscow Helicopter Plant"],
  manufacturer: ["Kazan Helicopters"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2011,
  quantity: {
    value: 150,
    unit: "aircraft",
    confidence: "estimated",
    note: "Approximate V-5 strength from contracts signed in 2008 and 2012. The wider Mi-8/17 family in Indian service is larger.",
  },

  summary:
    "The Air Force's medium-lift workhorse — troop transport, casualty evacuation, disaster relief and high-altitude resupply in one airframe.",

  description: [
    "The Mi-17 V-5 is the latest Indian variant of the Mil Mi-8/17 family, a twin-engine medium-lift utility helicopter that has been the backbone of Indian military rotary-wing aviation since the 1970s. India contracted for 80 V-5s in 2008 and a further 71 in 2012, with deliveries beginning in 2011.",
    "The V-5 is a substantial improvement on the earlier Mi-17s: uprated engines for hot-and-high performance, a glass cockpit compatible with night vision goggles, weather radar, and a self-protection suite with missile approach warning and countermeasures. The uprated engines matter more than anything else on the list, because the aircraft spends much of its life operating from Himalayan helipads where thin air robs a helicopter of lift.",
    "Its work is mostly unglamorous and constant. It moves troops and stores to forward posts, evacuates casualties, drops relief supplies after floods and earthquakes, fights forest fires with underslung buckets, and flies the VVIP communication squadron. In a disaster it is usually the first military aircraft on the scene.",
  ],

  specs: {
    category: "aircraft",
    role: "Twin-engine medium-lift utility helicopter",
    crew: 3,
    maxSpeed: {
      value: 250,
      unit: "km/h",
      confidence: "reported",
      note: "Maximum level speed; normal cruise is lower.",
    },
    combatRadius: {
      value: 280,
      unit: "km",
      confidence: "estimated",
      note: "Radius on internal fuel. Ferry range is around 1,000 km with auxiliary tanks.",
    },
    serviceCeiling: {
      value: 6000,
      unit: "m",
      confidence: "reported",
      note: "Roughly 19,700 ft. The V-5's uprated engines are specifically for hot-and-high work.",
    },
    payload: {
      value: 4000,
      unit: "kg",
      confidence: "reported",
      note: "Internal load; up to 4,500 kg as an underslung external load. Alternatively 36 troops or 24 stretchers.",
    },
    engines:
      "Two Klimov TV3-117VM turboshafts, about 1,640 kW each, driving a five-blade main rotor",
    sensors:
      "Weather radar, night-vision-compatible glass cockpit and autopilot; self-protection suite with missile approach warning, radar warning and countermeasure dispensers",
  },

  variants: [
    {
      name: "Mi-8",
      change:
        "The original family member, in Indian service from the early 1970s and now retired from front-line transport duty.",
    },
    {
      name: "Mi-17 / Mi-17-1V",
      change:
        "Earlier Indian variants with less powerful engines and analogue cockpits, progressively replaced by the V-5.",
    },
    {
      name: "Mi-17 V-5",
      year: 2011,
      change:
        "Current standard: uprated TV3-117VM engines, glass cockpit, weather radar and a self-protection suite. 80 contracted in 2008, 71 more in 2012.",
    },
  ],

  images: [
    {
      src: "/images/mi-17-zp5140.webp",
      alt: "Indian Air Force Mi-17 V-5, tail number ZP 5140, in flight with INDIAN AIR FORCE titles along the fuselage and the five-blade main rotor turning.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "Helicopters are where the Air Force meets the public, and the Mi-17 is the one that does it. It is the right answer to any question about the military's role in disaster relief, and the clearest illustration of why high-altitude performance drives Indian procurement in a way it does not for most air forces.",
    hooks: [
      "The Air Force's medium-lift workhorse — troops, casualties, relief loads, forest fires.",
      "Uprated engines specifically for hot-and-high Himalayan operations.",
      "80 contracted in 2008, 71 more in 2012; deliveries from 2011.",
      "Usually the first military aircraft into a disaster zone.",
    ],
    likelyAsked: [
      "What roles does a utility helicopter perform for the Air Force?",
      "Why does high-altitude performance matter so much for Indian helicopters?",
      "How does the military contribute to disaster relief?",
      "Why is India trying to replace Russian helicopters with indigenous designs?",
    ],
    confusedWith: [],
  },

  sources: [
    {
      title: "Indian Air Force — official website",
      publisher: "Indian Air Force",
      url: "https://indianairforce.nic.in/",
      accessed: "2026-08-29",
    },
    {
      title: "Press Information Bureau — Ministry of Defence releases",
      publisher: "Government of India",
      url: "https://pib.gov.in/",
      accessed: "2026-08-29",
    },
    {
      title: "National Disaster Management Authority — response resources",
      publisher: "Government of India",
      url: "https://ndma.gov.in/",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
