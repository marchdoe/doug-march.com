# The swarm, tested and then split — design

**Date:** 2026-09-02
**Status:** Draft for Doug's review
**Source:** [#221](https://github.com/marchdoe/dougmar.ch/issues/221), the part the 2026-08-31 status comment left open.

## Problem

`runAgentSwarm` in `scripts/design-agents.js` is one closure from line 466 to 2282. It carries about thirty locals that five nested functions and every retry branch mutate, it has nineteen `restore(...)` call sites, and nothing runs it except a real nightly. The only tests that mention it read the source file as a string and regex for invariants like `MAX_REPAIR_ATTEMPTS`.

The issue asks for the closure to become phase modules over a `RunState`. That is the right end state, and it cannot be done safely today, because a mechanical split of this function will get one rollback branch wrong and the first anyone would hear of it is a lost night. So the order is tests first, then the split, and the split lands only after the tests hold and a nightly has run on the harness change.

The constraint Doug set is that redesign quality does not move. This is a refactor with no change to prompts, models, budgets, retry bounds, rollback sets, or what the archive receives. The tests exist to prove that.

## What already exists

#220 built the model seam. `callClaudeCLI` and `callVisionAgent` replay a recorded response when `MOCK_MODE=true`, indexed per agent per call, and `fixtures/agents/<agent>/00.txt` holds one reconstructed response for each of the six agents, built from the 2026-08-30 archive by `scripts/build-fixtures-from-archive.js`. Every agent goes through those two functions, so a text at that seam exercises the real parsers, validators and gates.

What does not exist is a way to run the swarm without it writing into the checkout. The swarm reads prompts and writes presets, routes, components, signals and traces under `ROOT`, the module-level constant in `file-manager.js`, and `backup`, `restore` and `cleanupOrphans` use the same constant. `writeFiles`, `validateBuild`, `formatGeneratedFile`, `archive`, `captureSnapshot` and `computeMandateSections` already take a root, because #312, #314 and the snapshot-root work threaded one through when their tests needed it. The swarm is the last piece that does not.

## Decisions

1. **The swarm takes a root.** `runAgentSwarm(context, { onTraceStep, root = ROOT })`. The thirty-four `ROOT` references inside it and its local helpers (`writeEngineerFiles`, `captureOgCard`, `writeArchetype`, `validateCodegen`) become `root`. `backup`, `restore` and `cleanupOrphans` in `file-manager.js` gain `{ root = ROOT }` the way `writeFiles` already has it. With the option omitted nothing changes, which is the whole of the nightly's exposure to this PR.

2. **Tests run the real function against a temp root.** The harness seeds a `tempRepoRoot()` with copies of `scripts/prompts/`, `elements/chassis/`, `elements/preset.ts`, `app/assets/`, `signals/today.yml` and an `archive/` with two prior dates, then calls `runAgentSwarm` with `root` pointing at it. Real prompt files, real sizes, real `backup` and `restore` over real files. The 55 KB mockup-prompt guard and the `Layout.tsx` existence gate are exercised as written, not simulated.

3. **Model calls are scripted at the two seams #220 chose.** `vi.mock` on `./utils/claude-cli.js` and `./utils/vision-router.js` replaces `callClaudeCLI` and `callVisionAgent` with per-agent queues. The default queue for each agent is its fixture on disk, so the happy path replays the reconstructed 2026-08-30 run through the real Art Director, mockup designer and critic parsers. A scenario overrides individual calls: a critic that says `REVISE` twice, an engineer reply missing `Sidebar.tsx`, a stall error. `MOCK_MODE` itself is not used, because it refuses under `GITHUB_ACTIONS` and the unit suite runs there; the refusal is right for the nightly and irrelevant to a test that never reaches a shell.

4. **The other seams are the ones that spawn a process or a browser.** Codegen (`spawnSync` for `panda codegen`), `validateBuild`, `formatGeneratedFile`, the three capture functions in `snapshot.js`, `runSurfaceGate` and `listGeneratedRoutes` in `surface-gate.js`, and `archive` in `archiver.js`. Each fake records its calls and returns a scripted result; the `archive` fake creates `archive/<date>/build-<ts>/` under the root so `saveTrace` lands the trace where the real one does. Pure helpers in those modules (`faultsForOwner`, `ownerForSurface`, `formatFindingsForCritic`) stay real through `importOriginal`.

5. **The quality lock is a prompt snapshot.** For every model call the harness records the agent name, the system prompt, the user prompt and the options, and the happy-path test compares that list to a file snapshot. After the split, the same test must produce the same snapshot byte for byte. That is the strongest statement available that the agents are told the same things in the same order with the same models and budgets. Run dates are fixed by `signals.date`, the risk weight derives from the date, and nothing else in a prompt depends on the clock.

6. **Scenarios are nights, one per branch that has cost one.** The matrix is in the plan. Every retry bound, deadline checkpoint and rollback set in the inventory has a test that fails if it moves.

7. **The split follows the issue's module list** and adds nothing to it. `scripts/pipeline/run-state.js` holds the shared locals. `context.js` loads prompts, references and advisory blocks. `phase-art-director.js` owns the Art Director call and retry, chassis resolution, orchestrator file generation and the codegen retry. `phase-mockup.js` owns the designer and critic loop. `phase-engineer.js` owns the primary call, the stall retry, the output-completeness loop, the write and the `Layout.tsx` gate. `gates.js` owns the spec critic and the screenshot critic gate with its surface measurements. `repair.js` owns the build-failure loop. `persist.js` owns `saveTrace`, `archiveFailedSources` and `archiveAndReturn`. `runAgentSwarm` keeps its name, export and signature and becomes the conductor. One module per commit, tests green after each.

8. **Nothing found along the way gets fixed in the refactor.** The inventory turned up four oddities: `chosenArchetype` is captured before the codegen retry and never re-read from the settled result, unlike the composition and header; `measurablesDecl` is parsed and logged and never used; a screenshot critic that names any responsible agent other than `react-engineer` silently produces no revision; and `context.brief` is destructured but the nightly never sets it. Each becomes an issue. The split reproduces them.

## Sequencing

PR 1 is the root option, the harness, the scenarios and the prompt snapshot. It touches the swarm in one mechanical way. After it merges, one nightly runs on it before PR 2 starts; the nightly is the only test of the unmocked path and it costs a night's credits, so it is not repeated per commit.

PR 2 is the split, one module per commit, with the snapshot and scenarios unchanged throughout. The source-regex tests in `tests/scripts/design-agents.test.js` that pin repair-loop invariants are deleted as each invariant gains a behavior test, since after the split the text they grep for is no longer in that file.

## Not now

Any change to what the agents are asked or what the archive receives. Recording fresh fixtures from a live run. The `/dev` panel's use of the swarm.
