import { defineUnit } from "./schema";

export default defineUnit({
  slug: "southern-naval-command",
  name: "Southern Naval Command",
  aliases: ["SNC"],

  force: "navy",
  type: "command",

  hq: "Kochi",
  role: "Training command of the Indian Navy",

  summary:
    "Headquartered at INS Venduruthy in Kochi, and unlike its two counterparts, the Navy's dedicated training command rather than a fleet command.",

  description: [
    "Southern Naval Command is headquartered at INS Venduruthy in Kochi, Kerala. Unlike Western and Eastern Naval Command, it does not host an operational fleet — it functions as the Navy's principal training command, running most of the service's basic and specialist training establishments.",
  ],

  hooks: ["HQ Kochi (INS Venduruthy) — the Navy's training command, not a fleet command."],

  sources: [
    {
      title: "Southern Naval Command — Indian Navy",
      publisher: "Indian Navy",
      url: "https://www.indiannavy.nic.in/content/southern-naval-command",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
