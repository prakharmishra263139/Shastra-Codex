import { defineUnit } from "./schema";

export default defineUnit({
  slug: "maintenance-command",
  name: "Maintenance Command",
  aliases: ["MC"],

  force: "air-force",
  type: "command",

  hq: "Nagpur",
  role: "Overhaul, repair and maintenance of aircraft and equipment",

  summary:
    "The Air Force's other functional command, headquartered in Nagpur, responsible for depot-level overhaul and repair fleet-wide.",

  description: [
    "Maintenance Command is headquartered in Nagpur and is the second of the Air Force's two functional commands, running the depot-level overhaul, repair and maintenance base repair depots that keep aircraft, engines and ground equipment serviceable across every other command.",
  ],

  hooks: ["Functional, not regional — one of two, alongside Training Command.", "HQ Nagpur."],

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
