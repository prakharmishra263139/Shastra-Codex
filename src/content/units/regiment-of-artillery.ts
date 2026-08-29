import { defineUnit } from "./schema";

export default defineUnit({
  slug: "regiment-of-artillery",
  name: "Regiment of Artillery",
  aliases: ["Gunners", "Indian Artillery"],

  force: "army",
  type: "regiment",

  raised: 1935,
  role: "Field, medium and air-defence artillery fire support",

  summary:
    "The Army's fire support arm — field, medium and air-defence artillery, raised as a single regiment in 1935 and now one of the largest arms by strength.",

  description: [
    "The Regiment of Artillery was raised on 15 January 1935 as 'A' Field Brigade, Indian Artillery, at Bangalore, with four horse-drawn batteries — the first time Indian artillery units were organised as a distinct regiment rather than attached piecemeal to other formations.",
    "It now covers the full range of indirect fire: towed and self-propelled guns, multi-barrel rocket systems, and surface-to-air missile regiments for air defence, making it one of the largest arms of the Army by both personnel and equipment holdings.",
  ],

  hooks: [
    "Raised 1935 — one of the newer arms, not a colonial-era holdover.",
    "Nicknamed 'the Gunners'.",
    "Covers field, medium, rocket and air-defence artillery under one regiment.",
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
