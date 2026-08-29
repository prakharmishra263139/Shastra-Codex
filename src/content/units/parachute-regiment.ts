import { defineUnit } from "./schema";

export default defineUnit({
  slug: "parachute-regiment",
  name: "Parachute Regiment",
  aliases: ["Para", "Para Regiment"],

  force: "army",
  type: "regiment",

  raised: 1952,
  role: "Airborne infantry and special forces",

  summary:
    "The Army's airborne arm, re-raised in 1952 after wartime Indian parachute units were disbanded, and now the parent regiment of the Para Special Forces.",

  description: [
    "Indian airborne units first formed during the Second World War in 1945, but were disbanded shortly after. The Parachute Regiment as it exists in the independent Indian Army was re-raised in 1952.",
    "Alongside its conventional airborne infantry battalions, the regiment is the parent formation of the Para Special Forces battalions, which carry out the Army's special operations role.",
  ],

  hooks: [
    "Wartime parachute units (1945) disbanded; the regiment was re-raised in 1952.",
    "Parent regiment of the Para Special Forces — 'para' and 'para SF' are not the same thing.",
  ],

  sources: [
    {
      title: "Indian Army — official website",
      publisher: "Indian Army",
      url: "https://indianarmy.nic.in/",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
