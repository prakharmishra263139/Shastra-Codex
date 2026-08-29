import { defineUnit } from "./schema";

export default defineUnit({
  slug: "armoured-corps",
  name: "Armoured Corps",
  aliases: ["Indian Armoured Corps", "Cavalry"],

  force: "army",
  type: "corps",

  raised: 1947,
  role: "Tank and mechanised warfare",

  summary:
    "The Army's tank arm, formed in 1947 from the British Indian Army's Armoured Corps and now numbering around 67 armoured regiments.",

  description: [
    "The present Armoured Corps was formed in 1947 out of roughly two-thirds of the personnel and equipment of the pre-independence Indian Armoured Corps, the rest going to Pakistan at Partition.",
    "Its regiments trace back further than the Corps itself — several were originally cavalry units, and the senior-most, the President's Bodyguard, dates to 1773, making it the oldest unit in the Indian Army.",
  ],

  hooks: [
    "Formed 1947, but its senior regiment — the President's Bodyguard — dates to 1773.",
    "Around 67 armoured regiments today.",
    "Many regiments were cavalry before mechanisation, hence 'Cavalry' as an informal name.",
  ],

  sources: [
    {
      title: "Indian Army — official website",
      publisher: "Indian Army",
      url: "https://indianarmy.nic.in/",
      accessed: "2026-08-29",
    },
  ],

  lastVerified: "2026-08-29",
});
