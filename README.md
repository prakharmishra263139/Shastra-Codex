# Shastra Codex

A browsable, comparable reference of Indian defence equipment, built for SSB aspirants.

Runs locally. No database, no backend, no accounts.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on http://localhost:3000 |
| `npm run new` | Scaffold a new entry (interactive) |
| `npm run validate` | Check every entry — errors block, warnings advise |
| `npm run build` | Production build, prerenders every page |
| `npm run typecheck` | TypeScript, with route types regenerated first |

Non-interactive scaffolding:

```
npm run new -- --name "Pinaka Mk-II" --category missiles --class rocket-artillery
```

---

## How content works

One file per system, in `src/content/entries/`. The filename **must** match the
entry's `slug` — the validator enforces this, because the slug is the URL.

```
src/content/entries/brahmos.ts   →   /missiles/cruise/brahmos
```

There is no central list to maintain. `npm run index` scans the folder and
regenerates `src/content/entries/_registry.ts`, and it runs automatically before
`dev`, `build` and `typecheck`.

### The schema

`src/content/schema.ts` is the contract. Two halves:

- **Core** — identical for every entry, so cards, lists and filters are generic.
- **Specs** — a discriminated union keyed on `category`. A missile has `range`
  and `guidance`; a tank has `armourType` and `enginePower`. Same category means
  same spec shape, which is what makes side-by-side comparison a straight diff.

Five categories have fully typed spec blocks: `missiles`, `armour`, `artillery`,
`aircraft`, `naval`. The remaining four (`small-arms`, `air-defence`, `sensors`,
`strategic`) use a generic label/value list until their blocks are written. They
render and validate fine; they just cannot be compared field by field yet.

**Lock the schema now.** Changing it after a hundred entries exist means a
hundred rewrites — ship changes as a migration script instead.

### Confidence markers

Every numeric figure is a `Measure` and must declare its confidence:

```ts
range: {
  value: 290,
  unit: "km",
  confidence: "reported",   // "official" | "reported" | "estimated"
  note: "Extended-range variants have been tested.",
}
```

This is the site's point of difference. Most public defence specifications are
estimates or export-variant numbers, and a site that prints them as hard fact
will eventually mislead someone in an interview. `official` renders plainly,
`reported` gets a dotted underline, `estimated` gets a dashed underline and a
tilde. All three carry a tooltip.

Use `min` where a figure is genuinely a band (Akash engages from 4.5 to 25 km).

### Sourcing rules

- **Public sources only.** PIB, Ministry of Defence, DRDO, HAL, BEL, BDL, the
  three service websites, and established defence journalism. Everything SSB
  tests is openly published — there is no reason to touch restricted material,
  and doing so would destroy the site's credibility.
- **Every entry cites and dates itself.** At least one source, plus a
  `lastVerified` date rendered on the page. The validator warns past 365 days.
- **Images need `credit` and `license`.** Both are required fields, so an
  unattributed image cannot reach the build. Use PIB / MoD photographs under the
  Government Open Data Licence – India, or Wikimedia Commons with attribution
  preserved.

> The seed entries currently cite top-level official pages. Replace these with
> deep links to the specific page or press release as you verify each figure.

---

## Where the build has got to

**Phase 0 — complete.** Next.js 16 + TypeScript + Tailwind v4, design tokens,
full taxonomy, and the vertical slice rendering at real routes in both themes.

**Phase 1 — complete.** Zod schema with five typed spec blocks, content loader,
registry generator, validator, entry scaffolder, six seed entries across three
categories.

Six seed entries: BrahMos, Akash, Agni-V, Arjun, T-90S Bhishma, Tejas. They were
chosen to stress the schema — two missiles that are nothing alike, two tanks that
invite direct comparison, one aircraft.

**Phase 2 — complete.** Persistent sidebar tree with counts and a mobile sheet,
`Ctrl-K` command palette over MiniSearch (names, aliases, summaries, tags),
faceted filtering with sorting and pagination on every category and class route,
and a home page carrying recently added and recently viewed entries.

Browse state — filters, sort, page — lives in the query string, so a filtered
view is a shareable link. `src/lib/browse.ts` holds the pure functions behind it
(`facetsFor`, `applyFilters`, `sortItems`, `paginate`); routes stay server
components and hand a slim `BrowseItem[]` to the client.

**Phase 3 — next.** The compare tray and the side-by-side diff table. The
groundwork is in place: `compareCandidates()` in `src/content/index.ts` already
returns the valid same-category candidates for any entry. Numeric range filters
land with it, since their meaning is per-category.

---

## Notes

- Node 23 is not an LTS release and npm warns about it during install. Node 22
  LTS or 24 LTS is a smoother base.
- `CLAUDE.md` and `AGENTS.md` are generated by `next dev`, not written by hand.
