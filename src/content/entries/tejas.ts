import { defineEntry } from "../schema";

export default defineEntry({
  slug: "tejas",
  name: "HAL Tejas",
  aliases: ["LCA Tejas", "Light Combat Aircraft", "Tejas Mk-1A"],

  category: "aircraft",
  class: "fighter",
  tags: ["indigenous", "hal", "multirole", "fly-by-wire"],

  origin: ["India"],
  developer: ["Aeronautical Development Agency"],
  manufacturer: ["Hindustan Aeronautics Limited"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2016,

  summary:
    "India's indigenous single-engine multirole light fighter, the smallest and lightest in its class.",

  description: [
    "Tejas is the product of the Light Combat Aircraft programme, run by the Aeronautical Development Agency and manufactured by HAL. It entered squadron service with the Indian Air Force in 2016, replacing the ageing MiG-21 fleet.",
    "It is a tailless compound delta design with relaxed static stability, meaning the airframe is deliberately unstable and is held in controlled flight by a quadruplex digital fly-by-wire system. That instability is what gives it agility; the flight control software is arguably the single hardest part of the programme and is fully indigenous.",
    "Extensive use of composites keeps the structure light and reduces the radar signature. The Mk-1A, contracted in 2021, adds an AESA radar, an electronic warfare suite and beyond-visual-range missile capability.",
  ],

  specs: {
    category: "aircraft",
    role: "Single-engine multirole light fighter",
    crew: 1,
    maxSpeed: {
      value: 1.8,
      unit: "Mach",
      confidence: "reported",
      note: "At altitude.",
    },
    combatRadius: {
      value: 500,
      unit: "km",
      confidence: "estimated",
      note: "Varies considerably with mission profile and external stores.",
    },
    serviceCeiling: {
      value: 15000,
      unit: "m",
      confidence: "reported",
      note: "Roughly 50,000 ft.",
    },
    payload: { value: 3500, unit: "kg", confidence: "reported", note: "External stores." },
    hardpoints: 8,
    engines:
      "One General Electric F404-IN20 afterburning turbofan, about 84 kN with reheat",
    sensors:
      "EL/M-2032 multi-mode radar on the Mk-1; EL/M-2052 AESA radar and an electronic warfare suite on the Mk-1A",
  },

  variants: [
    { name: "Tejas Mk-1", year: 2016, change: "Initial Operational Clearance version; first squadron, No. 45 'Flying Daggers'." },
    { name: "Tejas Mk-1 FOC", year: 2019, change: "Final Operational Clearance, adding air-to-air refuelling and beyond-visual-range missiles." },
    { name: "Tejas Mk-1A", year: 2024, change: "AESA radar, self-protection jammer, improved maintainability. 83 ordered in 2021, further orders since." },
    { name: "Tejas Mk-2 (MWF)", change: "Larger, more powerful Medium Weight Fighter with canards. In development." },
  ],

  images: [
    {
      src: "/images/tejas-la5034-approach.jpg",
      alt: "Indian Air Force Tejas, serial LA-5034, on approach with undercarriage down, carrying wingtip missiles and a centreline drop tank.",
      credit: "Aseem Borkar / Pexels",
      license: "Pexels License",
      sourceUrl: "https://www.pexels.com/",
    },
    {
      src: "/images/tejas-la5034-gear-down.jpg",
      alt: "Side view of Tejas LA-5034 in flight, showing the tailless compound delta wing and single air intake.",
      credit: "Aseem Borkar / Pexels",
      license: "Pexels License",
      sourceUrl: "https://www.pexels.com/",
    },
  ],

  ssb: {
    whyItMatters:
      "Tejas is the flagship answer to any question about self-reliance in defence aviation, and the natural way into a discussion of the Air Force's squadron strength shortfall.",
    hooks: [
      "The smallest and lightest supersonic fighter in its class.",
      "Relaxed static stability — deliberately unstable, flyable only because of indigenous fly-by-wire software.",
      "Replaced the MiG-21; first squadron was No. 45, the Flying Daggers.",
    ],
    likelyAsked: [
      "What does relaxed static stability mean and why design an aircraft that way?",
      "How is Tejas Mk-1A different from Mk-1?",
      "Why is the Air Force short of squadrons and how does Tejas address that?",
      "What is the difference between IOC and FOC?",
    ],
    confusedWith: ["rafale", "su-30mki", "amca"],
  },

  sources: [
    {
      title: "Hindustan Aeronautics Limited — products",
      publisher: "Hindustan Aeronautics Limited",
      url: "https://hal-india.co.in/",
      accessed: "2026-08-28",
    },
    {
      title: "Indian Air Force — official website",
      publisher: "Indian Air Force",
      url: "https://indianairforce.nic.in/",
      accessed: "2026-08-28",
    },
  ],

  lastVerified: "2026-08-28",
});
