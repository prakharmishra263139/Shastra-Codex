import { defineUnit } from "./schema";

export default defineUnit({
  slug: "south-western-air-command",
  name: "South Western Air Command",
  aliases: ["SWAC"],

  force: "air-force",
  type: "command",

  hq: "Gandhinagar",
  role: "Air defence over Rajasthan and Gujarat",

  summary:
    "Headquartered in Gandhinagar, the newest of the operational commands, covering the desert and western-seaboard sector facing Pakistan.",

  description: [
    "South Western Air Command is headquartered in Gandhinagar, Gujarat, and covers air defence over the Rajasthan and Gujarat sector — largely desert terrain, and one of the more recently constituted of the Air Force's operational commands.",
  ],

  hooks: ["HQ Gandhinagar — covers the Rajasthan/Gujarat desert sector."],

  sources: [
    {
      title: "Our Commands — Indian Air Force",
      publisher: "Indian Air Force",
      url: "https://indianairforce.nic.in/our-commands/",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
