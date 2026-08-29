import { defineUnit } from "./schema";

export default defineUnit({
  slug: "central-air-command",
  name: "Central Air Command",
  aliases: ["CAC"],

  force: "air-force",
  type: "command",

  hq: "Prayagraj",
  role: "Air defence of central India",

  summary:
    "Headquartered in Prayagraj (Allahabad), covering air defence over the Gangetic plains and central India.",

  description: [
    "Central Air Command is headquartered in Prayagraj, Uttar Pradesh, and is responsible for air defence over central India, sitting geographically between the Western and Eastern commands.",
  ],

  hooks: ["HQ Prayagraj (Allahabad)."],

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
