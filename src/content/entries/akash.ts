import { defineEntry } from "../schema";

export default defineEntry({
  slug: "akash",
  name: "Akash",
  aliases: ["Akash Mk-1", "Akash-1S", "SAM-X"],

  category: "missiles",
  class: "surface-to-air",
  tags: ["air-defence", "indigenous", "ramjet", "drdo"],

  origin: ["India"],
  developer: ["DRDO (Defence Research and Development Laboratory)"],
  manufacturer: ["Bharat Dynamics Limited", "Bharat Electronics Limited"],
  operators: ["army", "air-force"],

  status: "in-service",
  inducted: 2014,

  summary:
    "Indigenous medium-range surface-to-air missile system built around the Rajendra phased-array radar.",

  description: [
    "Akash is a medium-range surface-to-air missile system developed under the Integrated Guided Missile Development Programme. A single battery can engage several targets at once, because the Rajendra passive phased-array radar tracks multiple tracks and guides multiple missiles simultaneously.",
    "The missile uses an integrated ramjet-rocket sustainer, so it keeps thrust through the whole engagement rather than coasting to the target after burnout. That preserves manoeuvring energy at the far edge of the envelope, where an intercepting missile normally runs out of the ability to turn.",
    "It matters for interviews because it is the workhorse of India's medium-tier air defence, sitting between short-range systems and the long-range S-400 in a layered network, and because it is substantially indigenous.",
  ],

  specs: {
    category: "missiles",
    range: {
      value: 25,
      min: 4.5,
      unit: "km",
      confidence: "reported",
      note: "Akash-NG extends this considerably. Engagement altitude reaches roughly 18 km.",
    },
    speed: { value: 2.5, unit: "Mach", confidence: "reported" },
    warhead: {
      value: 55,
      unit: "kg",
      confidence: "reported",
      note: "Pre-fragmented high explosive with proximity fuze.",
    },
    length: { value: 5.78, unit: "m", confidence: "reported" },
    diameter: { value: 0.35, unit: "m", confidence: "reported" },
    launchWeight: { value: 720, unit: "kg", confidence: "reported" },
    guidance: [
      "Command guidance from the Rajendra phased-array radar",
      "Mid-course inertial navigation",
    ],
    propulsion: "Integrated ramjet-rocket sustainer",
    platforms: ["Tracked launcher (Army)", "Wheeled trailer launcher (Air Force)"],
  },

  variants: [
    { name: "Akash Mk-1", year: 2014, change: "Baseline system, inducted by the Air Force and then the Army." },
    { name: "Akash-1S", year: 2019, change: "Added an indigenous seeker for improved terminal accuracy." },
    { name: "Akash Prime", year: 2021, change: "Improved seeker and reliable operation at higher altitudes and lower temperatures." },
    { name: "Akash-NG", change: "New-generation variant with an active seeker and extended range. In development." },
  ],

  images: [],

  ssb: {
    whyItMatters:
      "Akash is the clearest example of a fully indigenous, in-service air defence system, and it is the piece that explains what 'layered air defence' actually means in practice.",
    hooks: [
      "Guided by the Rajendra phased-array radar — one radar, several simultaneous engagements.",
      "Ramjet sustainer means it is still under power at maximum range.",
      "Sits in the medium tier between short-range systems and the S-400.",
    ],
    likelyAsked: [
      "What is layered air defence and where does Akash fit?",
      "How is Akash different from the S-400?",
      "What is the advantage of a ramjet over a solid rocket for a SAM?",
      "Which programme did Akash come out of?",
    ],
    confusedWith: ["qrsam", "mrsam"],
  },

  sources: [
    {
      title: "Defence Research and Development Organisation",
      publisher: "Ministry of Defence, Government of India",
      url: "https://www.drdo.gov.in/",
      accessed: "2026-08-28",
    },
    {
      title: "Bharat Dynamics Limited — products",
      publisher: "Bharat Dynamics Limited",
      url: "https://bdl-india.in/",
      accessed: "2026-08-28",
    },
  ],

  lastVerified: "2026-08-28",
});
