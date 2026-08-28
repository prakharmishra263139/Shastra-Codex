import { defineEntry } from "../schema";

export default defineEntry({
  slug: "t-90s-bhishma",
  name: "T-90S Bhishma",
  aliases: ["T-90S", "Bhishma"],

  category: "armour",
  class: "main-battle-tank",
  tags: ["licence-built", "russian-origin", "autoloader"],

  origin: ["Russia", "India"],
  developer: ["Uralvagonzavod"],
  manufacturer: ["Heavy Vehicles Factory, Avadi", "Uralvagonzavod"],
  operators: ["army"],

  status: "in-service",
  inducted: 2001,

  summary:
    "Licence-built Russian main battle tank forming the mainstay of India's armoured regiments.",

  description: [
    "The T-90S is the numerical backbone of the Indian Army's armoured corps. Ordered from Russia in 2001 and subsequently licence-produced at Heavy Vehicles Factory, Avadi, it was acquired to answer Pakistan's induction of the T-80UD.",
    "Its design philosophy is the opposite of the Arjun's. An autoloader removes the fourth crew member and allows a much lower, smaller turret, which makes the tank harder to hit and considerably lighter at around 46.5 tonnes. The 125 mm smoothbore gun can also fire a guided missile through the barrel, giving it a stand-off engagement option.",
    "Protection combines composite armour with Kontakt-5 explosive reactive armour and the Shtora-1 soft-kill system, which uses infrared jammers and smoke to defeat incoming guided missiles rather than absorbing the hit.",
  ],

  specs: {
    category: "armour",
    weight: { value: 46.5, unit: "t", confidence: "reported" },
    crew: 3,
    mainGun:
      "125 mm 2A46M smoothbore with autoloader, capable of firing the Refleks gun-launched guided missile",
    ammoCarried: 43,
    enginePower: {
      value: 1000,
      unit: "hp",
      confidence: "reported",
      note: "V-92S2 diesel on later batches; earlier tanks used the 840 hp V-84MS.",
    },
    topSpeed: { value: 60, unit: "km/h", confidence: "reported" },
    operationalRange: {
      value: 550,
      unit: "km",
      confidence: "reported",
      note: "With external fuel drums fitted.",
    },
    armourType: "Composite armour with Kontakt-5 explosive reactive armour",
    fireControl:
      "1A45T fire control with thermal sight, coupled to the Shtora-1 soft-kill active protection system",
  },

  variants: [
    { name: "T-90S", year: 2001, change: "Initial batch delivered from Russia." },
    { name: "T-90S Bhishma", year: 2004, change: "Licence production begins at Avadi with Indian subsystems." },
    { name: "T-90MS upgrade path", change: "Proposed upgrade with improved fire control and protection." },
  ],

  images: [],

  ssb: {
    whyItMatters:
      "The T-90 versus Arjun comparison is one of the most common technical questions put to candidates, because it exposes real engineering trade-offs rather than asking for memorised numbers.",
    hooks: [
      "Autoloader means a crew of three and a much lower turret.",
      "46.5 t against the Arjun's 58.5 t — strategically far easier to move.",
      "Shtora-1 defeats a missile by jamming it, not by stopping it.",
    ],
    likelyAsked: [
      "Why did India buy the T-90 when the Arjun was already in development?",
      "What are the advantages and disadvantages of an autoloader?",
      "What is explosive reactive armour?",
      "What is the difference between active and passive protection?",
    ],
    confusedWith: ["arjun"],
  },

  sources: [
    {
      title: "Indian Army — official website",
      publisher: "Indian Army",
      url: "https://indianarmy.nic.in/",
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
