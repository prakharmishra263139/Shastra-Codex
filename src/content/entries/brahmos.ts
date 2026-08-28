import { defineEntry } from "../schema";

export default defineEntry({
  slug: "brahmos",
  name: "BrahMos",
  aliases: ["PJ-10", "BrahMos Block III"],

  category: "missiles",
  class: "cruise",
  tags: ["supersonic", "anti-ship", "air-launched", "naval", "indo-russian"],

  origin: ["India", "Russia"],
  developer: ["DRDO", "NPO Mashinostroyeniya"],
  manufacturer: ["BrahMos Aerospace"],
  operators: ["army", "navy", "air-force"],

  status: "in-service",
  inducted: 2005,

  summary:
    "Indo-Russian supersonic cruise missile launched from ships, submarines, land vehicles and the Su-30MKI.",

  description: [
    "BrahMos is a two-stage supersonic cruise missile developed jointly by India's DRDO and Russia's NPO Mashinostroyeniya, and produced by the BrahMos Aerospace joint venture. The name combines the Brahmaputra and Moskva rivers.",
    "Its defining characteristic is speed. Where most cruise missiles are subsonic, BrahMos cruises at close to three times the speed of sound, which compresses the time an enemy has to detect, decide and respond. A solid booster gets it off the launcher; a liquid-fuelled ramjet sustains it through the cruise phase.",
    "It is the only Indian missile deployed in all three services from four launch platforms — ship, submarine, land and air — which is why it appears so often in interview questions about tri-service capability and about indigenous defence exports.",
  ],

  specs: {
    category: "missiles",
    range: {
      value: 290,
      unit: "km",
      confidence: "reported",
      note: "290 km was the original figure, set by Missile Technology Control Regime limits before India joined. Extended-range variants of 450 km and beyond have been tested.",
    },
    speed: {
      value: 2.8,
      unit: "Mach",
      confidence: "reported",
      note: "Roughly Mach 2.8 to 3.0 depending on the flight profile.",
    },
    warhead: {
      value: 300,
      min: 200,
      unit: "kg",
      confidence: "reported",
      note: "Conventional semi-armour-piercing warhead; the figure varies by variant.",
    },
    length: { value: 8.4, unit: "m", confidence: "reported" },
    diameter: { value: 0.6, unit: "m", confidence: "reported" },
    launchWeight: {
      value: 3000,
      unit: "kg",
      confidence: "reported",
      note: "About 2,500 kg for the lighter air-launched variant.",
    },
    guidance: [
      "Inertial navigation",
      "Satellite update (GPS / GLONASS / NavIC)",
      "Active radar terminal seeker",
    ],
    propulsion: "Solid-propellant booster with a liquid-fuelled ramjet sustainer",
    platforms: ["Surface ships", "Submarines", "Mobile land launchers", "Su-30MKI"],
  },

  variants: [
    { name: "Block I", year: 2005, change: "Baseline anti-ship and land-attack version, inducted by the Navy." },
    { name: "Block II", year: 2009, change: "Improved target discrimination for picking a specific building out of a cluttered land target set." },
    { name: "Block III", year: 2013, change: "Steep-dive capability for use in mountainous terrain." },
    { name: "Air-launched (ALCM)", year: 2017, change: "Lightened airframe integrated onto the Su-30MKI." },
    { name: "BrahMos-NG", change: "Smaller, lighter next-generation variant intended to fit a wider range of aircraft. In development." },
  ],

  images: [],

  ssb: {
    whyItMatters:
      "BrahMos is the standard example of successful Indian defence co-development and, since the 2022 Philippines contract, of Indian defence exports. It is also the cleanest illustration of tri-service commonality.",
    hooks: [
      "Named after the Brahmaputra and the Moskva.",
      "The only Indian missile fielded by all three services from four platform types.",
      "First major Indian defence export order — the Philippines, signed 2022.",
    ],
    likelyAsked: [
      "Why does supersonic speed matter for a cruise missile?",
      "What is the difference between BrahMos and Nirbhay?",
      "Which countries have bought BrahMos?",
      "What does the name BrahMos stand for?",
    ],
    confusedWith: ["nirbhay", "agni-v"],
  },

  sources: [
    {
      title: "BrahMos Aerospace — official site",
      publisher: "BrahMos Aerospace",
      url: "https://www.brahmos.com/",
      accessed: "2026-08-28",
    },
    {
      title: "Defence Research and Development Organisation",
      publisher: "Ministry of Defence, Government of India",
      url: "https://www.drdo.gov.in/",
      accessed: "2026-08-28",
    },
  ],

  lastVerified: "2026-08-28",
});
