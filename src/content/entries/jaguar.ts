import { defineEntry } from "../schema";

export default defineEntry({
  slug: "jaguar",
  name: "SEPECAT Jaguar",
  aliases: ["Shamsher", "Jaguar IS", "Jaguar IM", "DARIN III"],

  category: "aircraft",
  class: "fighter",
  tags: ["deep-penetration-strike", "hal", "maritime-strike", "darin"],

  origin: ["United Kingdom", "France"],
  developer: ["SEPECAT"],
  manufacturer: ["Hindustan Aeronautics Limited", "British Aerospace"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 1979,
  quantity: {
    value: 115,
    unit: "aircraft",
    confidence: "estimated",
    note: "Approximate remaining strength across six squadrons. The fleet is being progressively retired.",
  },

  summary:
    "Anglo-French deep penetration strike aircraft, named Shamsher in Indian service; India is the last air force still flying the type.",

  description: [
    "The Jaguar was designed jointly by Britain and France through SEPECAT as a low-level strike aircraft: not a dogfighter, but a machine built to fly fast and very low, under radar cover, and put ordnance precisely on a target deep behind the front line. India selected it in 1978 and gave it the name Shamsher, the sword of justice.",
    "Most of the Indian fleet was licence-built by Hindustan Aeronautics Limited at Bangalore, which is why the type has stayed in service far longer here than anywhere else. Britain and France retired theirs years ago; India is now the only operator flying Jaguars, and keeps them going through a series of avionics upgrades rather than replacement.",
    "It is the only aircraft in Indian service with overwing missile rails — a distinctive pair of pylons above the wings for self-defence air-to-air missiles, which frees every underwing station for strike stores. Successive DARIN navigation and attack upgrades have taken parts of the fleet to a modern standard, and a maritime-strike variant carries anti-ship missiles for the Navy's benefit.",
  ],

  specs: {
    category: "aircraft",
    role: "Twin-engine deep penetration strike aircraft",
    crew: 1,
    maxSpeed: {
      value: 1.6,
      unit: "Mach",
      confidence: "reported",
      note: "At altitude. The aircraft is optimised for high subsonic speed at very low level.",
    },
    combatRadius: {
      value: 900,
      unit: "km",
      confidence: "estimated",
      note: "Hi-lo-hi profile with a typical strike load.",
    },
    serviceCeiling: {
      value: 14000,
      unit: "m",
      confidence: "reported",
      note: "Roughly 46,000 ft.",
    },
    payload: {
      value: 4500,
      unit: "kg",
      confidence: "reported",
      note: "External stores.",
    },
    hardpoints: 7,
    engines:
      "Two Rolls-Royce/Turbomeca Adour Mk 811 turbofans, about 32.5 kN each with reheat",
    sensors:
      "DARIN navigation and attack system, upgraded to DARIN III with an EL/M-2052 AESA radar, new mission computer and a laser designator pod on part of the fleet",
  },

  variants: [
    {
      name: "Jaguar IS",
      year: 1979,
      change:
        "Single-seat strike version, the bulk of the fleet. Initial aircraft supplied from Britain, the remainder licence-built by HAL.",
    },
    {
      name: "Jaguar IB",
      change: "Twin-seat operational conversion trainer.",
    },
    {
      name: "Jaguar IM",
      change:
        "Maritime strike variant with Agave radar and anti-ship missiles, flown by a dedicated squadron.",
    },
    {
      name: "DARIN II",
      change:
        "Second-generation navigation and attack upgrade with a glass cockpit and improved weapons delivery.",
    },
    {
      name: "DARIN III",
      year: 2017,
      change:
        "AESA radar, new mission computer, autopilot and precision-guided munition capability. Applied to part of the fleet.",
    },
  ],

  images: [
    {
      src: "/images/jaguar-js193-static.webp",
      alt: "Indian Air Force Jaguar, tail number JS193, on static display loaded with underwing stores and a targeting pod, showing the shoulder-mounted wing and slender fuselage of a low-level strike aircraft.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
    {
      src: "/images/jaguar-js193-overwing.webp",
      alt: "Close view of the same Jaguar's overwing pylon carrying an air-to-air missile above the wing — the feature unique to the type in Indian service, which leaves every underwing station free for strike stores.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "The Jaguar is the cleanest example of role specialisation in the Air Force — an aircraft that is deliberately not a fighter — and of the cost of keeping an old fleet flying. It is also the type most likely to come up in a question about what the Air Force should retire and why.",
    hooks: [
      "Indian name: Shamsher. Anglo-French design, licence-built by HAL at Bangalore.",
      "India is the last air force in the world still flying the Jaguar.",
      "The only Indian aircraft with overwing missile rails.",
      "Built to fly low and fast, not to dogfight — a strike aircraft, not a fighter.",
    ],
    likelyAsked: [
      "What is a deep penetration strike aircraft and how does it differ from a fighter?",
      "Why is India still flying an aircraft everyone else has retired?",
      "What are the overwing missile rails for?",
      "Should the Jaguar fleet be re-engined or replaced?",
    ],
    confusedWith: ["mirage-2000", "su-30mki"],
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
