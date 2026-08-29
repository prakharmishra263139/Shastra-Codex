import { defineUnit } from "./schema";

export default defineUnit({
  slug: "training-command",
  name: "Training Command",
  aliases: ["TC"],

  force: "air-force",
  type: "command",

  hq: "Bengaluru",
  role: "Flying and ground training across the Air Force",

  summary:
    "A functional rather than regional command, headquartered in Bengaluru, responsible for all Air Force flying and ground training.",

  description: [
    "Training Command is one of the Air Force's two functional commands — organised by role rather than geography — headquartered in Bengaluru. It oversees flying training and ground trades training across the service, from initial selection through to operational conversion.",
  ],

  hooks: ["Functional, not regional — one of two, alongside Maintenance Command.", "HQ Bengaluru."],

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
