# Archive as a Wayback Machine — implementation

**Goal:** Turn the archive into a browsable record of every design the pipeline has made.
A calendar that opens into any preserved day, a neutral explainer per day, a permanent
quiet link in from every nightly build, and snapshots sealed so a visitor cannot leak
onto today's site.

**Source:** map [#152](https://github.com/marchdoe/doug-march.com/issues/152), seven
tickets, all closed. Decisions live on #153 (record), #154 (URLs), #155 (the link),
#156 (escape vectors), #157 (calendar), #158 (frame), #159 (explainer). This document
does not re-argue them. It sequences the work they imply.

**Prototypes, not to be promoted as-is:** `prototype/157-archive-calendar`,
`prototype/158-archive-frame`, `prototype/159-explainer`. They were written without
tests or error handling. Rewrite the winners properly; read them for the shapes.

**Tech stack:** existing. TanStack Start, PandaCSS, Node ESM scripts, vitest, Playwright.
No new dependencies.

---

## Load-bearing facts

Measured, not assumed. Each was verified during the map and several contradict the
tickets that preceded them.

| Fact | Consequence |
|---|---|
| Coverage is stratigraphic — six eras, each artifact starting on a date and running unbroken. One real gap, `2026-04-14`. | The record carries one `era` stamp, not per-field provenance. |
| Signals live in `trace.json`'s `signals-loaded` step, 113/113 traces, 12 universal providers. `brief.md`'s `## Signals` body is empty on 108 of 122. | Lift signals from traces. Do not write a prose parser. |
| A materialized record already exists: `public/archive/<date>/_detail.json`, 123 dates, 3.1MB, written by `scripts/generate-archive-json.js:206`. Three of twelve fields are whole files stringified. | This is a refactor, not a greenfield build. |
| Snapshots link document-relative (`about.html`, `work/*.html`, 4,612 hrefs). | A preserved design's URL **must** end in a slash. |
| Snapshots' `/assets/*.js` are 404 and the theme-init script does not survive capture (0/120). | The frame must be pure HTML + CSS. The 90 snapshots defining a `.light` variant are frozen dark: 18 light grounds, 100 dark. |
| The nightly archive link vanished on 2026-07-12, the day the shell became a declared Art Director choice, and has been absent for 16 builds. | Prompt instruction is disproven. The link goes where no agent can reach it. |
| Every deterministic gate in the pipeline is retry-then-proceed; all degrade to warnings under `pastDeadline()`. | A build-failing gate is not the house pattern. Assert on built output instead. |
| Semantic tokens are unreliable: `accent`/`bg`/`text`/`border` at 107–108 of 110, `textMuted` at 88. | Archive surfaces use only those four, or their own tokens. |
| `elements/preset.ts` is rewritten nightly; `panda.config.ts` and `__root.tsx.template` are not. | The archive's fixed identity lives in orchestrator-owned files. |

---

## Known risk, accepted up front

**The pipeline runs nightly while this is in flight.** `Layout.tsx`, `Sidebar.tsx`,
`index.tsx`, `about.tsx`, `work.$slug.tsx`, and `og.tsx` are rewritten every night by
the React Engineer. Nothing in this plan may depend on their contents. Every change
here targets orchestrator-owned files (`__root.tsx.template`, `panda.config.ts`,
`scripts/**`) or archive-only routes the agents never touch.

**Phase 2 is atomic or the site breaks.** Creating `/how/$date` without retiring
`archive.$date.tsx` leaves the preserved design unreachable, because TanStack strips
the trailing slash and matches the explainer route. Verified in the browser. These land
in one commit or not at all.

---

## Phase 0 — Restore the link — SHIPPED (PR #164, 2026-08-24)

The archive link has been missing from every build since 2026-07-12. This phase is
independent of everything else and should land tonight.

### Task 0.1: Orchestrator-owned archive link
- [x] `scripts/templates/__root.tsx.template` — render the link inside `RootDocument`,
      **outside** `<Layout>`, at the end of document flow. Add a `{{ARCHIVE_COUNT}}`
      placeholder beside the existing `{{OG_META}}` and `{{GOOGLE_FONTS_URL}}`.
- [x] Copy: `Archive — <n> designs`. Target: `/archive`.
- [x] Style: `text` at reduced opacity on `bg`, `accent` on hover. Only these tokens —
      `textMuted` is absent on one night in five.
- [x] `scripts/utils/chassis.js` — `renderRootTemplate()` substitutes the count.
      Source the count from the archive date list, not from the stale `_data.json`.

### Task 0.2: Regression check
- [x] Playwright, `site-health` project: assert the link is **visible** on the built
      output, not merely present in the markup. A design using full-bleed `position:
      fixed` or `overflow: hidden` can bury it.
- [x] Comment the test with `2026-07-12` and why it exists.

### Task 0.3: Delete the production fixture
- [x] Remove `public/archive/2099-01-02/`. It carries only a `_detail.json` and will
      otherwise eventually render as a real day.

---

## Phase 1 — The record — SHIPPED (2026-08-24)

Implements #153. Can run in parallel with Phase 0.

**As built.** Four notes where the work differed from this plan:
- The object-literal reader that `preset.ts` needs is its own module,
  `scripts/utils/preset-parser.js`, rather than living inside `archive-record.js`.
  It parses all 110 archived presets, including the two nights (07-18, 07-24) that
  nested everything under `theme.extend`, which this plan did not anticipate.
- One anomaly, not three. `2026-04-28` and `2026-04-30` resolve cleanly: the build
  that shipped is the one whose `brief.md` matches the date-level copy `archive()`
  writes as the day's latest. Only `2026-04-14` remains, having no artifacts at all.
- `app/routes/archive.$date.tsx` reads the record instead of regex-parsing a preset
  string in the browser. Phase 2 deletes the route, but leaving it broken in the
  meantime was worse. The dev panel still receives the raw `trace.json`, which the
  record deliberately drops — its step inspector replays it.
- The screenshot stays at `public/archive/<date>.png` for now; moving it belongs
  with the rest of Task 2.4, and splitting that move across two phases would leave
  the preserved namespace half-cleared.

### Task 1.1: Record builder module
- [x] New `scripts/utils/archive-record.js`. Build one date's record per #153's schema.
- [x] Era from the hardcoded date table, never from observing which files are present.
      Observation cannot tell "this stratum did not exist yet" from "this build dropped
      a file", which is the distinction the era stamp was chosen to buy.
- [x] **Pick the build that shipped, not the newest by timestamp.** `2026-04-28` and
      `2026-04-30` have a newest build dir that is a failed retry carrying no artifacts.
      This corrects a decision recorded on #153; the prototype found it.
- [x] Parse `signals-brief.md` by heading, handling both format eras (83 dates modern,
      27 older).
- [x] Parse `preset.ts` into a token record. Handle **both** bare (`50:`) and quoted
      (`'50':`) keys — expecting only the bare form silently drops 16 dates.
- [x] Lift only `signals-loaded.output` from `trace.json`. Never store the whole trace.
- [x] Drop today's free-prose `archetype.txt`; keep the 8-name vocabulary as
      `legacyArchetype` on the 121 dates that have it.
- [x] Log any date whose artifacts disagree with its era. Expect 3 today: `2026-04-14`,
      and the two build-picking cases above once they are understood rather than fixed.
- [x] Tests: schema shape, era boundaries, both preset key styles, build-picking,
      anomaly detection, a prose-era date, a grammar-era date.

### Task 1.2: Pipeline writes the record
- [x] `scripts/utils/archiver.js` — write `archive/<date>/record.json` at build time.
- [x] No `schemaVersion`. Carry `generatedAt` and treat the file as a rebuildable cache.

### Task 1.3: Backfill
- [x] `scripts/backfill-archive-records.js` — write records for all 123 dates.
- [x] Idempotent. Re-running produces identical output.

### Task 1.4: `generate-archive-json.js` becomes a projection
- [x] Read `record.json`; emit the public copy. Stop re-deriving from `brief.md` prose.
- [x] Retire the regex parsing in `app/server/archive-impl.ts` and
      `archive-detail-impl.ts`.
- [x] Output moves to `/archive-data/` (Phase 2 depends on this; see Task 2.4).

---

## Phase 2 — The URL scheme — SHIPPED (2026-08-24, one commit)

Implements #154. **Every task here lands in one commit.** Blocks Phases 3 and 4.

**As built.** Four notes:
- Dev, preview, and production each needed the same rule, so it is one middleware
  (`archiveStaticPlugin` in `vite.config.ts`, installed on both the dev and preview
  servers) plus the `vercel.json` redirect. Vite's static handler does the exact
  opposite of what the scheme requires: it 307s `/archive/<date>/` to the
  slash-less form, which then falls through to a route that no longer exists.
- Task 2.4 grew by two. `viewports/*.png` moved out of the preserved namespace
  alongside the screenshot — leaving them behind would have contradicted the
  sentence that justifies the task — and the retired `_data.json` /
  `_detail.json` files were deleted rather than left as gitignored litter.
- `.gitignore` now ignores `public/archive-data/*.json` rather than the whole
  directory. The screenshots and viewport captures beside them are pipeline output
  that nothing at build time can recreate, so they stay committed.
- A display bug from Phase 1 surfaced during verification and is fixed here: a
  one-off colour token (`glow: { value: '#FF8FC7' }`) unwraps to a bare string, and
  the swatch renderer iterated it one character at a time. Seven dates have one.

Target scheme:

```
/archive                      calendar          (SPA)
/archive/2026-06-28/          preserved design  (static, trailing slash required)
/archive/2026-06-28/about.html, work/*.html
/how/2026-06-28               explainer         (SPA)
/archive-data/2026-06-28.json record projection
/archive-data/index.json      calendar index
/archive-data/2026-06-28.png  screenshot
```

### Task 2.1: Create `/how/$date`, retire `/archive/$date`
- [x] New `app/routes/how.$date.tsx`.
- [x] Delete `app/routes/archive.$date.tsx`.
- [x] Update the four in-app links: `app/components/panel/ArchiveTab.tsx:52`,
      `app/routes/archive.tsx:112`, and both in `archive.$date.tsx` as it goes.
      Five, in the end: `app/components/responsive-trend.tsx` links per-date too.

### Task 2.2: Rewrites
- [x] `vercel.json` — `/archive/:path*` is static, always. Everything else falls through
      to `_shell.html`. The bare `/archive` still reaches the SPA calendar, having no
      sub-path to match.
- [x] Confirm `/archive/` with a trailing slash does not 404 looking for
      `public/archive/index.html`.

### Task 2.3: 301 the slash-less form
- [x] `/archive/<date>` → `/archive/<date>/`. The slash-less form means the design.

### Task 2.4: Move generated files out of the preserved namespace
- [x] `_detail.json`, `_data.json`, and `<date>.png` move to `/archive-data/`.
- [x] `/archive/<date>/` then means one thing: bytes that shipped that day and never
      change. That is what lets the Phase 3 seal test assert over `public/archive/**`
      with no exclusions.

### Verification
- [x] `/archive/2026-06-28/` serves the snapshot, and `about.html` resolves in-date.
- [x] `/archive/2026-06-28` 301s to it.
- [x] `/how/2026-06-28` serves the explainer.
- [x] Dev and production agree. They currently do not.

---

## Phase 3 — Seal and frame — SHIPPED (2026-08-24, one commit)

Implements #156 and #158 over 1,041 pages across 120 dates. Rewrite and injection share
a single pass.

**As built.** Five notes:
- The seal is `scripts/utils/archive-seal.js` (pure functions over one page) plus
  `scripts/seal-archive.js` (the traversal). The pipeline calls the traversal after
  `copyToPublic`, so capture-time and backfill are the same code path rather than
  two implementations that drift.
- The rewrite is scoped to attribute values, never document text. Two snapshots
  print `https://doug-march.com` as the visible text of a link; a string replace
  would have edited what the design says, not where it points.
- `<link rel="modulepreload">` is stripped rather than allowlisted. All 3,611 of
  them point at `/assets/*.js` that 404s in every snapshot, and no snapshot has a
  `<script src>` or an external stylesheet other than fonts — every design ships
  its CSS inline. Dropping them is what lets Task 3.4 read as a literal "no
  absolute paths" assertion instead of a 3,611-entry exception.
- `/work` maps to `index.html`, not to a `work.html` that has never existed. None
  of the six dates carrying the link defines an `id="work"` anchor either, so the
  nav item has no destination inside the capture and the day's own home page is
  the least-wrong answer.
- The whole archive is resealed on every run, not just the new day. Today's
  arrival is what gives yesterday a next arrow to point at, and the pass costs
  0.28s for all 1,041 pages, so there was no reason to be cleverer.

**One correction to the plan.** Task 3.4 asked for zero `content="https://doug-march.com`
in `og:`/`twitter:` meta. That would forbid the `og:url` Task 3.1 requires, since a
canonical URL is necessarily absolute. The test asserts the stronger thing instead:
every `og:url` equals its own snapshot's archive URL, and `og:image` / `twitter:image`
are gone entirely.

**A Phase 2 bug fixed here.** `archiveStaticPlugin` checked `dist/client/archive`
before `public/archive` on both servers. Under `vite dev` a stale `dist/` from an
earlier build shadowed every edit to `public/`, so a freshly sealed page served as
its unsealed self. Each server now reads its own authoritative tree first.

### Task 3.1: Capture-time link rewrite
Order matters — three of these match a `/`-prefixed href, and the host rule must run
before any generic absolute-URL rule.

- [x] `<a href="/#fragment">` → `index.html#fragment`. 13 dates, 156 occurrences.
- [x] `/work…`, `/about…`, `/contact`, `/experiments` → in-date equivalents. 6 dates,
      81 occurrences. `/work` has no `work.html` in any snapshot, so this needs a
      mapping, not a leading-slash strip.
- [x] `https://doug-march.com` → `index.html`. 105 dates. Match the host exactly; do not
      catch `doug-march-dot-com.html`, a legitimate filename.
- [x] `og:url` → the snapshot's own archive URL. `og:image` / `twitter:image` dropped —
      123 of 135 already 404.
- [x] **Leave `<a href="/archive">` alone.** 93 dates, 761 occurrences. It points at the
      calendar, which is the intended exit. Add it to the seal test as an explicit
      allowlist entry so it reads as a decision.
- [x] **Leave every font reference alone.** Google Fonts and Fontshare, 119 dates.

### Task 3.2: Frame injection
- [x] Full-width top rail, always visible, displacing the design via `body padding-top`.
      It is the only variant that never covers content; a bottom pill covers the footer
      and a hover-reveal covers the masthead. Both were built and photographed.
- [x] Pure HTML + CSS. No script — a sealed snapshot cannot run any.
- [x] All 9 pages, not just the home page. The snapshot's own nav invites the click.
- [x] Contents: back to `/archive`, the date, prev/next skipping gaps and going dead at
      the ends, and a link to `/how/<date>`.
- [x] Ground: `rgba(14,14,16,0.92)` with a blur reads on all 18 light and 100 dark
      grounds. Verified against `#01070e`, `#fafaf8`, and `#07724a`.

### Task 3.3: Backfill
- [x] One traversal of `public/archive/**/*.html` applying 3.1 and 3.2.
- [x] Exclude the nested copy under `public/archive/2026-04-14/`.
- [x] Idempotent — re-running must not double-inject.

### Task 3.4: Seal regression tests
- [x] Zero matches for `href="/` across `public/archive/**/*.html`, allowlisting
      `/archive`.
- [x] Zero `content="https://doug-march.com` in `og:`/`twitter:` meta.
- [x] **Non-zero** `fonts.googleapis.com` references. An over-eager rewrite that strips
      fonts would flatten 120 designs to Times New Roman, and would otherwise do it
      silently.

---

## Phase 4 — The surfaces

Implements #157 and #159. Depends on Phase 2 for URLs and Phase 1 for data.

### Task 4.1: Archive routes leave `<Layout>` (prerequisite for 4.2 and 4.3)
- [ ] `/archive` and `/how/$date` must render outside agent-authored `<Layout>`.
      Today they inherit the nightly sidebar, footer, and fonts, which is visible in
      every prototype screenshot. #152's "fixed, neutral identity that does not change
      nightly" is unreachable until this lands.
- [ ] Colour is already solved by Task 4.2. Typography and chrome are not.

### Task 4.2: The archive's fixed identity
- [ ] `archive.*` colour tokens in `panda.config.ts`, which is not agent-owned.
- [ ] A typographic choice that does not depend on the nightly chassis.

### Task 4.3: Calendar
- [ ] Default view: wall calendar, one month, hue filling each built cell, mood word as
      cell text.
- [ ] Index view: six-month contact sheet.
- [ ] Opens on the **densest** month, computed at render time. Today's month is 1/31.
- [ ] Three cell states: built (clickable, hue), record-only (clickable, goes to
      `/how/<date>`), empty (dead).
- [ ] Ink colour by relative luminance, not lightness — `l > 55` puts white on
      yellow-greens.
- [ ] Grid cells need `min-width: 0`; long mood words otherwise widen their column.

### Task 4.4: Explainer
- [ ] Two columns: fixed metadata rail, prose body. Sections named as a sequence
      ("The day arrived", "A colour was chosen"), not as an inventory.
- [ ] The brief leads, not the colour. Colour is absent on 31 of 123 dates, where a
      colour-led hero becomes a grey slab. Signals (107) and tokens (106) are better
      covered than colour (92).
- [ ] Tokens render as real ramps, every stop at its value.
- [ ] Absent fields name their era: "No composition tuple. The pipeline had no such
      concept in the prose era."
- [ ] Adjacent to the preserved design, linked, never embedding a live frame of it —
      that would put two identities on one page.
- [ ] Each signal provider needs a real summary line. The prototype falls back to
      "5 items" and renders "0 items" for providers that were empty that day.

---

## Sequencing

```
Phase 0 ─┐                       independent, ship first
Phase 1 ─┤ parallel
         └─► Phase 2 (atomic) ──┬─► Phase 3
                                └─► Phase 4  (4.1 → 4.2 → 4.3, 4.4)
```

Phase 0 and Phase 1 are independent of each other and of Phase 2, so they can be
dispatched as one parallel batch. Phase 2 is a single serial commit. Phases 3 and 4 are
independent of each other and form a second parallel batch, though 4.3 and 4.4 both wait
on 4.1.

---

## Verification

Per the standing rule: run the flow and screenshot it. Tests passing is not the same as
working.

- [ ] Load `/archive`, click a date, land on the design with the frame over it, click
      through to a work page, use prev/next across the 07-30 → 08-22 gap, reach
      `/how/<date>`, return to the calendar.
- [ ] Load a light-ground day (`2026-06-15`) and a dark one (`2026-06-10`); confirm the
      frame reads on both.
- [ ] Load `/how/2026-08-23` (every field) and `/how/2026-03-12` (brief and archetype
      only); confirm neither looks broken.
- [ ] Confirm tonight's build renders the archive link, and that the `site-health`
      assertion fails if it is removed.
- [ ] Screenshots in the PR.

## Out of scope

Retention and pruning, the uniqueness-index feedback loop, owner-only "mark as
reference", thumbnails on the calendar (needs a screenshot backfill; 1 of 123 today),
and responsive behaviour — #152 lists the last as unspecified, and the prototypes were
desktop-only at 1440.
