---
name: testing-shastra-codex
description: How to run and end-to-end test the Shastra Codex Next.js content site locally (browse, filters, command palette, recently-viewed, mobile nav sheet).
---

# Testing Shastra Codex locally

## Running the app
- `npm install` then `npm run dev` from the repo root; serves http://localhost:3000.
- `predev` automatically runs `npm run index`, which rebuilds the MiniSearch/content registry from
  the seeded content files. If search or category counts look stale, re-run `npm run index`.
- No backend, no auth, no secrets. Content is a small seeded set (7 entries at time of writing),
  so anything gated on volume (pagination at 24 per page) will not render — report it as untested
  rather than failed.

## Devin Secrets Needed
None.

## Useful testing facts
- Facets with only one distinct value are hidden by design (e.g. Status when every entry is
  `in-service`). Absence of a facet is not necessarily a bug — check the underlying data first.
- Category routes show a Class facet; class routes do not.
- Browse state (filters, sort, page) lives entirely in the query string, so reload-restoration can
  be asserted purely from the URL plus rendered counts (`N of M` header).
- All browse controls (facet checkboxes, sort dropdown, "Clear all") funnel through one `update()`
  callback in `entry-browser.tsx`, so a single `router.push`/`router.replace` choice governs history
  behavior for all of them. With `replace`, Back skips past intermediate filter states entirely
  (e.g. Back from `/missiles?service=army` lands on the page visited *before* `/missiles`); with
  `push`, each change is its own history entry. Test Back from a known-clean history — open a fresh
  tab first — via: home -> category -> tick one facet -> Back, and also stack two facets plus a sort
  and confirm each unwinds one step at a time. Checking only the URL is not enough; also confirm the
  checkbox/sort control state and the rendered card order match the restored URL.
- Recently-viewed is localStorage-backed via `useSyncExternalStore`. To test ordering, visit two or
  three entry pages then return home; expect most-recent-first, and reload to confirm persistence.
  The same list appears in the command palette when the query is empty.
- Command palette: opens with Ctrl-K, Cmd-K or `/`; Escape should return focus to the header
  "Search equipment" button (look for the visible focus ring in a screenshot).
- Mobile nav sheet appears below the `lg` breakpoint. Resize reliably with
  `wmctrl -r :ACTIVE: -e 0,0,0,460,820`, and restore with
  `wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`. Never use xdotool super+key.

## Gotcha: stale click coordinates
Clicking a control while the page is scrolled can misfire, because clearing filters shrinks the
document and the browser clamps the scroll position, sliding other links under the cursor. Scroll
the target into view at the top of the viewport and re-screenshot immediately before clicking, or
verify the resulting URL after every click.
