import { defineUnit } from "./schema";

export default defineUnit({
  slug: "corps-of-signals",
  name: "Corps of Signals",
  aliases: ["Signals"],

  force: "army",
  type: "corps",

  raised: 1911,
  role: "Military communications",

  summary:
    "The Army's communications arm, raised in 1911 out of earlier telegraph units and now responsible for battlefield communications and networked command.",

  description: [
    "The Corps of Signals was formed as a separate entity on 15 February 1911, when the 31st and 32nd Divisional Signal Companies — its first units — were raised at Fatehgarh, in present-day Uttar Pradesh.",
    "It grew out of telegraph sections that had existed under the Sappers and Miners since 1868, becoming a distinct corps under colonial rule and reaching full Indianisation by 1947. Today it runs the Army's tactical and strategic communications networks.",
  ],

  hooks: [
    "Raised 1911, out of telegraph units dating to 1868.",
    "First units: 31st and 32nd Divisional Signal Companies, at Fatehgarh.",
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
