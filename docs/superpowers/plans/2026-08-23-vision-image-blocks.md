# Real image blocks for the vision critics

**Goal:** let `mockup-critic` and `screenshot-critic` actually see the screenshots they
judge, and stop paying to send pixels the model cannot decode.

## The problem, measured

Both critics embedded their screenshots as `data:image/jpeg;base64,...` URIs inside the
flat text prompt the `claude` CLI takes. Two things were true of that:

- The CLI bills the base64 as text at roughly 1.07 chars/token. A 360KB image is about
  336k input tokens. Three of them (mockup + light + dark) put a run in the $2–3 range
  for a single critic call.
- The model never decoded any of it. A solid-red probe image came back described as
  "light gray" — every verdict since the critics were written has been a guess dressed
  as a visual review.

The critics were dead in CI until the Playwright browser install landed (2026-08-22), so
the bill had not shown up yet. It would have on the next green run.

Real image content blocks cost about 1,600 tokens per 1440×900 JPEG — three images is
~5k tokens, ~$0.015 on Sonnet. That is roughly 200x cheaper than the blind version, and
it works.

## Design

**`scripts/utils/claude-sdk.js`** — `callClaudeSDK(agentName, systemPrompt, contentBlocks, opts)`
wraps `@anthropic-ai/sdk` (already in devDependencies; CI runs a plain `pnpm install`, so
it is present at runtime). Content blocks are `{type:'text'}` / `{type:'image'}` in caller
order, sent as one user turn. Model comes from `modelFor(agentName)` — no hardcoded IDs.
`max_tokens` 16000, timeout 600000ms to match the CLI path's default. Adaptive thinking is
requested where the model supports it and skipped on Haiku 4.5, which rejects it. Helpers
`imageBlock(buffer, mediaType='image/jpeg')` and `textBlock(text)` keep call sites readable;
`hasApiKey()` is the routing predicate. An injectable `opts.client` lets tests run without
touching the network.

**`scripts/utils/vision-router.js`** — `callVisionAgent({agentName, systemPrompt, contentBlocks, ...})`:

| Condition | Path |
| --- | --- |
| `ANTHROPIC_API_KEY` set and ≥1 image block | SDK, real image blocks |
| No key (local Max-plan dev) | CLI, text blocks only, images dropped |
| No image blocks at all | CLI |
| SDK call throws | CLI text-only fallback, warning logged |

The CLI fallback drops the images rather than inlining base64: blind base64 costs money and
returns a hallucination, while a critic told plainly that no screenshot is attached gives a
cheaper and more honest read. `NO_IMAGE_NOTICE` is prepended so the critic judges the
declared brief instead of inventing pixels.

Both critics keep returning raw assistant text, so `parseCriticVerdict` and
`parseMockupCriticResponse` are untouched.

## Files touched

- `scripts/utils/claude-sdk.js` (new)
- `scripts/utils/vision-router.js` (new)
- `scripts/agents/mockup-critic.js` — `runMockupCritic` routes through `callVisionAgent`;
  block assembly extracted to the exported `buildMockupCriticBlocks` for testing
- `scripts/design-agents.js` — screenshot-critic prompt assembly inside
  `runScreenshotCriticGate` only (mockup jpeg + light jpeg + dark jpeg as image blocks);
  imports are dynamic, inside the gate, to keep the diff off the shared import block
- `tests/utils/claude-sdk.test.js` (new), `tests/utils/vision-router.test.js` (new),
  `tests/scripts/agents/mockup-critic.test.js` (block-assembly cases added)

## Side effect: the screenshot critic could never SHIP

`runScreenshotCriticGate` fed `parseCriticVerdict` the `_rawResponse` that `callAgent`
extracts, which is the text *inside* `===VERDICT===`…`===END===` with the delimiters
stripped. `parseCriticVerdict` anchors on those delimiters, so it always reported
`malformed` and failed closed to REVISE — every run took the revision branch, and the
`**Responsible agent:**` match (which lives inside the block) never fired either. On a SHIP
response the react-engineer was re-run with empty feedback.

Routing through `callVisionAgent` hands the parser the full raw response, which is what it
was written for. The gate now reads SHIP as SHIP and gets the real issue list as feedback.

## Drift vs `2026-04-16-flow-opt-phase-4-vision-agent-calls.md`

The April plan is four months old and the pipeline moved under it.

1. **Different agents.** The plan wires "Director" and "Unified Designer". Neither exists:
   the flow is art-director → mockup-designer → mockup-critic → react-engineer →
   screenshot-critic. The vision consumers today are the two critics, so those are the
   call sites converted.
2. **No reference manifest.** Task 3's `scripts/utils/reference-loader.js` reads
   `signals/today.references.json`, which the pipeline never writes — references arrive as
   markdown text (`signals/today.references.md`). Task 3 is dropped, not deferred; the
   images that matter are captured screenshots, already in memory as buffers.
3. **Model resolution.** The plan defaults to a hardcoded `claude-sonnet-4-6`.
   `scripts/utils/models.js` (added after the plan) now owns per-agent explicit IDs with a
   dev/prod tier — `modelFor(agentName)` is the only source used here.
4. **Call shape.** The plan's `callClaudeSDK` takes a full `messages` array and requires
   `opts.apiKey`; this one takes ordered content blocks (a single user turn) and defaults
   the key from the environment.
5. **Router input.** The plan's router takes `{userText, images[]}` with per-image captions
   appended after each image. The screenshot critic needs labels *before* each image
   (mockup / LIGHT / DARK), so the router takes ordered blocks and derives the CLI text
   from them instead.
6. **Fallback content.** The plan silently drops images on the CLI path. This adds an
   explicit no-image notice so a text-only critique does not invent a render.
7. **Thinking.** Not addressed by the plan; adaptive thinking is on by default here, with a
   Haiku guard.
8. **Counts.** The plan's expected suite sizes (262 → 271) are stale — the suite is at 406.
9. **Accurate as written:** the `callClaudeCLI(agentName, systemPrompt, promptText, options)`
   signature and the "no API key in local dev, key in CI" assumption both still hold.

## Not in this change

- Capture resolution and JPEG quality stay as they are (1440×900 / 1280×900, q70).
  Right-sizing images to the API's 1568px cap is a follow-up.
- No SDK-side cost aggregation. `usage.input_tokens` / `output_tokens` are logged per call
  but not summed into the trace.
- `extraCliArgs` (e.g. `--fallback-model`) has no SDK equivalent; neither critic used it.
