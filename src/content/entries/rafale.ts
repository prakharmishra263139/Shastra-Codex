import { defineEntry } from "../schema";

export default defineEntry({
  slug: "rafale",
  name: "Dassault Rafale",
  aliases: ["Rafale EH", "Rafale DH", "Rafale M"],

  category: "aircraft",
  class: "fighter",
  tags: ["multirole", "french-origin", "aesa", "meteor", "carrier-capable"],

  origin: ["France"],
  developer: ["Dassault Aviation"],
  manufacturer: ["Dassault Aviation"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2020,

  summary:
    "Twin-engine French omnirole fighter, acquired in a 36-aircraft government-to-government deal and armed with the Meteor missile.",

  description: [
    "The Rafale is a twin-engine, canard-delta multirole fighter built by Dassault Aviation. India signed a government-to-government agreement with France in 2016 for 36 aircraft — 30 single-seat Rafale EH and 6 twin-seat Rafale DH — after the earlier 126-aircraft Medium Multi-Role Combat Aircraft tender was abandoned. Deliveries ran from 2020 to 2022.",
    "Dassault describes it as 'omnirole' rather than multirole: the aircraft is designed to switch between air superiority, ground attack, reconnaissance and nuclear strike within a single sortie, rather than being reconfigured on the ground between missions. The RBE2-AA AESA radar and the SPECTRA electronic warfare suite are the two systems that make that claim credible.",
    "For India the decisive capability was the Meteor beyond-visual-range missile, whose ramjet sustainer gives it a substantially larger no-escape zone than the missiles carried by regional counterparts. The aircraft also received a package of India-Specific Enhancements, including cold-start capability at high-altitude bases and a helmet-mounted display.",
    "In April 2025 India signed a further contract for 26 Rafale M, the carrier-capable naval variant, for operation from INS Vikrant.",
  ],

  specs: {
    category: "aircraft",
    role: "Twin-engine omnirole fighter",
    crew: 1,
    maxSpeed: {
      value: 1.8,
      unit: "Mach",
      confidence: "reported",
      note: "The twin-seat Rafale DH is otherwise identical in performance.",
    },
    combatRadius: {
      value: 1850,
      unit: "km",
      confidence: "estimated",
      note: "Manufacturer figure for a penetration mission with three drop tanks. Real radius varies sharply with load.",
    },
    serviceCeiling: {
      value: 15235,
      unit: "m",
      confidence: "reported",
      note: "Roughly 50,000 ft.",
    },
    payload: { value: 9500, unit: "kg", confidence: "reported", note: "External stores." },
    hardpoints: 14,
    engines:
      "Two Safran M88-2 afterburning turbofans, about 75 kN each with reheat",
    sensors:
      "Thales RBE2-AA active electronically scanned array radar, SPECTRA electronic warfare suite, Front Sector Optronics infrared search and track",
  },

  variants: [
    { name: "Rafale EH", year: 2020, change: "Single-seat Air Force version. 30 of the 36 ordered. First aircraft delivered to No. 17 Squadron, the Golden Arrows, at Ambala." },
    { name: "Rafale DH", year: 2020, change: "Twin-seat version, 6 ordered. Second squadron, No. 101, based at Hasimara." },
    { name: "India-Specific Enhancements", change: "Helmet-mounted display, cold-start capability at high-altitude bases, radar and electronic warfare changes specified by the Indian Air Force." },
    { name: "Rafale M", year: 2025, change: "Carrier-capable naval variant. 26 ordered in April 2025 for the Indian Navy, to operate from INS Vikrant. Not yet delivered." },
  ],

  images: [
    {
      src: "/images/rafale-17-profile.jpg",
      alt: "A Dassault Rafale in flight with landing gear extended, showing the canard-delta configuration, twin engines and underwing drop tanks. Aircraft number 17; not an Indian Air Force machine.",
      credit: "thales13 / Pexels",
      license: "Pexels License",
      sourceUrl: "https://www.pexels.com/",
    },
    {
      src: "/images/rafale-17-head-on.jpg",
      alt: "Head-on view of a Rafale on approach, showing the close-coupled canards ahead of the delta wing and the twin intakes.",
      credit: "thales13 / Pexels",
      license: "Pexels License",
      sourceUrl: "https://www.pexels.com/",
    },
    {
      src: "/images/rafale-m-marine-41.jpg",
      alt: "A French Navy Rafale M, marked MARINE and numbered 41, climbing with gear down. This is the carrier variant of the type India ordered for the Navy in 2025.",
      credit: "thales13 / Pexels",
      license: "Pexels License",
      sourceUrl: "https://www.pexels.com/",
    },
  ],

  ssb: {
    whyItMatters:
      "The Rafale is the usual way an interview gets into procurement policy — why a government-to-government deal replaced the MMRCA tender, what capability gap it filled, and how it fits alongside an indigenous programme like Tejas.",
    hooks: [
      "36 aircraft, government-to-government, signed 2016; delivered 2020 to 2022.",
      "Two squadrons: No. 17 Golden Arrows at Ambala, No. 101 at Hasimara.",
      "The Meteor missile, not the airframe, is the real capability jump.",
      "26 Rafale M ordered in April 2025 for the Navy.",
    ],
    likelyAsked: [
      "Why did India buy the Rafale instead of ordering more Su-30MKIs?",
      "What happened to the MMRCA tender?",
      "What makes the Meteor missile different from other BVR missiles?",
      "Does buying French aircraft contradict Atmanirbhar Bharat?",
      "Why does the Navy need Rafale M rather than more MiG-29Ks?",
    ],
    confusedWith: ["tejas", "su-30mki"],
  },

  sources: [
    {
      title: "Dassault Aviation — Rafale",
      publisher: "Dassault Aviation",
      url: "https://www.dassault-aviation.com/",
      accessed: "2026-08-29",
    },
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
  ],

  lastVerified: "2026-08-29",
});
