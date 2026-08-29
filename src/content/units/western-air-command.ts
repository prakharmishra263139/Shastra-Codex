import { defineUnit } from "./schema";

export default defineUnit({
  slug: "western-air-command",
  name: "Western Air Command",
  aliases: ["WAC"],

  force: "air-force",
  type: "command",

  hq: "New Delhi",
  role: "Air defence of northern and western India",

  summary:
    "The Air Force's largest command, headquartered in New Delhi, covering air defence over the country's northern and western sectors.",

  description: [
    "Western Air Command is headquartered at Subroto Park in New Delhi and is the largest of the Air Force's operational commands, with more than fifty bases and stations under it.",
    "It carries responsibility for the air defence of northern and western India, including the sectors facing two of the country's most sensitive land borders.",
  ],

  hooks: ["Largest IAF command by number of bases.", "HQ Subroto Park, New Delhi."],

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
