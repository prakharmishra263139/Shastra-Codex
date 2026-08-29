import { defineUnit } from "./schema";

export default defineUnit({
  slug: "eastern-air-command",
  name: "Eastern Air Command",
  aliases: ["EAC"],

  force: "air-force",
  type: "command",

  hq: "Shillong",
  role: "Air defence of eastern India and the north-east",

  summary:
    "Headquartered in Shillong, responsible for air defence across eastern India and the north-eastern states.",

  description: [
    "Eastern Air Command is headquartered in Shillong, Meghalaya, and covers the air defence of eastern India and the north-eastern states — a sector defined as much by mountainous terrain and short runways as by the length of the border it faces.",
  ],

  hooks: ["HQ Shillong, Meghalaya."],

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
