# Domain moves to dougmar.ch — implementation

**Goal:** Serve the site from `dougmar.ch` without falsifying 109 archived days that
record `doug-march.com` as the host they actually shipped under.

**Source:** [#163](https://github.com/marchdoe/doug-march.com/issues/163). That ticket
found the host locations and named the traps. This document adds the measurements, settles
the rule that decides which occurrences move, and sequences the work. It also folds in the
`2026-04-14` nested copy, left undecided by the archive-wayback plan.

**Tech stack:** existing. No new dependencies. DNS and the Vercel domain are Doug's.

---

## The rule that decides every occurrence

#163 frames this as "the archive keeps both hosts." That is right but too coarse to apply
to a specific line. The sharper version, which every task below follows:

**A host that records what shipped stays. A host that points at where a page lives now
moves.**

So the visible link text `https://doug-march.com` inside a 2026-06-10 snapshot stays, for
good. It is part of what that design said. But the `og:url` the seal injects into that same
page, which claims "this page lives at `<host>/archive/2026-06-10/`", moves to the new host,
because after the cutover that is where it lives. Sealing old pages against the new host is
not a rewrite of the record. It corrects a pointer that would otherwise be wrong.

This distinction is the whole design. Get it wrong in either direction and you either break
209 archived pages or you publish a record that lies.

---

## Load-bearing facts

Measured 2026-08-26 against `6d0771c`, not carried over from #163.

- **471 files across 109 dates** under `public/archive/` contain `doug-march.com`. Another
  **630 files** under `archive/`. None of these get a find-and-replace.
- **`scripts/utils/archive-seal.js:45`** holds `LIVE_ORIGIN` as a single string, read in
  three places: line 63 and 64 strip it as a prefix, line 121 writes the `og:url`. Lines 63
  and 64 must match either host forever, because snapshots taken after the cutover will
  carry `dougmar.ch` and still need sealing. Line 121 must emit only the new host.
- **`scripts/utils/site-origin.js` is now the single point of change.** Phase 0 extracted
  it. `og-meta.js` takes its `siteUrl` default from `CANONICAL_ORIGIN`, `archive-seal.js`
  reads both names, and `build-validator.js` builds its allowlist from `RECOGNISED_HOSTS`.
  No host literal remains anywhere else under `scripts/utils/`. Phase 1's Task 1.1 is
  editing one line in that file.
  *(This supersedes the original claim that `og-meta.js:11` was the single point of change.
  It was not: `archive-seal.js` held a second copy, and the two would have drifted.)*
- **`scripts/seal-archive.js:30`** already excludes `2026-04-14/archive`, the 182-page copy
  that day captured of the archive index. Those pages are reachable in production, carry no
  frame, and still link to the live host. The domain move makes them worse: their links will
  point at a host that no longer serves the site.
- **Five test files, not seven.** The original count came from `grep -l` and swept in two
  files that carry the string for unrelated reasons: `tests/api/github.test.ts` matches the
  GitHub *repository* name (`api.github.com/repos/marchdoe/doug-march.com/...`), and
  `tests/utils/archive-record.test.js` has it inside a brief fixture's prose. Neither moves
  with the web host. The five that mattered were `archive-seal.test.js` (ten assertions),
  `archive-seal-corpus.test.js`, `og-meta.test.js`, `build-validator-scanner.test.js`, and
  `e2e/site-health.spec.ts`. All five now import the origins and loop over them, so both
  hosts stay covered. **Done in Phase 0.**
- **`app/content/projects.ts:81`** is the title `doug-march.com` and `:95` the `liveUrl`.
  The title drives the work slug, so changing it mints `dougmar-ch.html` alongside the
  existing `doug-march-dot-com.html` in every future snapshot.
- **`scripts/prompts/react-engineer.md:139`** allowlists external domains the engineer may
  emit. It lists `doug-march.com`. Miss this and the build validator rejects any new design
  that links to the new host.
- **Agent-authored, no action needed:** `app/components/BomFooter.tsx`,
  `app/components/SignalMargin.tsx`, `app/dev-panel.tsx`. The next build regenerates them
  under the content contract.
- **Historical docs are records too.** About 20 files under `docs/` carry the old host in
  plans and specs describing work already shipped. Leave them. They are dated documents,
  and rewriting them makes them describe a past that did not happen.

---

## Prerequisite, now met: #173

The panel CSRF guard and CSP had to land before the cutover, and did (merged 2026-08-27).
The reason is counter-intuitive enough to record: the move makes that exposure **larger**,
not smaller.

`doug-march.com` currently returns the same 489-byte dead Create React App shell on every
path, API routes included, so the owner panel is not reachable through the apex at all.
Pointing a domain at the healthy deployment is exactly what makes `/api/panel/run` — which
dispatches a workflow that costs money and writes to main — reachable at a public domain
for the first time. The broken alias was doing an impression of a security control.

Measured 2026-08-27:

    doug-march.com/api/panel/status                HTTP 200  len=489   (dead shell)
    ...vercel.app/api/panel/status                 HTTP 401  len=12    (live endpoint)

**`vercel.json`'s security headers need no host change.** That closes half the "unexamined"
item inherited from #163. Both CSP policies use `'self'` plus explicitly-named font origins,
and the strict archive policy is scoped by path (`/archive/(.*)`), not host. The CSRF guard
compares the `Origin` header against the `Host` header, so it is relative by construction.
Nothing in that PR references the web host.

## Decisions needed before Phase 1

Four, all Doug's. Phase 0 is blocked on the first three. Phase 3 is blocked on the fourth.

**1. Does the work slug follow the title?** `projects.ts:81`. Changing the title to
`dougmar.ch` gives every future snapshot a `dougmar-ch.html`, and the seal's path mapping
then carries both spellings permanently. Keeping the slug frozen while changing only the
display title avoids that. I recommend freezing the slug. The cost of the alternative is a
two-spelling special case that never goes away, paid for a cosmetic filename nobody sees.

**2. Does `hello@doug-march.com` move?** `app/components/Footer.tsx:57`. Independent of the
web host. Mail can stay put indefinitely at no cost to the archive.

**3. Is `doug-march.com` kept alive, and for how long?** A permanent 301 is the safe answer.
The archive contains 115 absolute links the seal rewrites to `index.html`, so sealed pages
survive the old host going dark. Unsealed ones do not, which is decision 4.

**4. What happens to the 182 pages under `public/archive/2026-04-14/archive/`?** Three
options: seal them with per-page dates, stop serving them, or delete them. They are the only
archived pages that would break if the old host stops resolving.

---

## Phase 0 — Make the seal host-agnostic — SHIPPED (2026-08-27)

Ships before any DNS change. Safe to merge on its own: with only the old host canonical,
behaviour is identical. Verified by re-sealing all 1,032 committed pages and confirming an
empty diff, twice — once after the constant split and once after the shared-module refactor.

**A latent bug surfaced while writing Task 0.2's tests.** Origin matching used a bare
`startsWith`, so any host that merely *begins* with ours was treated as ours and collapsed
into the snapshot: `resolveHref('https://doug-march.com.evil.example/about')` returned
`index.html`. The bug predates this work — `LIVE_ORIGIN.startsWith` had it too — but the
move would have made it bite, because the new domain is short:
`'https://dougmar.church'.startsWith('https://dougmar.ch')` is true. `matchOrigin` now
requires a path, query, or fragment boundary. Covered in `tests/utils/site-origin.test.js`.

### Task 0.1: `LIVE_ORIGIN` becomes two origins

`scripts/utils/archive-seal.js`. Replace the single constant with a recognised list and a
separate canonical origin. Reading uses the list. Writing uses the canonical.

Lines 63 and 64 iterate the list to find a matching prefix. Line 121 uses the canonical
origin alone. Order the list longest-first so no origin can shadow another as a prefix.

### Task 0.2: Tests stop hardcoding the host

The seven test files import the origins rather than spelling them. Add a case per test file
that exercises the *other* host, so both stay covered after the cutover. This is the task
that keeps Phase 1 honest, so do it before Phase 1, not after.

### Task 0.3: Engineer allowlist accepts both

`scripts/prompts/react-engineer.md:139`. Add the new host beside the old. Both stay listed
permanently, since archived designs reference the old one.

### Verification

`pnpm test` green. Re-run `node scripts/seal-archive.js` over the full corpus and confirm
`git diff` is empty. Phase 0 changes how the seal matches, not what it produces.

---

## Phase 1 — Cutover

Merges the day Doug points DNS.

### Task 1.1: New canonical host

`scripts/utils/og-meta.js:11`. One line. Everything downstream follows.

### Task 1.2: The remaining source references

`scripts/utils/build-validator.js:258`, `scripts/signals/dribbble.js:37` (User-Agent, cosmetic
but it identifies the crawler), `app/content/projects.ts:95` (`liveUrl`), `:81` (title, per
decision 1), `scripts/prompts/art-director.md:1`, `scripts/prompts/mockup-designer.md:3`,
`scripts/design-agents.js:579`, `api/_lib/github.ts`, and the host in
`.github/workflows/daily-redesign.yml`.

### Task 1.3: Re-seal the corpus against the new canonical

Run `node scripts/seal-archive.js`. Every archived page's `og:url` moves to the new host.
Visible link text and design content do not change. Expect the diff to touch one line per
sealed page and nothing else. If it touches anything else, Phase 0 is wrong. Stop and fix
Phase 0 rather than committing the diff.

### Task 1.4: Vercel and DNS

Doug. Add `dougmar.ch` in Vercel, keep `doug-march.com` attached as a 301 source per
decision 3.

### Verification

Load the live site on the new host. Open three archived days from different months and
confirm the design renders, internal links stay inside the snapshot, and no request leaves
for the old host. Confirm `og:image` resolves. Confirm the old host 301s to the new one.

---

## Phase 2 — The nightly proves it

The first green run after cutover. No code.

Confirm the commit carries `public/og/<date>.png`, the new snapshot seals clean, and the
rating issue links the new host.

---

## Phase 3 — The 2026-04-14 nested copy

Decision 4. Independent of the rest and can ship any time, but it should not outlive the
old host, because those 182 pages link to it unsealed.

If sealing: they need per-page dates, since they are a copy of the archive index rather than
one day's design, and the seal keys its `og:url` on a single date. That is the reason they
were excluded in the first place. Budget for it rather than treating it as a one-line
inclusion.

If removing: delete the directory and drop `NESTED_COPY` from `scripts/seal-archive.js:30`.
The seal test's exclusion case goes with it.

---

## Sequencing

Phase 0 ships now and is safe with no DNS change. Phase 1 waits on decisions 1 through 3 and
on Doug being ready to move DNS. Phase 2 is a nightly run. Phase 3 is independent, but land
it before the old host stops resolving.

The one ordering that matters: Task 0.2 before Phase 1. Cut the host out of the tests while
the old host is still the live one, and the tests can still tell you when Phase 1 breaks
something. Do it after and you are changing the tests and the thing they test in the same
commit.
