# Agent Audit Program — 2026-04-16

**Status:** scaffolded; each audit is an independent work item to run in its own session.

**Motivation.** The token-designer received a deep review (`2026-04-16-token-designer-review.md`) that surfaced meaningful quality + reliability findings. Every other agent in the pipeline should receive equivalent scrutiny. This program document lists one decomposed audit per agent, sized so each can be a focused session like the token-designer review was.

**Runs in parallel with, not sequentially after,** the flow-optimization work (`2026-04-16-flow-optimization-design.md`). The audit findings will inform follow-up optimizations beyond what the flow-optimization spec already captures.

---

## Audit template

Each agent audit follows the structure of `docs/superpowers/plans/2026-04-16-token-designer-review.md`:

1. **Prompt audit** — read the agent's system prompt line-by-line; flag dead content (post-chassis, post-cleanup drift), contradictions, redundancy, weak or un-actionable guidance.
2. **Code audit** — read the call site(s), parsing/fallback logic, retry behavior, error handling.
3. **Failure catalog** — grep archived failed builds (`archive/<date>/build-failed-*`) for failure modes specific to this agent.
4. **Quality contribution** — does the agent actually move the design-quality needle, or is it structural plumbing? What would it look like for this agent to "do its job better"?
5. **Cost & latency profile** — what does it cost per run? Does the input/output shape suggest prompt-size waste?
6. **Recommendations** — prioritized list of fixes; distinguish "ship this week" from "needs a refactor".

Each audit produces a markdown document at `docs/superpowers/plans/2026-04-16-<agent-name>-review.md`.

---

## Audit backlog

### Audit 1 — Interpret Signals (`scripts/interpret-signals.js`)

**Role:** signals YAML → creative brief markdown.

**Model:** Haiku.

**Why it matters:** The brief sets the day's mood and narrative. If the brief is generic, every downstream agent has nothing to anchor to. The "WordPress template" problem may partly originate here — if briefs don't convey specific mood/urgency/point-of-view, downstream agents have no source of distinctiveness.

**Audit focuses:**
- Does the brief produce specific, opinionated mood direction, or generic prose?
- Are signals (weather, news, sports, etc.) reflected in the brief or lost in narrative smoothing?
- Is the output stable (same signals → same brief) or overly noisy?
- Haiku-fit: is this genuinely a Haiku-grade task or does it deserve Sonnet?

### Audit 2 — Design Director (`scripts/design-agents.js` — Director phase)

**Role:** brief + context → visual spec + archetype + typography chassis ID (+ COLOR_MANDATE consumer once Phase 2 of flow-opt ships).

**Model:** Sonnet.

**Why it matters:** This is the opinion-setting phase. If the Director hedges, everything downstream hedges. Deep review should probe whether the visual spec is commanding enough to survive Token Designer and Unified Designer's interpretation.

**Audit focuses:**
- Does the visual spec commit to specific choices (hierarchy, hero element, density, whitespace) or list options?
- Are archetype selections genuinely varied across recent runs, or defaulting to one or two?
- Is the chassis selection (typography) defensible — is the Director actually matching mood to chassis, or picking by habit?
- Prompt size: Director's system prompt has grown with chassis additions; audit for dead sections post-flow-opt.
- Failure modes: does Director ever produce a spec so vague that downstream agents can't execute it?

### Audit 3 — Spec Critic (`scripts/design-agents.js` — Spec Critic phase)

**Role:** checks the Director's visual spec, may trigger a Director revision loop.

**Model:** Haiku.

**Why it matters:** This may be security theater. The review of Token Designer hinted the Spec Critic's current checks are "hue collision"-flavored and not much else. If it's not catching real issues, it's adding Haiku cost and latency for no benefit. If it IS catching issues but silently, we need to know what.

**Audit focuses:**
- What does the Spec Critic actually check?
- How often does it trigger a Director revision? What fraction of those revisions improve the spec?
- Could this be replaced by deterministic code (regex for hue collisions, for instance)?
- Kill-candidate check: what breaks if we remove the Spec Critic entirely?

### Audit 4 — Unified Designer (`scripts/design-agents.js` — Unified Designer phase)

**Role:** visual spec + tokens + brief → Layout.tsx, Sidebar.tsx, 3 route files.

**Model:** Sonnet.

**Why it matters:** Dominant cost (~$0.525/run), most fragile (~38% of failures were here before chassis work), and the agent doing the most actual design work. This audit is the highest-leverage of all four remaining.

**Audit focuses:**
- Prompt size: how much of the 60-80KB prompt is actually load-bearing vs dead library content?
- Composition coherence: when output is "locally good pieces that don't add up," is it a prompt issue (missing composition guidance) or a model-capability issue?
- Mobile-display quality: specifically flagged by the owner as a gap. What in the current prompt/process addresses mobile (probably nothing)?
- Retry/stall behavior: the known failure mode (silent stalls on 60KB+ prompts) — revisit after flow-opt Phase 4 (vision inputs) since input size changes.
- Component boundaries: the prompt describes 5 files; does splitting at different boundaries (by route vs by component vs by concern) make the agent's job easier?

### Audit 5 — Screenshot Critic (`scripts/design-agents.js` — Screenshot Critic phase)

**Role:** vision pass on the built site; may trigger a revision.

**Model:** Sonnet (with vision).

**Why it matters:** Like Spec Critic, this may be doing little useful work. Screenshot Critic's value depends on whether its critique actually drives meaningful revisions, or whether it rubber-stamps outputs.

**Audit focuses:**
- What does the Critic actually critique? Taste? Correctness? Accessibility?
- How often does it trigger a revision? Are those revisions good?
- Cost: $0.06/run — is that buying anything?
- Could its vision pass be repurposed to feed into the new `saveAsReference` reference-curation loop (rate + save)?
- Mobile: does the Screenshot Critic see mobile or only desktop? If only desktop, it can't catch the mobile-display problem.

---

## How to execute one audit

```
1. /clear into a fresh session
2. `cd /Users/dougmarch/Projects/dougmarch`
3. Say: "Deep-review the <agent-name> in scripts/design-agents.js (or scripts/interpret-signals.js) using 2026-04-16-token-designer-review.md as the template. Write findings to docs/superpowers/plans/2026-04-16-<agent-name>-review.md."
4. Review the output; share back in the main work-track session for prioritization.
```

Each audit should take 20-40 minutes of session time. Do them one per session to keep context tight.

---

## Sequencing suggestion

Prioritize audits by leverage:

1. **Unified Designer** — highest cost, most fragility, most design responsibility.
2. **Design Director** — sets opinion; opinion matters more than execution.
3. **Interpret Signals** — upstream of everything; if briefs are generic, nothing downstream recovers.
4. **Screenshot Critic** — may be worth keeping as a reference-curation helper even if its critic role is weak.
5. **Spec Critic** — kill-candidate; audit last to decide whether to remove.

This order biases toward quality (Audits 1–3) before cost-cutting (Audits 4–5). Adjust based on what the owner is feeling most painfully on any given week.

---

## Out of scope for this program

- **Codegen and build-validator** — deterministic code; no LLM to audit.
- **Orchestrator** (`scripts/daily-redesign.js`, `scripts/run-pipeline.js`) — the control flow has been touched heavily during the chassis + pipeline-hardening work; save a dedicated architecture review for when it stabilizes.
- **Signals collectors** (`scripts/signals/*.js`) — mechanical API clients; audit only if specific collectors are producing garbage that hurts briefs.
