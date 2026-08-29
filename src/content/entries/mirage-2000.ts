import { defineEntry } from "../schema";

export default defineEntry({
  slug: "mirage-2000",
  name: "Dassault Mirage 2000",
  aliases: ["Mirage 2000H", "Vajra", "Mirage 2000I"],

  category: "aircraft",
  class: "fighter",
  tags: ["multirole", "delta-wing", "precision-strike", "kargil", "balakot"],

  origin: ["France"],
  developer: ["Dassault Aviation"],
  manufacturer: ["Dassault Aviation"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 1985,
  quantity: {
    value: 45,
    unit: "aircraft",
    confidence: "estimated",
    note: "Approximate remaining strength after attrition, including aircraft acquired second-hand from France for spares and attrition replacement.",
  },

  summary:
    "France-built single-engine multirole fighter, named Vajra in Indian service and the aircraft that delivered the Kargil and Balakot strikes.",

  description: [
    "The Mirage 2000 is a single-engine, single-seat multirole fighter with a tailless delta wing, ordered by India in 1982 as an answer to Pakistan's acquisition of the F-16. It entered Indian service in 1985 and was given the Indian name Vajra, the thunderbolt.",
    "It has always been regarded within the Air Force as an exceptionally clean aircraft to fly and maintain, with a reputation for serviceability that heavier types have struggled to match. That reliability, rather than raw performance, is a large part of why it has repeatedly been the aircraft chosen when a mission had to work first time.",
    "Two of those missions define its reputation. In the 1999 Kargil conflict the Mirage fleet was hurriedly cleared to drop laser-guided bombs and struck Pakistani positions on Tiger Hill at altitudes no one had planned for. In February 2019 Mirage 2000s carried out the Balakot strike. An upgrade programme begun in 2011 took the fleet to the Mirage 2000I standard with a new radar, avionics and the MICA missile.",
  ],

  specs: {
    category: "aircraft",
    role: "Single-engine, single-seat multirole fighter",
    crew: 1,
    maxSpeed: {
      value: 2.2,
      unit: "Mach",
      confidence: "reported",
      note: "At altitude.",
    },
    combatRadius: {
      value: 1000,
      unit: "km",
      confidence: "estimated",
      note: "Hi-lo-hi profile with external tanks. Published figures vary widely with load.",
    },
    serviceCeiling: {
      value: 17060,
      unit: "m",
      confidence: "reported",
      note: "Roughly 56,000 ft.",
    },
    payload: {
      value: 6300,
      unit: "kg",
      confidence: "reported",
      note: "External stores.",
    },
    hardpoints: 9,
    engines:
      "One SNECMA M53-P2 afterburning turbofan, about 95 kN with reheat",
    sensors:
      "Thomson-CSF RDM/RDI radar as delivered; Thales RDY-2 radar, new mission computer and MICA missile integration on upgraded Mirage 2000I aircraft",
  },

  variants: [
    {
      name: "Mirage 2000H / TH",
      year: 1985,
      change:
        "Original Indian single-seat (H) and twin-seat trainer (TH) aircraft, named Vajra. Two squadrons at Gwalior.",
    },
    {
      name: "Kargil LGB fit",
      year: 1999,
      change:
        "Rapid wartime clearance to carry laser-guided bombs, used against Pakistani positions on Tiger Hill and Muntho Dhalo.",
    },
    {
      name: "Mirage 2000I / TI",
      year: 2015,
      change:
        "Mid-life upgrade contracted in 2011: RDY-2 radar, glass cockpit, new electronic warfare suite and MICA air-to-air missiles.",
    },
  ],

  images: [
    {
      src: "/images/mirage-delta.webp",
      alt: "A Mirage-family delta-wing fighter on an apron. Note the single nose air intake with a centre shock cone: this is an earlier Mirage III/5 generation aircraft, not the side-intake Mirage 2000 flown by the Indian Air Force.",
      credit: "Magda Ehlers",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "The Mirage is the shortest route from an aircraft to an operation. Kargil and Balakot are both squarely on the syllabus, and both were flown by this type — which makes it the natural way to talk about air power as an instrument of policy rather than a list of specifications.",
    hooks: [
      "Indian name: Vajra, the thunderbolt. Ordered in 1982 as the answer to Pakistan's F-16s.",
      "Tiger Hill, Kargil 1999 — laser-guided bombs, cleared for the aircraft mid-conflict.",
      "Balakot, February 2019.",
      "Upgraded to Mirage 2000I standard with the RDY-2 radar and MICA missiles.",
    ],
    likelyAsked: [
      "What role did the Mirage 2000 play in the Kargil conflict?",
      "Why was the Mirage chosen for the Balakot strike rather than the Su-30MKI?",
      "Why did India upgrade the Mirage fleet instead of retiring it?",
      "What is the difference between the Mirage 2000 and the Rafale?",
    ],
    confusedWith: ["rafale", "jaguar", "su-30mki"],
  },

  sources: [
    {
      title: "Dassault Aviation — Mirage 2000",
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
