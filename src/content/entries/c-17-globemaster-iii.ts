import { defineEntry } from "../schema";

export default defineEntry({
  slug: "c-17-globemaster-iii",
  name: "Boeing C-17 Globemaster III",
  aliases: ["C-17", "Globemaster III", "Skylord"],

  category: "aircraft",
  class: "transport",
  tags: ["strategic-airlift", "hadr", "boeing", "heavy-lift"],

  origin: ["United States"],
  developer: ["McDonnell Douglas"],
  manufacturer: ["Boeing"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2013,
  quantity: {
    value: 11,
    unit: "aircraft",
    confidence: "reported",
    note: "Ten ordered in 2011 and delivered by 2014, plus a single additional aircraft delivered in 2019.",
  },

  summary:
    "Four-engine strategic airlifter that gave the Air Force the ability to move heavy loads between continents without staging.",

  description: [
    "The C-17 is a four-engine strategic transport designed to combine two capabilities that normally trade against each other: intercontinental range with a heavy load, and the ability to operate from short, semi-prepared runways. It can carry outsize cargo that no other Indian aircraft can accept, and then land it on a strip an airliner could not use.",
    "India signed for ten aircraft in 2011 under a US Foreign Military Sale, with deliveries running from 2013 to 2014 and an eleventh aircraft following in 2019. They are flown by No. 81 Squadron, the Skylords, based at Hindon.",
    "In practice the fleet has spent as much time on humanitarian work as on military tasks. C-17s carried out the evacuation flights from Yemen, Afghanistan, Ukraine and Sudan, moved relief after earthquakes in Nepal and Turkey, and sustained the rapid build-up in eastern Ladakh in 2020. That dual use — strategic reach for war, and the same reach for disaster relief and evacuation — is the argument for owning a strategic airlifter at all.",
  ],

  specs: {
    category: "aircraft",
    role: "Four-engine strategic airlifter",
    crew: 3,
    maxSpeed: {
      value: 830,
      unit: "km/h",
      confidence: "reported",
      note: "Typical cruise, around Mach 0.74.",
    },
    combatRadius: {
      value: 4482,
      unit: "km",
      confidence: "reported",
      note: "Range carrying a near-maximum payload. Considerably further with a lighter load, and unlimited with air-to-air refuelling.",
    },
    serviceCeiling: {
      value: 13716,
      unit: "m",
      confidence: "reported",
      note: "45,000 ft.",
    },
    payload: {
      value: 77519,
      unit: "kg",
      confidence: "reported",
      note: "Maximum payload. Published figures vary between roughly 74,000 and 77,500 kg depending on the configuration quoted.",
    },
    engines:
      "Four Pratt & Whitney F117-PW-100 turbofans, about 180 kN each, with thrust reversers usable on the ground",
    sensors:
      "Weather and ground-mapping radar, head-up displays and a quadruplex digital flight control system; defensive aids include missile warning and countermeasures dispensers",
  },

  variants: [
    {
      name: "C-17ER (Block 17)",
      year: 2013,
      change:
        "The extended-range production standard delivered to India, with the centre wing fuel tank fitted as standard.",
    },
    {
      name: "Eleventh aircraft",
      year: 2019,
      change:
        "One additional airframe acquired from the last of Boeing's unsold production run after the line closed.",
    },
  ],

  images: [
    {
      src: "/images/c-17-cb8001.webp",
      alt: "Indian Air Force C-17 Globemaster III, tail number CB-8001, being loaded on a wet apron under heavy cloud, with the T-tail and four underwing engines visible.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "Strategic airlift is how a country turns intent into presence, and the C-17 is the clearest illustration of it — the same aeroplane that reinforces Ladakh in a crisis flies the evacuation out of Kabul or Khartoum. It is the natural entry point to a question about India's role as a first responder in the region.",
    hooks: [
      "Eleven aircraft, No. 81 Squadron 'Skylords', based at Hindon.",
      "Strategic reach with tactical landing — intercontinental range, but it can use a short semi-prepared strip.",
      "Kabul, Yemen, Ukraine, Sudan, Nepal, Turkey — the evacuation and relief workhorse.",
      "The production line has closed, so no more can be bought.",
    ],
    likelyAsked: [
      "What is the difference between strategic and tactical airlift?",
      "Why does an air force need a transport aircraft this large?",
      "How did the C-17 fleet matter during the 2020 Ladakh stand-off?",
      "What is HADR and what role does the Air Force play in it?",
    ],
    confusedWith: ["c-295"],
  },

  sources: [
    {
      title: "Boeing — C-17 Globemaster III",
      publisher: "Boeing",
      url: "https://www.boeing.com/",
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
