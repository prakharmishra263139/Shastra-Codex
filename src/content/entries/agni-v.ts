import { defineEntry } from "../schema";

export default defineEntry({
  slug: "agni-v",
  name: "Agni-V",
  aliases: ["Agni 5"],

  category: "missiles",
  class: "ballistic",
  tags: ["strategic", "nuclear-capable", "canisterised", "mirv", "drdo"],

  origin: ["India"],
  developer: ["DRDO (Advanced Systems Laboratory)"],
  manufacturer: ["Bharat Dynamics Limited"],
  operators: ["strategic-forces"],

  status: "in-service",
  inducted: 2022,

  summary:
    "India's longest-range ballistic missile: three-stage, solid-fuelled, canisterised and road-mobile.",

  description: [
    "Agni-V is the longest-range missile in the Agni family and the backbone of the land leg of India's nuclear deterrent. It is a three-stage, solid-propellant design, which means it can be stored fuelled and launched at short notice — unlike the liquid-fuelled early Prithvi generation, which needed lengthy preparation.",
    "It is canisterised: the missile is sealed in a launch container at the factory and carried on a road-mobile transporter-erector-launcher. That combination of sealed storage and mobility is what makes the deterrent survivable, because a missile that can move cannot be reliably targeted first.",
    "In March 2024, under Mission Divyastra, DRDO tested Agni-V with Multiple Independently targetable Re-entry Vehicles, allowing a single missile to strike several separated targets.",
  ],

  specs: {
    category: "missiles",
    range: {
      value: 5000,
      unit: "km",
      confidence: "estimated",
      note: "Officially described as 'more than 5,000 km'. Independent analysts have suggested a longer true range. Treat the exact figure as unconfirmed.",
    },
    speed: {
      value: 24,
      unit: "Mach",
      confidence: "estimated",
      note: "Peak terminal re-entry velocity, not cruise speed.",
    },
    warhead: {
      value: 1500,
      unit: "kg",
      confidence: "estimated",
      note: "Nuclear-capable. Payload figures for strategic systems are never officially published.",
    },
    length: { value: 17.5, unit: "m", confidence: "reported" },
    diameter: { value: 2, unit: "m", confidence: "reported" },
    launchWeight: { value: 50000, unit: "kg", confidence: "estimated" },
    guidance: [
      "Ring laser gyroscope inertial navigation system",
      "Micro inertial navigation system",
      "Optional satellite update",
    ],
    propulsion: "Three-stage solid propellant with composite motor casings",
    platforms: ["Canisterised road-mobile transporter-erector-launcher", "Rail-mobile launcher"],
  },

  variants: [
    { name: "Agni-V baseline", year: 2012, change: "First flight test." },
    { name: "Canisterised version", year: 2015, change: "Sealed canister launch from a road-mobile TEL, cutting reaction time." },
    { name: "Mission Divyastra", year: 2024, change: "First flight test with MIRV — multiple independently targetable warheads on one missile." },
  ],

  images: [],

  ssb: {
    whyItMatters:
      "Agni-V is the land leg of the nuclear triad and the usual entry point into any interview discussion of deterrence, No First Use, and second-strike capability.",
    hooks: [
      "Solid fuel plus canisterisation equals a short reaction time.",
      "Mission Divyastra, March 2024 — India's first MIRV flight test.",
      "Road-mobile launch is what makes the deterrent survivable.",
    ],
    likelyAsked: [
      "What is the nuclear triad and which system forms each leg?",
      "What does MIRV mean and why does it matter?",
      "Why is a canisterised missile better than a non-canisterised one?",
      "What is India's No First Use policy?",
    ],
    confusedWith: ["agni-p", "k-4"],
  },

  sources: [
    {
      title: "Defence Research and Development Organisation",
      publisher: "Ministry of Defence, Government of India",
      url: "https://www.drdo.gov.in/",
      accessed: "2026-08-28",
    },
    {
      title: "Press Information Bureau — Ministry of Defence releases",
      publisher: "Government of India",
      url: "https://pib.gov.in/",
      accessed: "2026-08-28",
    },
  ],

  lastVerified: "2026-08-28",
});
