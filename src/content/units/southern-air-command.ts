import { defineUnit } from "./schema";

export default defineUnit({
  slug: "southern-air-command",
  name: "Southern Air Command",
  aliases: ["SAC"],

  force: "air-force",
  type: "command",

  hq: "Thiruvananthapuram",
  role: "Air defence of peninsular and southern India",

  summary:
    "Headquartered in Thiruvananthapuram, responsible for air defence over peninsular and southern India.",

  description: [
    "Southern Air Command is headquartered in Thiruvananthapuram, Kerala, and covers the air defence of peninsular and southern India.",
  ],

  hooks: ["HQ Thiruvananthapuram."],

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
