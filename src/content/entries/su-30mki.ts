import { defineEntry } from "../schema";

export default defineEntry({
  slug: "su-30mki",
  name: "Sukhoi Su-30MKI",
  aliases: ["Su-30MKI", "Flanker-H", "Super Sukhoi"],

  category: "aircraft",
  class: "fighter",
  tags: ["air-superiority", "multirole", "hal", "thrust-vectoring", "brahmos"],

  origin: ["Russia", "India"],
  developer: ["Sukhoi Design Bureau"],
  manufacturer: ["Hindustan Aeronautics Limited", "Irkut Corporation"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2002,
  quantity: {
    value: 260,
    unit: "aircraft",
    confidence: "reported",
    note: "Approximate fleet strength. Attrition and the pace of the upgrade programme both move this figure.",
  },

  summary:
    "The Air Force's heavyweight air superiority fighter and the backbone of its combat fleet, licence-built by HAL at Nashik.",

  description: [
    "The Su-30MKI is a twin-engine, two-seat, long-range multirole fighter developed by Sukhoi to an Indian specification. MKI stands for Modernizirovannyy Kommercheskiy Indiski — modernised, commercial, Indian — and the aircraft is genuinely India-specific rather than an export Su-30 with a new badge.",
    "It was assembled from the start as a multinational aircraft: a Russian airframe and engines, French and Israeli avionics, and Indian systems integration. Most of the fleet has been licence-built by Hindustan Aeronautics Limited at Nashik rather than bought off the shelf, which is why the type matters as much to the self-reliance argument as to the order of battle.",
    "Two features define it in the air. Thrust-vectoring nozzles on the AL-31FP engines, paired with canards, give post-stall manoeuvrability that conventional fighters cannot match. And its size and payload make it the only IAF aircraft cleared to carry the air-launched BrahMos-A, turning a fighter into a long-range anti-ship and land-attack platform.",
  ],

  specs: {
    category: "aircraft",
    role: "Twin-engine, two-seat multirole air superiority fighter",
    crew: 2,
    maxSpeed: {
      value: 2,
      unit: "Mach",
      confidence: "reported",
      note: "At altitude. Roughly Mach 1.1 at sea level.",
    },
    combatRadius: {
      value: 1500,
      unit: "km",
      confidence: "estimated",
      note: "Without air-to-air refuelling. Varies sharply with profile and stores; the aircraft is refuelling-capable.",
    },
    serviceCeiling: {
      value: 17300,
      unit: "m",
      confidence: "reported",
      note: "Roughly 56,800 ft.",
    },
    payload: {
      value: 8000,
      unit: "kg",
      confidence: "reported",
      note: "External stores.",
    },
    hardpoints: 12,
    engines:
      "Two Saturn AL-31FP afterburning turbofans with thrust-vectoring nozzles, about 123 kN each with reheat",
    sensors:
      "N011M Bars passive electronically scanned array radar with an infrared search and track set; the upgrade programme replaces this with the indigenous Virupaksha AESA radar",
  },

  variants: [
    {
      name: "Su-30K",
      year: 1997,
      change:
        "Interim aircraft leased from Russia to begin conversion training while the MKI was still being developed. Later returned.",
    },
    {
      name: "Su-30MKI",
      year: 2002,
      change:
        "The definitive standard: thrust vectoring, canards, Bars radar and multinational avionics. Licence production at HAL Nashik followed.",
    },
    {
      name: "Su-30MKI (BrahMos-A)",
      change:
        "About 40 aircraft structurally modified to carry a single air-launched BrahMos on the centreline. First live firing in 2017.",
    },
    {
      name: "Super Sukhoi upgrade",
      change:
        "Mid-life upgrade centred on the indigenous Virupaksha AESA radar, new mission computer and expanded weapons fit. Cleared for the bulk of the fleet.",
    },
  ],

  images: [
    {
      src: "/images/su-30mki-flightline.webp",
      alt: "Indian Air Force Su-30MKI on the flight line with the canopy open, showing the twin tails with tricolour fin flash, canards ahead of the wing and the two widely spaced engines.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
    {
      src: "/images/su-30mki-inflight.webp",
      alt: "Su-30MKI banking overhead, seen from below, showing the twin engine nozzles, the wing roundels and the sheer wing area that gives the aircraft its payload.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "The Su-30MKI is the aircraft an interview reaches for when it wants to test whether you understand fleet composition rather than individual aeroplanes: it is the numerical backbone, the heavy end of a high-low mix with Tejas, and the platform that carries India's most distinctive weapon.",
    hooks: [
      "MKI = Modernised, Commercial, Indian. Specified by India, not an off-the-shelf export.",
      "Licence-built by HAL at Nashik — the fleet was largely made in India, not bought.",
      "Thrust vectoring plus canards: post-stall manoeuvres no conventional fighter can fly.",
      "The only IAF aircraft that carries the air-launched BrahMos-A.",
    ],
    likelyAsked: [
      "Why is the Su-30MKI called the backbone of the Indian Air Force?",
      "What does thrust vectoring give you that a conventional fighter cannot do?",
      "Why buy Rafale when the Air Force already had the Su-30MKI?",
      "What is the significance of the BrahMos-A fit?",
      "What does the Super Sukhoi upgrade actually change?",
    ],
    confusedWith: ["rafale", "tejas", "mirage-2000"],
  },

  sources: [
    {
      title: "Indian Air Force — official website",
      publisher: "Indian Air Force",
      url: "https://indianairforce.nic.in/",
      accessed: "2026-08-29",
    },
    {
      title: "Hindustan Aeronautics Limited — products",
      publisher: "Hindustan Aeronautics Limited",
      url: "https://hal-india.co.in/",
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
