import { defineEntry } from "../schema";

export default defineEntry({
  slug: "c-295",
  name: "Airbus C-295",
  aliases: ["C295", "C-295MW", "Avro replacement"],

  category: "aircraft",
  class: "transport",
  tags: ["tactical-airlift", "make-in-india", "tata", "airbus", "turboprop"],

  origin: ["Spain", "India"],
  developer: ["Airbus Defence and Space"],
  manufacturer: ["Airbus Defence and Space", "Tata Advanced Systems"],
  operators: ["air-force"],

  status: "in-service",
  inducted: 2023,
  quantity: {
    value: 56,
    unit: "aircraft",
    confidence: "official",
    note: "Total contracted in September 2021: 16 delivered in flyaway condition from Seville, 40 to be built by Tata Advanced Systems at Vadodara.",
  },

  summary:
    "Twin-turboprop tactical transport replacing the Avro fleet, and the first military aircraft assembled in India by a private company.",

  description: [
    "The C-295 is a twin-turboprop medium tactical transport in the class between a light utility aircraft and a strategic airlifter. It carries a useful load into short, rough strips, has a rear ramp for paradrop and vehicle loading, and is cheap enough per flying hour to be used for the routine work that ties an air force together.",
    "India contracted for 56 aircraft in September 2021 to replace the ageing Avro HS-748 fleet. Sixteen were delivered from the Airbus line in Seville, the first arriving in September 2023. The remaining forty are being built by Tata Advanced Systems at a new final assembly line in Vadodara.",
    "That assembly line is the reason the programme matters beyond the aircraft. It is the first time a military aircraft has been assembled in India by a private company rather than by Hindustan Aeronautics Limited, and it establishes a domestic supply chain — including an indigenous electronic warfare suite from Bharat Electronics and Bharat Dynamics — for a type India will operate for decades.",
  ],

  specs: {
    category: "aircraft",
    role: "Twin-turboprop medium tactical transport",
    crew: 2,
    maxSpeed: {
      value: 480,
      unit: "km/h",
      confidence: "reported",
      note: "Maximum cruise.",
    },
    combatRadius: {
      value: 1300,
      unit: "km",
      confidence: "estimated",
      note: "Radius carrying a near-maximum load. Ferry range exceeds 4,500 km with a light load.",
    },
    serviceCeiling: {
      value: 9100,
      unit: "m",
      confidence: "reported",
      note: "Roughly 30,000 ft.",
    },
    payload: {
      value: 9250,
      unit: "kg",
      confidence: "reported",
      note: "Maximum payload; up to 71 troops or 49 paratroopers.",
    },
    engines:
      "Two Pratt & Whitney Canada PW127G turboprops, about 1,970 kW each, driving six-blade propellers",
    sensors:
      "Fully integrated glass cockpit with a digital avionics suite; Indian aircraft carry an indigenous electronic warfare suite from Bharat Electronics and Bharat Dynamics",
  },

  variants: [
    {
      name: "C-295MW (Seville-built)",
      year: 2023,
      change:
        "Sixteen aircraft delivered in flyaway condition from the Airbus line in Spain, the first in September 2023.",
    },
    {
      name: "C-295MW (Vadodara-built)",
      change:
        "Forty aircraft assembled by Tata Advanced Systems in Gujarat — the first military aircraft final assembly line in India run by a private company.",
    },
    {
      name: "Maritime patrol and AEW&C derivatives",
      change:
        "Airframe proposed as the basis for maritime patrol and airborne early warning variants for the Navy and Air Force. Not yet contracted as production aircraft.",
    },
  ],

  images: [
    {
      src: "/images/c-295-ca7103.webp",
      alt: "Indian Air Force C-295, tail number CA-7103, on approach with the undercarriage down, showing the high wing, rear ramp and six-blade propellers.",
      credit: "Uncredited — provenance not recorded",
      license: "Rights not verified",
    },
  ],

  ssb: {
    whyItMatters:
      "The C-295 is the cleanest current example of what Atmanirbhar Bharat looks like in practice — not an indigenous design, but an indigenous industrial base. It also lets you discuss the unglamorous half of air power: the tactical lift that supplies forward positions every day.",
    hooks: [
      "56 aircraft: 16 from Spain, 40 built by Tata at Vadodara.",
      "First military aircraft assembled in India by a private company, not HAL.",
      "Replaces the Avro HS-748, in service since the 1960s.",
      "Indian aircraft carry an indigenous electronic warfare suite from BEL and BDL.",
    ],
    likelyAsked: [
      "Why is the C-295 programme significant beyond the aircraft itself?",
      "What is the difference between tactical and strategic airlift?",
      "How does private-sector participation change Indian defence manufacturing?",
      "What was the Avro replacement programme and why did it take so long?",
    ],
    confusedWith: ["c-17-globemaster-iii"],
  },

  sources: [
    {
      title: "Airbus Defence and Space — C295",
      publisher: "Airbus",
      url: "https://www.airbus.com/",
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
