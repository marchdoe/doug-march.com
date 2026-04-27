# TODO

Last verified against the live repo: 2026-04-27.

Status legend: 🔴 not started · 🟡 partial · ✅ done · ❓ needs answers before spec

---

## Production / API mode

### 1. Pass Awwwards screenshots via API image content blocks ✅ spec ready

→ [`docs/specs/01-awwwards-screenshots-image-blocks.md`](./docs/specs/01-awwwards-screenshots-image-blocks.md)

All three creative agents (interpret-signals, token-designer, unified-designer) receive base64 image blocks fetched once at signal-collection time. URL blocks rejected for reliability. Fetch failures degrade gracefully to text-only.

---

### 2. Split unified designer into Designer + React Engineer ✅ spec ready

→ [`docs/specs/02-designer-engineer-split.md`](./docs/specs/02-designer-engineer-split.md)

Mockup designer (Opus 4.7) → mockup-critic → React engineer (Sonnet 4.6). Standalone HTML/CSS mockup is naturally archive-friendly. Hard replace; cleans up orphan prompts from the previous component-level split.

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

### 5. Archive visual redesign + mark-as-reference (owner-only) ✅ spec ready

→ [`docs/specs/05-archive-visual-redesign.md`](./docs/specs/05-archive-visual-redesign.md)

Visual upgrade only — archive keeps its fixed identity, doesn't participate in the daily redesign. Index rows get thumbnail + text layout; detail page leads with hero screenshot. Brings back "Mark as reference" UI from commit `d91b3e1`, dev-mode-gated like the existing dev panel.

---

## Pipeline polish

### 6. Pipeline variance (instrumentation + soft guidance) ✅ spec ready

→ [`docs/specs/06-pipeline-variance.md`](./docs/specs/06-pipeline-variance.md)

Extends the existing `color-mandate.js` pattern with parallel utilities for archetype and chassis variance. Adds a `/dev/variance` dashboard mirroring the existing `/dev/responsive`. Soft guidance only — never blocks the model from picking what fits. "Fit > novelty" is the guiding principle, repeated in every variance prompt section.

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

- [x] Responsive design pipeline (PR #49, 2026-04-20)
- [x] Interpret-signals false-positive in API mode (PR #55, 2026-04-26)
- [x] CI security hardening (PR #41)
- [x] Pipeline reliability — archetype extraction, retry handling, build smoke tests (PR #37, #41)
- [x] "Save as Reference" button — removed from code
