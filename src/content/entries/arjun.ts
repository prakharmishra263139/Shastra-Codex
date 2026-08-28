import { defineEntry } from "../schema";

export default defineEntry({
  slug: "arjun",
  name: "Arjun MBT",
  aliases: ["Arjun Mk-1", "Arjun Mk-1A"],

  category: "armour",
  class: "main-battle-tank",
  tags: ["indigenous", "drdo", "kanchan-armour"],

  origin: ["India"],
  developer: ["DRDO (Combat Vehicles Research and Development Establishment)"],
  manufacturer: ["Heavy Vehicles Factory, Avadi"],
  operators: ["army"],

  status: "in-service",
  inducted: 2004,

  summary:
    "India's indigenous main battle tank, built around a 120 mm rifled gun and Kanchan composite armour.",

  description: [
    "Arjun is the indigenous main battle tank developed by DRDO's Combat Vehicles Research and Development Establishment. It entered service in 2004 after a long development programme, and is operated in desert-facing formations where its weight is less of a constraint.",
    "Two things distinguish it from the T-series tanks that make up most of the Army's armour. It carries a 120 mm rifled gun rather than the 125 mm smoothbore with autoloader, and it uses indigenously developed Kanchan modular composite armour. The rifled gun trades some armour-piercing performance for better accuracy with high-explosive ammunition.",
    "The Mk-1A version, ordered in 2021, adds a substantial list of improvements — better protection, an automatic target tracker and missile-firing capability — at the cost of a significant increase in weight.",
  ],

  specs: {
    category: "armour",
    weight: {
      value: 58.5,
      unit: "t",
      confidence: "reported",
      note: "The Mk-1A rises to roughly 68.6 t with added protection, which limits the bridges and rail wagons it can use.",
    },
    crew: 4,
    mainGun: "120 mm rifled gun, manually loaded",
    ammoCarried: 39,
    enginePower: {
      value: 1400,
      unit: "hp",
      confidence: "reported",
      note: "MTU MB 838 Ka-501 diesel.",
    },
    topSpeed: {
      value: 67,
      unit: "km/h",
      confidence: "reported",
      note: "Road speed for the Mk-1; lower for the heavier Mk-1A.",
    },
    operationalRange: { value: 450, unit: "km", confidence: "reported" },
    armourType: "Kanchan modular composite armour",
    fireControl:
      "Computerised fire control with thermal imaging night sight, laser rangefinder and stabilised gunner's main sight",
  },

  variants: [
    { name: "Arjun Mk-1", year: 2004, change: "Baseline tank inducted into service." },
    { name: "Arjun Mk-1A", year: 2021, change: "72 improvements including an automatic target tracker, better protection and the ability to fire a gun-launched missile. 118 ordered." },
    { name: "Arjun Catapult Mk-II", change: "Arjun hull carrying a 130 mm gun as a self-propelled artillery platform." },
  ],

  images: [],

  ssb: {
    whyItMatters:
      "Arjun is the standard case study for indigenous heavy engineering — its strengths, and the practical trade-offs of weight and logistics that come with a home-grown design.",
    hooks: [
      "120 mm rifled gun — the T-90 and T-72 both use a 125 mm smoothbore with autoloader.",
      "Kanchan composite armour is indigenous.",
      "Crew of four, because there is no autoloader; the T-90 needs only three.",
    ],
    likelyAsked: [
      "What is the difference between the Arjun and the T-90?",
      "Why does the Arjun need a crew of four when the T-90 needs three?",
      "What are the drawbacks of the Arjun's weight?",
      "What is Kanchan armour?",
    ],
    confusedWith: ["t-90s-bhishma"],
  },

  sources: [
    {
      title: "Defence Research and Development Organisation",
      publisher: "Ministry of Defence, Government of India",
      url: "https://www.drdo.gov.in/",
      accessed: "2026-08-28",
    },
    {
      title: "Indian Army — official website",
      publisher: "Indian Army",
      url: "https://indianarmy.nic.in/",
      accessed: "2026-08-28",
    },
  ],

  lastVerified: "2026-08-28",
});
