# Session Handoff — 2026-04-16

**Purpose:** Pick up the pipeline-hardening work in a fresh Claude Code session. Read this first, then `2026-04-16-pipeline-hardening.md`, then `2026-04-16-token-designer-review.md`. That's the full orientation.

---

## TL;DR — where we are

The daily AI redesign pipeline was failing too often (~50% first-try success rate, mostly from Haiku botching `__root.tsx`). Owner wants two things together: **no failed builds** AND **~$1/run cost ceiling** AND **amazing designs daily**.

**Done so far:**
- ✅ Diagnosed all 4 main failure categories (see hardening doc).
- ✅ Built typography "chassis" system: curated catalog of font + scale presets the Director picks from, orchestrator deterministically generates `__root.tsx` and a chassis-preset.ts that merges into the design system.
- ✅ Removed `__root.tsx` and fonts/fontSizes from agent authorship entirely. Should kill ~38% of failures (Cat A).
- ✅ Committed at `96aab74` with all tests passing (220/220) and `pnpm build` green.

**Next up (in agreed order):**
1. **Task #9** — Apply frontend agent's review findings to the token-designer (post-chassis cleanup + design-quality recommendations).
2. **Task #7** — Curate the chassis catalog (currently 2 entries; target 12-15) from Fontpair + Typewolf + Typescale.
3. Then back to discussing Tasks #2, #3, #4, #5, #6 in the order the user prefers.

---

## Task list (verbatim, persist these — TaskList may not survive session restart)

| # | Status | Subject | Notes for the next session |
|---|--------|---------|----------------------------|
| 1 | ✅ completed | Cat A — __root.tsx mutilation by Haiku | Resolved by chassis system. Don't reopen. |
| 2 | pending | Cat B — unified-designer silent stalls (~38%) | Discussion paused; not yet planned. Includes the one-line timeout bug (Task #5). |
| 3 | pending | Cat C — chatter prefix parse failures (~13%) | Frontend agent has a one-line fix proposal — anchor parser to find first `===` anywhere. See review doc. |
| 4 | pending | Cat D — disallowed-URL violations (~13%) | Plan: harden unified-designer prompt to forbid external hrefs explicitly. |
| 5 | pending | One-line bug — retry inherits 10-min timeout | `scripts/design-agents.js:1151` — retry call needs `timeoutMs: 1800000, stallTimeoutMs: 1500000`. Trivial fix. |
| 6 | pending | Cat E — unified-designer omits required files | Already partially handled by REQUIRED_FILES retry block (`design-agents.js:930-955`); needs cost-aware refinement. |
| 7 | pending | Curate chassis catalog (12-15 entries) | Sources: fontpair.co, typewolf.com/google-fonts, typescale.com. 4-pass workflow in pipeline-hardening doc. |
| 8 | ✅ completed | Wire chassis into orchestrator | Done at commit 96aab74. Tests pass, build passes. |
| 9 | pending | Address frontend agent review findings | See `2026-04-16-token-designer-review.md`. Top items: color mandate injection, parser anchoring, drop library-typography from prompt, resolve "favor vibrancy" vs "let one accent do the work" contradiction. |

---

## Architecture summary — typography chassis

A "chassis" is a curated typography preset:
- Font families (e.g., Playfair Display + Outfit)
- Per-family weights and italics
- Type scale (modular ratio + base size, generates `fontSizes` ramp)

**Where things live:**

```
elements/
├── chassis/
│   ├── types.js                         JSDoc type definitions
│   ├── index.js                         CHASSIS_CATALOG export
│   ├── playfair-outfit.js               example: editorial pairing
│   └── space-grotesk-work-sans.js       example: product/tech pairing
├── chassis-preset.ts                    GENERATED — fonts + fontSizes only
└── preset.ts                            Token Designer's output (no fonts/fontSizes)

scripts/
├── utils/chassis.js                     buildGoogleFontsUrl, buildFontTokens,
│                                        buildFontSizes, renderRootTemplate,
│                                        renderChassisPresetFile, getChassisById,
│                                        formatChassisCatalogForPrompt
├── templates/__root.tsx.template        Frozen shell with {{GOOGLE_FONTS_URL}}
└── preview-chassis.js                   CLI: `node scripts/preview-chassis.js <id>`

panda.config.ts                          chassisPreset listed LAST (overrides agent)
```

**Lifecycle per daily redesign:**

1. Director phase: catalog appended to user prompt; Director emits `===CHASSIS_ID===<id>`.
2. Orchestrator parses chassis ID via `resolveChassisFromDirectorOutput()`. Falls back to `CHASSIS_CATALOG[0]` with warning if invalid.
3. Token Designer authors `elements/preset.ts` minus fonts/fontSizes (chassis owns those — even if agent emits them anyway, chassis-preset wins by ordering).
4. Orchestrator writes `elements/chassis-preset.ts` and `app/routes/__root.tsx` deterministically from the chosen chassis.
5. Codegen merges both presets; build proceeds normally.

**File ownership in `scripts/utils/site-context.js`:**
- `TOKEN_FILES` = `['elements/preset.ts']` (was 2 entries; __root.tsx removed)
- `ORCHESTRATOR_FILES` = `['app/routes/__root.tsx', 'elements/chassis-preset.ts']` (new)

---

## Known issues to address

### 1. Modular scale collides at small end (HIGH priority for Task #7 curation)

With aggressive ratios (1.333+), `2xs` and `xs` both clamp to the 0.625rem floor — same value, ramp collision. See `node scripts/preview-chassis.js playfair-outfit` output. Two reasonable fixes:
- Use ratio ≤1.2 across the catalog (cramped at top; not ideal for editorial designs).
- Allow chassis to override individual ramp steps (e.g., hand-set 2xs/xs/sm, generate md/lg/xl/2xl from ratio). Likely the right answer — lets curators preserve dramatic display sizes while keeping legibility at the bottom.

### 2. Modular scale doesn't match today's hand-tuned drama

Today's site uses `lg=34px, xl=56px, 2xl=88px` — far more dramatic than ratio 1.333 produces (`28, 38, 51`). When the first chassis-driven daily run happens, display type WILL look smaller. Either:
- Bump the playfair-outfit ratio to ~1.5 (Perfect 5th) to approximate.
- Use the per-step override mechanism above.

### 3. `identifyFailingAgent` fallback for orchestrator-owned files

After the chassis change, `__root.tsx` no longer maps to any agent in `FILE_OWNERSHIP`. If a build error mentions `__root.tsx`, the function returns `'both'` (default fallback) and triggers wasted agent retries. Low priority — chassis system shouldn't produce broken `__root.tsx` — but worth a `'orchestrator'` value with fail-fast handling eventually.

### 4. Frontend agent's review highlights (from Task #9)

- **Color quality is the bigger remaining problem.** Apr 14 was the third coffee-shop palette in a row (olive on stone). "Favor vibrancy" mandate is being ignored. Suggested fix: Director injects a `colorMandate` (target hue + forbidden recent hues from archived presets) into the token brief.
- **Internal contradiction:** `token-designer.md:5` says "favor vibrancy"; `:26` says "let one accent do the work" + "build a full shade scale" — those read as conservative-by-default. Pick a side.
- **Duplicate guidance:** `library-color.md:14-27` and `token-designer.md:26` both prescribe the 9-step neutral scale, differently. Cut one.
- **After chassis lands, drop `library-typography.md`** from the token-designer system prompt entirely (~55% prompt reduction).
- **Parser anchoring:** the `===FILE:` parser only matches at line start; anchor it to find the first delimiter anywhere to recover from chatter prefixes. Closes Cat C with one line.
- **Smoke check gap:** add `styled-system/styles.css` size check — empty CSS file passes today's checks but breaks the site silently.

---

## Verification commands (run these in any new session to confirm state)

```bash
git log --oneline -3                                # see commit 96aab74
pnpm vitest run                                     # 220/220 should pass
pnpm build                                          # should succeed
node scripts/preview-chassis.js --list              # show 2 chassis
node scripts/preview-chassis.js playfair-outfit     # see end-to-end output
```

---

## Owner preferences captured during this session

- **Single unified-designer pattern is non-negotiable.** Earlier attempt at multi-agent design swarm (Layout/Sidebar/Footer/Component) produced incoherent compositions. Don't propose splitting it back up.
- **Cost ceiling: ~$1/run.** Current happy-path is ~$0.78; retries push it to $1.20-2.00. Sonnet for unified-designer is the dominant cost; do not switch to Haiku for that role.
- **No fragmentation of the design pipeline.** Iterate on the existing structure; don't redesign the agent topology.
- **Use `glow` for opening markdown.** (Existing memory note.)
- **Brainstorm/plan before implementation; user prompts to /clear before implementation begins.** (Existing memory note.)
- **The chassis approach is fonts + font scale only for v1.** Spacing, colors, semantic tokens stay in Token Designer's lane. Future expansions (spacing chassis, full presets) are separate decisions.

---

## Pre-existing uncommitted work in tree (NOT touched by this session)

`git status` shows ~15 modified files and dozens of untracked archive/* and public/archive/* paths from prior work. These were NOT staged into commit `96aab74` — only chassis files were. Don't accidentally bundle them into a future commit unless the user asks.

---

## Key file references

- **Hardening master plan:** `docs/superpowers/plans/2026-04-16-pipeline-hardening.md`
- **Token-designer review (Task #9 source):** `docs/superpowers/plans/2026-04-16-token-designer-review.md`
- **This handoff:** `docs/superpowers/plans/2026-04-16-session-handoff.md`
- **Orchestrator entry point:** `scripts/design-agents.js`
- **Chassis catalog source:** `elements/chassis/index.js`
- **Auto-memory index:** `~/.claude/projects/-Users-dougmarch-Projects-dougmarch/memory/MEMORY.md`
