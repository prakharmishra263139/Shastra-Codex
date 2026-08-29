import { defineUnit } from "./schema";

export default defineUnit({
  slug: "eastern-naval-command",
  name: "Eastern Naval Command",
  aliases: ["ENC"],

  force: "navy",
  type: "command",

  hq: "Visakhapatnam",
  role: "Maritime operations across the Bay of Bengal and eastern seaboard",

  summary:
    "Headquartered in Visakhapatnam, host to the Eastern Fleet, and responsible for the Navy's Bay of Bengal and eastern-seaboard operations.",

  description: [
    "Eastern Naval Command is headquartered in Visakhapatnam, Andhra Pradesh, and covers maritime operations across the Bay of Bengal and India's eastern seaboard. It hosts the Eastern Fleet.",
  ],

  hooks: ["HQ Visakhapatnam — hosts the Eastern Fleet."],

  sources: [
    {
      title: "Flag Officer Commanding-in-Chief, Eastern Naval Command — Indian Navy",
      publisher: "Indian Navy",
      url: "https://indiannavy.nic.in/content/flag-officer-commanding-chief-eastern-naval-command",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
