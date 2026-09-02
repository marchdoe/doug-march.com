# The run, stage by stage, on the day page

**Goal:** Every `/how/<date>` page shows how long each stage of that night's run took and
what each agent call cost, with the run's wall clock and total at the end. It replaces the
lone "Cost" rail row.

**Source:** [#415](https://github.com/marchdoe/dougmar.ch/issues/415). The ticket has the
worked example (2026-09-02: 22m 31s, $3.08, eleven calls) and the design brief. This
document settles the data shape, the merge rule between the two source files, the era
behaviour, and the order of work.

**Tech stack:** existing. Panda tokens under `archive.*`, the `Step` sections in
`app/routes/how.$date.tsx`, the projection in `scripts/generate-archive-json.js`. No new
dependencies.

---

## Load-bearing facts

Measured 2026-09-02 against `c1378b6`.

- **`trace.json`** exists for 111 of 124 dates (era `traced`, from 2026-03-29). Shape:
  `{ date, startedAt, completedAt, steps: [{ name, phase, durationMs, timestamp, input,
  output }] }`. Step names changed across eras: `design-director`, `token-designer`,
  `unified-designer` early; `art-director`, `react-engineer`, `mockup-critic`,
  `surface-gate`, `screenshot-critic` now. A step's `timestamp` is when it ended.
- **`cost.json`** exists for 2 dates (era `grammar`, from 2026-08-23). Shape:
  `{ total_usd, estimated, partial, retries, calls, byAgent: [{ agent, model, source,
  input, output, cache_read, cache_write, cost_usd, estimated, ms, num_turns }] }`.
  `byAgent` is one entry per call, in call order.
- **`record.json`** carries `cost` in full (`normalizeCost` in
  `scripts/utils/archive-record.js`) and does not carry the trace, because the pipeline
  writes the record before `trace.json` exists. `record.attempts` is the build attempt
  count.
- **`public/archive-data/<date>.json`** is `{ ...record, hasScreenshot, pages,
  uniqueness }`, written by `projectArchive` at build time. It is regenerated from the
  archive on every build, so a projection change needs no backfill.
- The two lists do not map one to one. Last night's trace has one `react-engineer` step
  and no `mockup-designer` step; the cost file has two `react-engineer` calls and three
  `mockup-designer` calls. The trace's `mockup-critic` rounds (about 100s each) contain the
  designer's time; the cost file's `mockup-critic` calls are the critic alone (about 16s).
- `app/lib/archive-era.ts` gates absence copy by era through `FIELD_ERA` and `predates`.
  The page's `Absent` component renders the sentence.
- Archive tokens: colors `archive.bg / panel / line / lineSoft / text / dim / faint`,
  fonts `archive.mono / sans`, sizes `archive.micro / small / body / lead / title /
  display`. Mono leads on this page on purpose. Nothing else may be used.

---

## Decisions

1. **The projection lifts, the page merges.** `projectArchive` adds one field, `run`, to
   the day JSON. It is a plain lift of the two files with the fields the page needs and
   nothing else. All interpretation lives in one pure TypeScript module with tests, so the
   page stays a renderer.

2. **Shape of `run`** (null when the date has no `trace.json`):

   ```ts
   run: {
     startedAt: string | null
     completedAt: string | null
     steps: { name: string; phase: number | null; durationMs: number; endedAt: string }[]
     calls: {
       agent: string; model: string | null; ms: number | null;
       costUsd: number | null; estimated: boolean
     }[] | null            // null when the date has no cost.json
     totalUsd: number | null
     estimated: boolean
     retries: number | null
   }
   ```

   `steps` come from the trace in file order, dropping any with `durationMs` of 0 (the
   `signals-loaded` marker). `calls` come from `cost.byAgent` in file order. `totalUsd`,
   `estimated` and `retries` come from the cost file's top level.

3. **The merge rule** (`app/lib/archive-run.ts`, exported `runStages(run)`). The output is
   one ordered list of rows, each `{ label, kind: 'agent' | 'gate', model, durationMs,
   costUsd, estimated, round }`.
   - When `calls` is null, every trace step is a row. Agent-named steps are `agent` rows
     with no cost; `build-validation`, `surface-gate` and anything else are `gate` rows.
   - When `calls` exists, the calls are the spine, because they are the complete list of
     agent work in order. Each call is an `agent` row with the call's `ms` and cost. Trace
     steps whose name matches a call's agent (the k-th step of that name pairs with the
     k-th call of that agent) contribute nothing further; the call's own `ms` is the
     agent's time. Trace steps with no matching call are `gate` rows, inserted after the
     last agent row that ended before the step's `endedAt`. To place a call in time, use
     the paired trace step's `endedAt`; a call with no pair takes the `endedAt` of the next
     paired call after it in the spine.
   - `round` counts repeats of the same label, 1-based, and is only set when a label
     appears more than once.
   - Labels are the pipeline names made readable: `art-director` to `Art Director`,
     `surface-gate` to `Surface gate`. A table of known names, falling back to
     title-casing the hyphenated name, so old eras' `design-director` still reads.
   - Also export `formatDuration(ms)` (`5m 18s`, `37s`, `<1s`) and `formatUsd(n)`
     (`$0.76`, `$0.04`, two decimals, never scientific).

4. **Where it renders.** Step 06, "It was built", above the existing Attempts, Files
   changed and Pages kept rows. The `Cost` rail row is removed. The rail keeps its other
   rows.

5. **What it looks like** is the implementer's design, within these limits:
   - Rows read top to bottom in run order. Each row shows the label, the model in
     `archive.micro` mono when known, the duration, and the cost when known. Retries are
     repeated rows with the round shown, not a count.
   - Duration gets a proportional mark, so the Art Director's five minutes and a gate's
     twenty seconds are visible without reading the numbers. The mark is width against
     the longest row on the page, drawn with a Panda class reading a CSS custom property
     set on the element, the way the swatches on this page already pass runtime colors.
   - `gate` rows are visually quieter than `agent` rows.
   - A closing row with the run's wall clock (`completedAt` minus `startedAt`) and the
     total cost, with "est." after the total when `estimated` is true.
   - Nothing outside the archive tokens. No color accents; this page is a record, and
     the swatches above it are the only color on it.
   - At 390px wide the rows still read without horizontal scroll; the model tag may
     drop to its own line.

6. **Eras and absence.** Add `run: 'traced'` to `FIELD_ERA`. A `traced` day with no cost
   shows time only and no cost column, no closing cost. A day with `run` null shows the
   `Absent` sentence for field `run` with noun `run record`, so a March day says the
   pipeline had no such concept and a later day with a lost trace says nothing was
   recorded. The closing row's cost half is simply omitted when `totalUsd` is null.

7. **Not now.** Cross-day trends, the calendar, and any change to what the pipeline
   writes.

---

## Tasks

### Task 1: projection

Files: `scripts/generate-archive-json.js`, `tests/scripts/generate-archive-json.test.js`.

- Add `liftRun(date, archiveDir)` next to `uniquenessInputs`. It finds the day's
  `build-<digits>` dir the way `loadRecord`'s neighbours do, reads `trace.json` and
  `cost.json` with the same tolerance for missing or malformed files the rest of the
  script uses, and returns the `run` shape above or null.
- `projectArchive` writes `run` into the day JSON beside `hasScreenshot`, `pages`,
  `uniqueness`. `indexEntry` is untouched; the calendar does not need this.
- Tests: a date with both files produces the shape with the zero-duration step dropped;
  a date with trace only has `calls: null` and `totalUsd: null`; a date with neither has
  `run: null`; a malformed trace is treated as absent and does not throw.

### Task 2: the merge module

Files: `app/lib/archive-run.ts`, `tests/lib/archive-run.test.ts`.

- `runStages`, `formatDuration`, `formatUsd`, and the `Run` and `StageRow` types.
- Tests built from last night's real numbers (copy the relevant fields from
  `archive/2026-09-02/build-1788340172548/trace.json` and `cost.json` into the test as
  fixtures): eleven agent rows and the gate rows in the right places, three
  `Mockup Designer` rows with rounds 1 to 3, two `React Engineer` rows, `Surface gate`
  rows after the first engineer pass and after the revision, `Build` before the first
  gate. A trace-only fixture from the `unified-designer` era. An empty `steps` array.
  The formatters at their boundaries.

### Task 3: the page

Files: `app/routes/how.$date.tsx`, `app/lib/archive-era.ts`.

- `FIELD_ERA.run`. The detail type gains `run`.
- The stage view in Step 06 per decisions 4 to 6, styles as `css()` constants beside the
  existing ones in that file, no new component file unless the view exceeds about eighty
  lines, in which case `app/components/RunStages.tsx`.
- Remove the `Cost` rail row.

### Task 4: verify in the browser

Run the dev server (see `package.json`; the dev server serves `/archive-data` from the
projection, so run `node scripts/generate-archive-json.js` first if the dev path does not
project on its own). Screenshot `/how/2026-09-02` (trace and cost), `/how/2026-06-07`
(trace only), `/how/2026-03-12` (neither) at 1440x900 and 390x844 with Playwright. Save
viewport shots to `docs/evidence/415/` and embed them in the PR in a table. Say in the PR
what each screenshot shows. Check the closing row's numbers against the ticket's table.

### Task 5: gates and PR

`pnpm lint`, `pnpm typecheck`, `pnpm test` and `GITHUB_ACTIONS=true CI=true pnpm test`,
`pnpm test:e2e:site`, `pnpm fallow audit --base origin/main`. One PR, `Closes #415`,
merged through the five-job gate.
