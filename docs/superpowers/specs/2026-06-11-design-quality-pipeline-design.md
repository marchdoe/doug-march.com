# Spec — Design-Quality Pipeline (Designer/Engineer split, upgraded)

**Date:** 2026-06-11
**Status:** approved design, awaiting implementation plan
**Supersedes:** `docs/specs/02-designer-engineer-split.md` (this spec absorbs and upgrades it)
**Related:** `docs/specs/06-pipeline-variance.md` (shell-mandate section here replaces its archetype/chassis scope), TODO item 5 (archive redesign — consumes the screenshots this spec persists)

## Goal

Make the daily designs the best they can possibly be. Owner's bar: "Top to bottom this has to be the best personal site out there."

The three quality gaps this spec attacks, with their diagnosed root causes:

| Gap | Root cause |
|---|---|
| **Execution polish is amateurish** | `impeccable/polish.md` (and `bolder.md`, `overdrive.md`, `delight.md`) exist in the repo but are never loaded into any agent prompt. One agent (Unified Designer) splits its budget between design taste and TypeScript correctness. Polish standards in prompts are adjectives, not measurements. |
| **Page shells are structurally identical** (slim top-bar nav + content + footer, every day) | Nothing varies the shell: no history, no mandate, no variance pressure. Seeds are written as templates (exact hexes, exact gutters, DO-NOT lists), so the designer optimizes inside the lane instead of choosing a lane. |
| **Briefs promise more than pages deliver** | Specs are poetic ("drenched", "marquee scale") with no measurable values. The first measurement happens at the screenshot critic — after the build, where revision is expensive and capped at one retry. |

Two amplifiers, also fixed here:

- **The taste loop is dead.** Last rating: 2026-03-26. `references/index.yml`: empty since creation. The Art Director's ratings and references prompt sections have been empty for every run since late March.
- **The system has no memory.** Screenshot-critic verdicts, spec-critic REVISE reasons, and screenshots are all discarded after each run. Recurring flaws can't be learned from. (Side effect: `public/archive/{date}.png` has never existed in production — `archiver.js` only captures when a local dev server is on :5173.)

## Decisions (made with owner, 2026-06-11)

| Question | Decision |
|---|---|
| Approach | Designer/Engineer split with a **blocking** mockup critic (Approach A) |
| Budget | ~$3–4/run (≈2× today). No multi-candidate generation. |
| Owner input | ~2 min/day rating, via **daily GitHub issue** (works from phone) |
| Brand geometry | Fixed mark. Lockup may vary within an enumerated set (size, orientation, mark-alone vs mark+name). "Should not stray too much day to day." |
| Brand color | **Two modes only:** original brand colors, or single-color (inherits a day text/accent token). Day's design picks whichever sits better on the palette. |
| OG images | Every day generates a fresh 1200×630 OG card reflecting that day's design. Full share-sheet meta. |
| Chaos mode (spec 03) | Not doing — diversity of palette/archetype is already good; execution is the gap. |
| CLI version bump | Stays a separate task (existing spec 07). Pipeline remains pinned to 2.1.92 for now. |

## Architecture

```
Signals + references (unchanged)
        │
        ▼
Art Director (Sonnet, 20m) ──── upgraded: MEASURABLES + SHELL blocks
        │
        ▼
Spec Critic (Haiku) ─────────── gate: verifies measurables exist & are feasible
        │
        ▼
Mockup Designer (Opus, 25m) ─── NEW: one self-contained HTML/CSS file
        │                            polish.md always loaded; calibration
        │                            screenshot injected when archetype repeats
        ▼
Mockup Critic (vision, BLOCKING) ── NEW: screenshots the mockup via Playwright
        │   ▲                        (no build needed), measures it against the
        │   └── ≤2 revision loops    MEASURABLES block. REVISE → designer fixes.
        ▼
React Engineer (Sonnet, 25m) ── NEW: translates approved mockup → TSX files.
        │                            Fidelity is the contract, not taste.
        ▼
pnpm build ──────────────────── existing validation + retry (engineer only)
        │
        ▼
Screenshot Critic (Haiku) ───── rescoped: sanity + "does the page match the
        │                       mockup?" — a mechanical comparison now.
        ▼
OG capture → archive → commit ─ NEW og step; ALL verdicts/screenshots persisted
```

Cost estimate per run: AD ~$0.30 · spec critic ~$0.05 · mockup designer ~$1.50 · mockup critic ×1–3 ~$0.20 · revision ~$0.75 amortized · engineer ~$0.60 · screenshot critic ~$0.10 ≈ **$3.50**.

## Components

### 1. Art Director upgrades (`scripts/prompts/art-director.md`, `scripts/agents/art-director.js`)

The hero-phrase-first spine is unchanged — it is the best anti-mediocrity mechanism in the system. Three additions to the output contract:

**a. `===MEASURABLES===` block (new, required).** The spec stops being adjectives:

```
canvas_utilization_min: 70        # % of 1440×900 viewport carrying designed content
hero_scale: clamp(96px, 13vw, 200px)
color_coverage_min: 60            # % of viewport surface carrying the palette (not neutral)
```

Floors are archetype-dependent (Specimen/Poster ≥70% utilization; Broadsheet/Index ≥80%; the AD declares, the spec critic checks feasibility, the mockup critic measures).

**b. `===SHELL===` block (new, required).** The AD must declare the page shell instead of letting it default:

```
nav: <treatment — e.g. bottom rail / corner mark / floating pills / left spine>
footer: <treatment — e.g. data strip / colophon block / none-fold-into-nav>
brand_lockup: <variant id from brand contract — e.g. mark-only-sm / horizontal-md / stacked-lg>
brand_color_mode: original | single-color
```

**c. Self-check gains a measurement line** — "Canvas utilization floor declared and feasible for this archetype × chassis: Yes/No."

Inputs added to the AD user prompt: shell mandate (component 2), lessons file (component 6), new-schema ratings (component 7).

### 2. Shell mandate (`scripts/utils/shell-mandate.js` — new)

A structural clone of `color-mandate.js` (the audit's standout success — study `scripts/utils/color-mandate.js:71–182` for the pattern):

- Reads the last 7 days' `SHELL` declarations from build dirs (`shell.json` persisted per build).
- Marks the last 3 distinct nav treatments + footer treatments + brand lockups as soft-forbidden.
- Formats a prompt block: "Recently used: nav=top-bar (3 of last 5 days). Choose a different treatment unless today's brief genuinely demands repetition — if so, justify in rationale."
- Same philosophy as color: guidance with justified deviation, never a hard lock. "Fit > novelty."

### 3. Seed fixes (`scripts/prompts/seeds/*.md` — all 8)

Each seed gains a closing **"This is one lane"** section (~6 lines): the seed describes the default execution of the archetype, not the only one; deviation is allowed when signals call for it, provided it is executed with the same precision and justified in the rationale. (Today's seeds read as law: exact hexes, exact gutter widths, DO-NOT lists — the audit traced safe-sameness directly to this.)

### 4. Mockup Designer (new agent — `scripts/prompts/mockup-designer.md`, `scripts/agents/mockup-designer.js`)

**Model:** Opus. **Output:** one self-contained `mockup.html` (inline CSS, real Google Fonts links, real content from the site's content files) representing the **home page** at full fidelity, plus a short `===INTERIOR_NOTES===` block describing how About and Work pages adapt the system (the home page is the design statement; interiors derive).

**System prompt composition:**
- New `mockup-designer.md` — salvages unified-designer.md's good parts (brief fidelity, composition axes, data-render contract, archetype content contract) and adds a **concrete execution rubric** (what under-execution looks like, with measurements: ">30% dead background = revise", canvas utilization definitions).
- `impeccable/polish.md` — **always loaded.** This is the headline fix for amateur polish.
- `impeccable/bolder.md` + `overdrive.md` — loaded when the AD's color strategy is Committed/Drenched.
- `impeccable/delight.md` — loaded when the brief's register permits (not on heavy/serious briefs).
- Existing refs (brand register, typography, color, spatial, responsive) and the archetype seed, as today.
- Token budget: dropping the React/TS scaffolding sections that the engineer now owns pays for polish.md; assembled size stays ≈ today's UD prompt (~60KB). Verify against the 2.1.92 large-prompt ceiling during implementation.

**Calibration injection (new):** when today's archetype appears in the archive, inject the screenshot of the **highest-rated** past render of that archetype with its measured stats — visual ground truth replacing adjectives. (Requires persisted screenshots — component 6 — so it warms up over the first weeks.)

**Why HTML mockup:** revision is cheap (no build), Playwright screenshots it directly, it is naturally archive-friendly (the archive can show the mockup alongside the shipped page), and it makes the engineer's output mechanically verifiable.

### 5. Mockup Critic (new agent — `scripts/prompts/mockup-critic.md`)

**Model:** Sonnet (vision). **Blocking — this is the gate that kills drift.**

Flow: Playwright renders `mockup.html` → 1440×900 screenshot → critic receives screenshot + brief + visual spec + MEASURABLES + SHELL declaration. Checks:

1. Sanity (renders, no overflow disasters, fonts loaded)
2. **Measurables met** — estimates canvas utilization, hero scale, color coverage against the declared floors
3. Brief fidelity — does the mockup deliver the brief's ambition (the "drenched means drenched" check)
4. Shell declaration honored (nav/footer/lockup as declared)
5. Polish pass — spacing rhythm, optical alignment, hierarchy (informed by `critique.md` as today)

Verdict `APPROVE` or `REVISE` + specific feedback. REVISE → mockup designer revises (full context + feedback), **max 2 revision loops**. If still unapproved after 2 revisions, proceed with the latest revision and log the unresolved findings to the lessons file (never dead-end the daily run).

### 6. Persistence + lessons (the system gets a memory)

Per build dir, persist: `mockup.html`, `mockup-screenshot.png`, `screenshot.png` (final render — fixes the never-published archive previews), `shell.json`, `verdicts.json` (spec critic, mockup critic rounds, screenshot critic — verdict + feedback text each).

New `scripts/utils/lessons.js`: at prompt-build time, derives a rolling window (last ~7 entries) of critic REVISE reasons + owner rating notes directly from the persisted `verdicts.json` and rating files in the archive, formatted into AD and mockup-designer prompts as "Recent lessons — recurring flaws to not repeat." No separate mutable state file to corrupt.

### 7. Rating loop via daily GitHub issue

- **Open:** after a successful run, the workflow opens an issue titled `Rate: 2026-06-12 — "<hero phrase>"`, body = final screenshot (committed to the repo, so embeddable) + brief + a fenced YAML template:

  ```yaml
  grade: B        # A–D
  worked: ""
  didnt: ""
  try: ""
  ```

- **Rate:** owner edits/replies from phone in under 2 minutes. Skipped days are fine — the issue stays open and is harvested whenever filled.
- **Harvest:** next run's first step (`scripts/collect-ratings.js`, new) reads open `rating` -labeled issues via `gh`, parses the YAML from the latest owner comment (fall back to issue body), writes `archive/{date}/rating-{ts}.json` in the **new schema** `{ grade, worked, didnt, try }`, closes the issue, commits with the day's run.
- **Injection:** `buildRecentRatings` (design-agents.js:623–667) is rewritten for the new schema; old 5-axis files are outside any lookback window and need no migration — the legacy reader is deleted.
- **Auth:** the workflow's existing `GITHUB_TOKEN` already opens failure issues; reuse the pattern. Parsing is defensive: malformed YAML → skip + warn, never fail the run.

### 8. Brand contract (`scripts/prompts/brand-contract.md` — new, injected into AD + mockup designer + engineer)

- **Mark:** `app/assets/logo.svg`, geometry untouchable.
- **Lockup variants (enumerated):** `mark-only` / `mark+name horizontal` / `mark+name stacked`, each at sm/md/lg size ranges; orientation per declared nav treatment.
- **Color modes:** `original` (the mark's own colors) or `single-color` (mark inherits one text/accent token — requires a currentColor-capable SVG variant, produced once during implementation).
- The AD picks variant + mode in `SHELL`; the shell mandate prevents N-day repeats of the same lockup; the mockup critic checks the declaration was honored.
- One-time asset work: produce the single-color SVG variant and verify both render crisply at all three sizes.

### 9. OG images + share sheet

- The React Engineer additionally writes `app/routes/og.tsx`: a fixed 1200×630 card — hero phrase in the day's chassis, day's palette, brand lockup per SHELL. It is part of the engineer's required-files contract.
- After build validation: Playwright renders `/og` at exactly 1200×630 → `public/og/{date}.png` (immutable per date; sensible cache headers piggyback on the existing immutable-assets config).
- The orchestrator already generates `__root.tsx` deterministically (chassis fonts); it now also injects head meta: `og:image` (absolute `https://doug-march.com/og/{date}.png`), `og:title` (hero phrase), `og:description` (one-line brief), `og:url`, `twitter:card=summary_large_image`, `twitter:image`. None of these exist today.
- The CI git-add patterns (daily-redesign.yml push step) extend to `public/og/{date}.png` and the new persisted artifacts.

### 10. References seeding (one-time, with owner)

`references/index.yml` has been empty since creation. A one-time session: owner picks 5–10 designs he loves (external sites, past archive days, anything), we screenshot + tag them per the existing schema (composition/mood/density). The existing `collect-references.js` scoring then actually has something to score. Mark-as-reference UI ships later with the archive redesign; until then, additions are manual-with-assistance.

### 11. Cleanup

- **Delete:** `scripts/prompts/sidebar-designer.md`, `footer-designer.md`, `structure-agent.md`, `component-agent.md` (orphans from the pre-split era).
- **Retire:** `scripts/prompts/unified-designer.md` (good sections migrate to mockup-designer/engineer prompts) and the unified-designer paths in `design-agents.js` (agentConfig, retry wiring, FILE_OWNERSHIP).
- **Delete:** legacy 5-axis rating reader; vite `/api/dev-rate` endpoint and dev-panel rating UI are superseded by the GitHub-issue loop (panel keeps its non-rating functions).
- **Update:** `docs/specs/02` marked superseded by this spec; spec 06's archetype/chassis-variance scope marked absorbed (shell mandate) — its `/dev/variance` dashboard idea stays parked.

## React Engineer (completing the picture)

**Model:** Sonnet. **Input:** approved `mockup.html` + INTERIOR_NOTES + design tokens + design-system-reference + brand contract. **Output:** today's required file set (Layout.tsx, Sidebar.tsx, index.tsx, about.tsx, work.$slug.tsx) **plus `og.tsx`**. **Contract:** fidelity to the mockup — same composition, scale, spacing, color application; PandaCSS idioms per design-system-reference; the data-render requirements move here (the mockup shows real content; the engineer binds it to the content files). Build-failure retry targets the engineer only (replacing today's unified-designer retry); the existing security scanner and file allowlist apply unchanged.

## Testing

- Unit: delimiter parser additions (MEASURABLES, SHELL, INTERIOR_NOTES), shell-mandate (history extraction, soft-forbidden computation, wraparound-free this time), rating YAML parser (malformed input), lessons assembly, og meta injection.
- Prompt-content guards (the pattern from the old anti-anchoring tests): load-bearing directives in mockup-designer.md (polish.md presence, execution rubric), mockup-critic.md (measurables check), brand-contract.md (two color modes, fixed geometry).
- E2E: existing site-health suite + new checks (og meta tags present in shell HTML, `/og` route renders at 1200×630).
- Verification protocol (local, Max plan, $0): ≥3 full runs at different weights; confirm mockup-critic loop engages and converges, shells differ across runs, OG card renders, persisted artifacts all land. Screenshot evidence per run.

## Rollout

1. Branch `feat/design-quality-pipeline` off main.
2. Implement in phases (plan doc to sequence): persistence + cleanup → AD upgrades + shell mandate → mockup designer/critic → engineer + retirement of UD → rating loop + OG → references seeding session.
3. Local verification runs (above), then one CI dry-run (~$3.50), then ship.
4. First week after ship: owner rates daily; we review the first 7 outputs against the three gaps and tune floors/prompts.

## Risks

- **Mockup→TSX translation loss** — the engineer reintroduces drift. Mitigation: screenshot critic's rescoped job is exactly this comparison; persisted verdicts surface patterns; fidelity is mechanically checkable.
- **2.1.92 large-prompt ceiling** — new prompts must stay under the known >56KB failure zone. Measure assembled sizes in implementation; spec 07 (CLI bump) is the durable fix.
- **Blocking critic stalls the run** — capped at 2 revisions, then proceed-with-best + log. The daily run never dead-ends on taste.
- **Vision measurement is approximate** — utilization/coverage estimates from a screenshot are coarse. Acceptable: the floor-vs-estimate gap this catches is the 45%-vs-70% kind, not 68%-vs-70%.
- **Issue-based ratings depend on owner habit** — the system degrades gracefully to critic-only feedback on unrated days (still strictly better than today).

## Not doing

Multi-candidate generation (budget) · chaos mode / spec 03 (diversity isn't the gap) · CLI bump (spec 07, separate) · archive redesign (next project — this spec hands it screenshots, mockups, and rating data) · responsive-feedback expansion (existing loop unchanged).
