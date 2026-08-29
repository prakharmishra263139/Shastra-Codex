import { defineUnit } from "./schema";

export default defineUnit({
  slug: "corps-of-engineers",
  name: "Corps of Engineers",
  aliases: ["Sappers", "Madras Sappers", "Bengal Sappers", "Bombay Sappers"],

  force: "army",
  type: "corps",

  raised: 1780,
  role: "Combat engineering — bridging, mine warfare, fortification",

  summary:
    "The Army's combat engineers, built around three Sapper groups whose lineage the Corps traces to 1780, one of the oldest arms in the Army.",

  description: [
    "The Corps of Engineers officially recognises 1780 as its founding year, when the senior-most of its three groups, the Madras Sappers, was raised — though its earliest surviving sub-unit, 18 Field Company, dates back further, to 1777.",
    "It is organised into three regional groups — Madras Sappers, Bengal Sappers and Bombay Sappers — that between them provide the Army's bridging, mine-laying and mine-clearance, fortification and general combat engineering support.",
  ],

  hooks: [
    "Traces its lineage to 1780 — among the oldest arms in the Army.",
    "Three groups: Madras, Bengal and Bombay Sappers.",
    "Also called 'Sappers'.",
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
