import { defineUnit } from "./schema";

export default defineUnit({
  slug: "western-naval-command",
  name: "Western Naval Command",
  aliases: ["WNC", "Sword Arm"],

  force: "navy",
  type: "command",

  hq: "Mumbai",
  role: "Maritime operations across the Arabian Sea and western seaboard",

  summary:
    "Headquartered in Mumbai, host to the Western Fleet, and responsible for the Navy's Arabian Sea and western-seaboard operations.",

  description: [
    "Western Naval Command is headquartered in Mumbai and covers maritime operations across the Arabian Sea and India's western seaboard. It hosts the Western Fleet and is informally known within the Navy as the 'Sword Arm'.",
  ],

  hooks: ["HQ Mumbai — hosts the Western Fleet.", "Informally the 'Sword Arm' of the Navy."],

  sources: [
    {
      title: "Flag Officer Commanding-in-Chief, Western Naval Command — Indian Navy",
      publisher: "Indian Navy",
      url: "https://indiannavy.nic.in/content/flag-officer-commanding-chief-western-naval-command-0",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
