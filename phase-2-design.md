# Phase 2 — Browse and Navigation

Roadmap gate: *any seeded entry is reachable within three seconds by browsing,
filtering, or search.* Phases 0 and 1 are done (tokens, taxonomy, routes, Zod
schema, loader, validator, scaffolder, seven entries), so this phase is purely
about getting from "anywhere" to "the entry" fast, from three directions:
the tree, the filters, and the palette.

## Principles carried over

- **Static, no backend.** Everything ships prerendered; all interaction is
  client-side over data serialised into the page.
- **Server does content, client does state.** Route segments stay server
  components that read `@/content`; only the interactive shell is `"use client"`.
- **URL is the state.** Filters, sort and page live in query params so a filtered
  view is a shareable link and the back button behaves.
- **Technical, not tactical.** Existing tokens only — no new colours, no new
  fonts, monospace for every figure.

## 1. The browse model (`src/lib/browse.ts`)

Entry objects are large (description paragraphs, sources, SSB block) and must not
be shipped to the client wholesale. A `BrowseItem` is the projection needed by a
card, a filter and a search hit — roughly 15 scalar fields per entry.

```ts
interface BrowseItem {
  slug; name; aliases; summary;
  category; categoryName; class; className;
  origin; developer; manufacturer; operators; tags;
  status; inducted?; decade?; lastVerified;
  image?: { src; alt };
  href;              // precomputed /category/class/slug
}
```

Pure functions over `BrowseItem[]`, all unit-testable and shared by every browse
surface:

| Function | Job |
| --- | --- |
| `toBrowseItem(entry)` | Projection, done once on the server |
| `facetsFor(items)` | Option lists **with counts**, derived from the data — never a hardcoded list that can drift from content |
| `applyFilters(items, filters)` | AND across facets, OR within a facet |
| `sortItems(items, sort)` | `name`, `-name`, `inducted`, `-inducted`, `-verified` |
| `paginate(items, page)` | 24 per page |

Filter facets: **service, status, origin, manufacturer, induction decade,
class** (class only on the category route — on a class route it is fixed).
Numeric range filters from the roadmap are deliberately deferred to Phase 3:
their meaning is per-category (`range` for a missile, `weight` for a tank) and
they belong with the compare table's typed-spec work, not before it.

## 2. Navigation shell (`layout.tsx`)

```
┌────────────────────────────────────────────────────────┐
│ ▣ Shastra Codex        [ Search…  Ctrl-K ]   7 entries │  header, sticky
├───────────────┬────────────────────────────────────────┤
│ MISSILES    3 │  breadcrumbs                           │
│  · Cruise   1 │  <page>                                │
│  · Ballistic 1│                                        │
│ ARMOUR      2 │                                        │
│ AIRCRAFT    2 │                                        │
└───────────────┴────────────────────────────────────────┘
```

- **Sidebar tree** — every category, expanded only on the active branch, class
  rows with counts, empty classes dimmed but still linked. `aria-current="page"`
  on the active row. Below `lg` the rail becomes a slide-in sheet behind a menu
  button; Escape and backdrop click close it, focus returns to the trigger.
- **Header** — logo, a search trigger that shows the real shortcut, entry count.
- The tree is a client component only because it reads `usePathname()`; its data
  is a small serialisable array built on the server from `TAXONOMY` + counts.

## 3. Command palette (`Ctrl-K`)

MiniSearch (client-side, 7.2.0) over `name`, `aliases`, `summary`, `tags`,
`categoryName`, `className`:

- prefix + fuzzy (`0.2`) matching, so "brah", "PJ-10" and "brahmoss" all land on
  BrahMos; `name` and `aliases` boosted so a name match outranks a summary match;
- empty query shows recently viewed, then a few entries at random-stable order;
- each result carries its class on the right, so "Akash" reads as a
  surface-to-air missile before you open it; `↑ ↓` to move, `Enter` to open,
  `Esc` to close, `Ctrl-K`/`Cmd-K`/`/` to open from anywhere;
- the index is built lazily on first open, off the `BrowseItem[]` already in the
  page — no separate index artefact to keep in sync, and nothing paid for by
  users who never search;
- dialog is a `<div role="dialog" aria-modal>` that autofocuses its input and
  returns focus to the search button on close — Radix is not pulled in for one
  component.

## 4. Browse surface (category + class routes)

One client component, `EntryBrowser`, used by both routes:

```
[ Filters ]   12 of 34 · Sorted by name ▾
 Service ▸    ┌──────┐ ┌──────┐ ┌──────┐
 Status  ▸    │ card │ │ card │ │ card │
 Origin  ▸    └──────┘ └──────┘ └──────┘
 Decade  ▸    ‹ 1 2 3 ›
 [Clear all]
```

- Facet groups are checkbox lists with counts; selections become chips above the
  grid; "Clear all" resets to the canonical URL.
- Sort is a native `<select>` — keyboard and screen-reader behaviour for free.
- Pagination is links (`?page=2`), not a button, so it works and can be shared.
- Empty state names the filters responsible and offers one click to clear them.
- Filter state is read with `useSearchParams()` inside a `<Suspense>` boundary so
  the surrounding page still prerenders statically.

## 5. Home page

Three bands: category grid (existing, kept), **recently added** (latest six by
`lastVerified`), **recently viewed** (from `localStorage`, hydration-safe: the
strip renders nothing on the server and appears after mount).

`RecordView` on the entry page writes `{slug, name, href}` to a capped list of
ten in `localStorage` — no accounts, per the roadmap's "deliberately not in v1".

## 6. Out of scope, deliberately

Compare tray and diff table (Phase 3), flashcards/quiz/starred (Phase 4),
numeric range filters (Phase 3, with typed specs), SEO and deployment (Phase 7).

## Done when

Any seeded entry is reachable in under three seconds by (a) clicking down the
tree, (b) filtering a category page, or (c) `Ctrl-K` and typing three letters —
and every one of those paths works on a phone and from the keyboard alone.
