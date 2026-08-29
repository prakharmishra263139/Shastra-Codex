import { defineUnit } from "./schema";

export default defineUnit({
  slug: "army-aviation-corps",
  name: "Army Aviation Corps",
  aliases: ["AAC"],

  force: "army",
  type: "corps",

  raised: 1986,
  role: "Reconnaissance, anti-tank aviation, battlefield support, casualty evacuation",

  summary:
    "The Army's own helicopter arm, formed in 1986 to give ground formations organic air support rather than relying solely on the Air Force.",

  description: [
    "The Army Aviation Corps came into being on 1 November 1986, separating army-support helicopter operations from the Air Force so that reconnaissance and light-utility flying sat directly under Army command.",
    "It was committed almost immediately to Operation Pawan, the Indian Peace Keeping Force deployment to Sri Lanka, and today covers reconnaissance, anti-tank aviation, high-altitude support, search and rescue, and casualty evacuation.",
  ],

  hooks: [
    "Raised 1986 — separated helicopter support from the Air Force.",
    "First major operation was Operation Pawan (Sri Lanka, IPKF) the same year.",
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
