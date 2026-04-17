# Designer Prompt Drift Audit (2026-04-13)

Two designer system prompts currently exist. This document catalogs their differences before Phase 0 unification.

**Sources:**
- Production: `scripts/prompts/unified-designer.md` (used by `scripts/design-agents.js`)
- Local dev: `SYSTEM_PROMPT` constant in `scripts/utils/prompt-builder.js`

## Byte counts
- Production: 9443 bytes
- Local dev: 5209 bytes (extracted to /tmp/prompt-dev.md)

## Differences

### Prod-only sections (in production, missing from dev)

| Section | Summary | Keep in unified? |
|---------|---------|------------------|
| Opening framing ("designing a complete website from scratch. Not filling in templates.") | Strong art-director-vs-engineer framing that sets the mental model for the designer | yes |
| "What You're Building" | Explicitly names the three pages (home, about, project detail) + nav element as the total scope | yes |
| "The Content (this is what you have to work with)" — Identity | Declares logo import path, logo description (green circle target + blue hook), Archive footer link | yes |
| "Navigation & Footer — VARY THESE with each archetype" | 8 concrete archetype examples (Poster, Broadsheet, Specimen, Split, Scroll, Index, Gallery Wall, Stack) showing nav/footer as a design surface | yes |
| Portfolio/About/Signals content inventory | Enumerates featuredProject, selectedWork, experiments, timeline entries, capabilities, personal, and signals — tells the designer what raw material exists | yes |
| "How to Think About This" | Anti-component-mindset framing ("Don't think I need a FeaturedProject component. Think how should Spaceman appear today?") | yes |
| "Content Priority" (1. Portfolio, 2. Identity, 3. Signals) | Explicit three-tier hierarchy for content weight | yes |
| "Required Files" | Lists the exact framework-required files (Layout.tsx, Sidebar.tsx, routes/index.tsx, routes/about.tsx, routes/work.$slug.tsx) with file-level contracts | yes (this is how prod wires archetype → filesystem) |
| "Technical Rules (non-negotiable)" | __root.tsx wraps Layout; route-file pattern; `Route.useParams()`; content import paths; Styled System imports; `import type` rule; forbidden imports; no React hooks | yes — these are hard framework invariants |
| "Content Data Shapes" TypeScript block | Full type declarations for Project, TimelineEntry, Education, identity, personal; also the year-column-width layout rule | yes |
| "Semantic Tokens Available" | Enumerates bg/text/border/accent tokens, font-size scale, spacing scale, line heights, letter spacings | yes |
| "Response Format" — `===FILE:path===` delimiter | Names the delimited-files response format and lists the minimum file set | yes (Task 0.2 has already chosen this format) |

### Dev-only sections (in dev, missing from production)

| Section | Summary | Keep in unified? |
|---------|---------|------------------|
| "Your Design Process" — six design dimensions | Layout structure, Visual hierarchy, Density, Typography scale, Color approach, Element character — framed as axes of variation with infinite values | yes — crisper than anything in prod for forcing dimensional variation |
| "What 'Genuinely Different' Looks Like" | Seven concrete examples of structurally different layouts (nav at bottom, featured fills viewport, persistent sidebar, card grid, asymmetric split, whitespace-to-corner, signals integrated spatially) | yes — complements prod's archetype list with structural rather than typographic variations |
| "Typography" (Google Fonts freedom) | Explicit permission to use any Google Font, with exact mechanics: update `links` in `__root.tsx` head(), keep preconnect hints, reference fonts in `elements/preset.ts` font tokens | yes — prod never tells the designer how to load custom fonts |
| "Accessibility — Non-Negotiable" | Dedicated section with five explicit rules: WCAG AA contrast (4.5:1 body / 3:1 large), min font size (14px body / 12px interactive), line length ≤ 75ch, line-height ≥ 1.4, keyboard-accessible nav, visually distinguishable links | **yes — this is structurally better than anything in prod and should replace any scattered a11y guidance in the unified prompt** |
| "Content Contract" — Home page required sections | Names legacy components FeaturedProject, SelectedWork, Experiments with per-component render requirements | merge — keep the "what must be rendered" data requirements but drop the legacy component names (prod's file-contract model supersedes named components like "FeaturedProject") |
| "Content Contract" — About page required sections | Same, for Bio / Timeline / Capabilities / Personal | merge — keep render requirements, drop "Bio" (prod uses `identity`, and prod explicitly warns `There is NO bio export`) |
| "Content Contract" — All pages: Sidebar requirements | Says Sidebar must render name, role, and all nav links | yes (prod also requires Sidebar.tsx; this just adds the minimum content) |
| "Content Contract" — Rules 1–4 | Data-key-must-appear rule; ProjectRow prop-compat rule; layout-reimagination-is-free rule | partial — rules 1/2/4 keep; rule 3 (ProjectRow compat) is stale legacy and should drop |
| `submit_redesign` / `rationale` field references | Dev assumes a tool-call response shape with a `rationale` field and a `files` array | **no — drop. Task 0.2 has standardized on `===FILE:path===` delimiter format. Rewrite any rationale/tool-call phrasing to fit the delimited-files model (rationale, if kept, moves to a separate comment block or is dropped).** |

### Conflicting sections (both have a version, they differ)

| Topic | Prod version | Dev version | Which wins? |
|-------|--------------|-------------|-------------|
| Opening identity | "You are designing a complete website from scratch. Not filling in templates." — art-director framing | "You are a designer. You have been hired to redesign doug-march.com" — hiring framing | merge — keep prod's art-director framing (stronger mental model), but borrow dev's explicit "PM wrote you a creative brief; brief is WHAT, you decide HOW" to set up the brief-consumption model |
| Variation taxonomy | Archetype-flavored examples (Poster, Broadsheet, Specimen, Split, Scroll, Index, Gallery Wall, Stack) scoped to nav/footer treatment | Six orthogonal dimensions (layout/hierarchy/density/type-scale/color/element-character) scoped to the whole site | merge — keep both. Dev's dimensions answer "on what axes must I vary?", prod's archetype examples answer "what does a concrete dramatic composition look like?" Complementary, not redundant |
| Output/response format | `===FILE:path===` delimited files, complete file contents, no JSON/code fences/explanation outside files | Tool-call shape (`submit_redesign`, `files` array, `rationale` field) | **prod wins — Task 0.2 has already committed to `===FILE:path===` as the unified delimiter** |
| Component contract model | File-based contract (Layout.tsx, Sidebar.tsx, routes/*.tsx must exist; inline-or-extract is designer's choice) | Named-component contract (FeaturedProject, SelectedWork, Experiments, Bio, Timeline, Capabilities, Personal, Sidebar, ProjectRow must exist with specific props) | prod — the file-contract model is more permissive and matches the "designer, not component-filler" framing that both prompts gesture toward. Keep dev's *data-must-be-rendered* requirements; drop its named-component export requirements |
| Identity export naming | `identity` (prod explicitly warns "There is NO bio export") | `Bio` component renders "identity statement" | prod — `identity` is the actual export; the dev prompt is stale on this point |
| Typography guidance | Lists semantic font-size tokens (2xs, xs, sm, base, md, lg, xl, 2xl) but does not grant Google Fonts freedom | Grants Google Fonts freedom and specifies the preset/head-link mechanics, but does not mention the token scale | merge — keep dev's font-loading mechanics + prod's token scale. Designer needs both |

## Recommended unification strategy

Unified file = prod's structural spine (opening art-director framing, content inventory, content priority, required files, technical rules, content data shapes, semantic tokens, response format) with dev's best sections grafted in:

1. Keep prod's "designing from scratch, not filling templates" opening and its full content inventory (Identity / Portfolio / About / Signals) — this is load-bearing context that dev lacks.
2. Insert dev's **"Your Design Process" (six dimensions)** and **"What 'Genuinely Different' Looks Like" (seven structural examples)** right after the opening — they sharpen the variation mandate better than anything in prod.
3. Insert dev's **"Typography" Google Fonts block** alongside prod's semantic-token list — they are complementary (mechanics + tokens).
4. **Adopt dev's "Accessibility — Non-Negotiable" section verbatim** — it's a cleanly structured, explicit, enforceable set of rules and prod has nothing comparable. Flagged as a net improvement.
5. Rewrite dev's "Content Contract" as **data-render requirements only** (e.g., "the identity statement must appear", "every timeline entry must render year + role + company + description"), stripped of legacy component names (FeaturedProject, Bio, ProjectRow) which conflict with prod's file-contract model.
6. Drop dev's `submit_redesign` / `rationale` / `files`-array references entirely.

**Response format:** Task 0.2 has already decided on `===FILE:path===`. Standardize on that; rewrite any tool-call phrasing inherited from dev. If a rationale is desired in the unified world, it should be a separately delimited file (e.g., `===FILE:rationale.md===`) rather than a tool-call field — but whether to keep rationale at all is a separate question outside this audit's scope.
