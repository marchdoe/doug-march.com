# TODO

Last verified against the live repo: 2026-04-27.

Status legend: 🔴 not started · 🟡 partial · ✅ done · ❓ needs answers before spec

---

## Production / API mode

### 1. Pass Awwwards screenshots via API image content blocks ✅ spec ready

→ [`docs/specs/01-awwwards-screenshots-image-blocks.md`](./docs/specs/01-awwwards-screenshots-image-blocks.md)

All three creative agents (interpret-signals, token-designer, unified-designer) receive base64 image blocks fetched once at signal-collection time. URL blocks rejected for reliability. Fetch failures degrade gracefully to text-only.

---

### 2. Split unified designer into Designer + React Engineer ✅ done

→ [`docs/specs/02-designer-engineer-split.md`](./docs/specs/02-designer-engineer-split.md) (superseded — see feat/design-quality-pipeline)

Implemented in feat/design-quality-pipeline: mockup-designer, mockup-critic, react-engineer agents wired through design-agents.js. Orphan prompts removed.

---

### 3. Token Designer chaos mode ✅ spec ready

→ [`docs/specs/03-token-chaos-mode.md`](./docs/specs/03-token-chaos-mode.md)

5 vibes (Brutalist · Editorial · Album-Cover · Hyper-Modern Brand · Programmer-Aesthetic) applied to BOTH palette (token-designer prompt extension) AND typography (5 new chassis catalog entries). Risk-weight gated: 5 = today's behavior, 7 = vibe-anchored, 9 = max-axes. No new env vars; extends existing creative-weights and chassis systems.

---

## Site features

### 4. Loading states on archive routes ✅ spec ready

→ [`docs/specs/04-archive-loading-states.md`](./docs/specs/04-archive-loading-states.md)

Skeleton rows on the index page, skeleton sections on the detail page. Plain CSS pulse animation, no new dependencies. Distinct empty state preserved for genuinely empty archives.

---

### 5. Archive section complete redesign ❓ needs new spec (supersedes old spec 05)

→ old spec: [`docs/specs/05-archive-visual-redesign.md`](./docs/specs/05-archive-visual-redesign.md) (scope expanded 2026-06-11)

Owner direction (2026-06-11): main structure is correct (archive section + access to historical designs stays), but the **index page content organization and the overall user experience need a full rethink** — not just the visual upgrade the old spec described. Known inputs for the new spec:

- Index is currently a flat text list (archetype + truncated brief + date) — no visual representation of what are fundamentally *visual* artifacts, no grouping/browsing affordances, and the list grows unbounded (~80 entries and counting).
- **Blocker to fix first: per-date screenshots have never existed in production.** `archiver.js` only captures `screenshot.png` when a dev server is on port 5173 (never true in CI), so `public/archive/{date}.png` is empty for every date and `hasScreenshot` is always false. The screenshot-critic already captures a PNG buffer in CI — persist it to the build dir so the archiver can publish it.
- Old spec's still-valid pieces to carry forward: thumbnail+text rows, detail page leads with the screenshot, mark-as-reference (owner-only), fixed archive identity.
- Consider: the archive as the *rating/curation surface* — the pipeline's ratings + reference channels are currently unfed (last rating 2026-03-26, references/index.yml empty), partly because there's no comfortable place to review designs visually.

---

## Pipeline polish

### 6. Pipeline variance (instrumentation + soft guidance) 🟡 partial

→ [`docs/specs/06-pipeline-variance.md`](./docs/specs/06-pipeline-variance.md)

Shell/archetype variance shipped as `scripts/utils/shell-mandate.js` (feat/design-quality-pipeline, 2026-06). The `/dev/variance` dashboard remains unimplemented and parked.

---

### 7. Bump Claude CLI past 2.1.92 ✅ spec ready

→ [`docs/specs/07-claude-cli-version-bump.md`](./docs/specs/07-claude-cli-version-bump.md)

**Cost: $0 for discovery.** Test loop runs locally on Max plan auth — CLI binary and prompt-handling behavior are identical in both environments. Final CI dry-run as a confidence check (~$2). Binary-search fallback if `2.1.120` fails.

---

## Housekeeping

### 8. Close resolved pipeline-failure issues ✅ spec ready

→ [`docs/specs/08-close-pipeline-failure-issues.md`](./docs/specs/08-close-pipeline-failure-issues.md)

Triage 8 open issues. Close 5 with known causes (PR #55 + credits top-up). Investigate #43, #45, #48 by pulling their failed run logs and categorizing — close, relabel, or consolidate into a real bug ticket.

---

### 9. Dependabot alert #325 (follow-redirects) ✅ spec ready

→ [`docs/specs/09-dependabot-follow-redirects.md`](./docs/specs/09-dependabot-follow-redirects.md)

Add `pnpm.overrides` entry pinning `follow-redirects` to `^1.16.0`. Verify with `pnpm test` + `pnpm build`. ~15 min of work.

---

## Done (recent)

- [x] Design-quality pipeline — mockup designer/critic/engineer split, shell mandate, GitHub-issue ratings, OG images (feat/design-quality-pipeline)
- [x] Responsive design pipeline (PR #49, 2026-04-20)
- [x] Interpret-signals false-positive in API mode (PR #55, 2026-04-26)
- [x] CI security hardening (PR #41)
- [x] Pipeline reliability — archetype extraction, retry handling, build smoke tests (PR #37, #41)
- [x] "Save as Reference" button — removed from code
