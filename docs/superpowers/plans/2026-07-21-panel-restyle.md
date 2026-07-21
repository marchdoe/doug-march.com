# Owner Panel Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the `/panel` owner panel from unstyled HTML to the approved "clean utility" design — frontend-only, no API/behavior changes.

**Architecture:** One new module `app/components/panel/styles.ts` holds every visual decision as Panda `css()`/`cva()` recipes built from raw values (the panel is theme-proof: the site's tokens are redesigned daily by the pipeline and must never leak in). The five existing panel files swap their ad-hoc styles for these recipes. Verification is screenshots on a Vercel preview deploy, where the panel's serverless API actually runs.

**Tech Stack:** PandaCSS (`css`, `cva` from `styled-system/css`), Base UI 1.6 (`Tabs`, `Slider`), TanStack Router, Vitest, Playwright (screenshot script only).

## Global Constraints

- **Theme-proof rule:** raw CSS values only in panel files — never Panda theme tokens (no `fontSize: 'sm'`, no spacing tokens like `'4'`, no `currentColor` for borders). The site's theme changes daily; the panel's must not.
- **Palette (exact values, no other hues):** page `#fafafa`; surface `#ffffff`; fills `#f4f4f5`; borders `#e4e4e7`; input borders `#d4d4d8`; muted text `#71717a`; secondary text `#3f3f46`; ink `#18181b`; success `#16a34a`; error `#dc2626`; pending `#f59e0b`.
- **Type:** `system-ui, -apple-system, sans-serif`; 16px base; 11px uppercase labels; 12–13px secondary; 14px body; 17px page title.
- **Shape:** 8px radius controls, 12px sheet; shadows `0 1px 3px rgba(0,0,0,.06)` (sheet), `0 1px 2px rgba(0,0,0,.08)` (active tab).
- **Touch targets ≥44px**; every interactive element gets `&:focus-visible { outline: 2px solid #18181b; outline-offset: 2px }`.
- **Base UI active tab attribute is `data-active`** (verified in `@base-ui/react` 1.6 docs) — not `data-selected`.
- **No behavior changes:** component props, state machines, and API calls stay exactly as they are. Aria attributes stay except where the spec mandates otherwise (`role="alert"` on error messages; the RateTab grade-group label change in Task 3).
- **Style hygiene:** color/font values live only in styles.ts — components may inline only layout-value `css()` calls (display/flex/gap/margin/padding/width). Combine recipe classes with `cx()` from `styled-system/css`, never manual string concatenation.
- Test command: `pnpm test` (runs panda codegen then vitest). Typecheck: `pnpm exec tsc --noEmit`. All must pass before every commit.
- `pnpm fallow --summary` appears in user rules but the CLI is not installed anywhere (verified 2026-07-20) — skip it, note in PR.
- Branch: `feat/panel-restyle` (already created, spec committed).

---

### Task 1: Panel style module

**Files:**
- Create: `app/components/panel/styles.ts`

**Interfaces:**
- Consumes: `css`, `cva` from `../../../styled-system/css` (codegen output; run `pnpm codegen` if missing).
- Produces (all later tasks import from `./styles`): `page`, `sheet`, `pageTitle`, `segTabs`, `segTab`, `sectionTitle`, `fieldLabel`, `field`, `textArea`, `button({ kind: 'primary' | 'secondary' })`, `gradeButton`, `badge({ kind: 'graded' | 'none' })`, `statusDot({ tone: 'success' | 'failure' | 'pending' })`, `mutedText`, `secondaryText`, `errorText`, `successText`, `inlineLink`, `runBox`, `checkboxRow`, `checkboxBox`, `sliderRow`, `sliderLabelRow`, `sliderControl`, `sliderTrack`, `sliderIndicator`, `sliderThumb`. All are strings (class names) except `button`, `badge`, `statusDot`, which are cva functions returning strings.

- [ ] **Step 1: Write the module**

```ts
import { css, cva } from '../../../styled-system/css'

// The panel's permanent mini design system. Raw values only — the site's
// theme tokens are redesigned daily by the pipeline and must never leak in.

const focusRing = {
  outline: '2px solid #18181b',
  outlineOffset: '2px',
} as const

export const page = css({
  minHeight: '100vh',
  backgroundColor: '#fafafa',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#18181b',
  padding: '24px 16px',
})

export const sheet = css({
  maxWidth: '640px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: '1px solid #e4e4e7',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,.06)',
})

export const pageTitle = css({
  fontSize: '17px',
  fontWeight: '650',
  marginBottom: '16px',
})

export const sectionTitle = css({
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '12px',
})

export const segTabs = css({
  display: 'flex',
  gap: '4px',
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  padding: '3px',
  marginBottom: '20px',
})

export const segTab = css({
  flex: '1',
  minHeight: '44px',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '6px',
  fontSize: '13px',
  fontFamily: 'inherit',
  color: '#71717a',
  cursor: 'pointer',
  '&[data-active]': {
    backgroundColor: '#ffffff',
    color: '#18181b',
    fontWeight: '600',
    boxShadow: '0 1px 2px rgba(0,0,0,.08)',
  },
  '&:focus-visible': focusRing,
})

export const fieldLabel = css({
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#71717a',
  marginBottom: '5px',
})

export const field = css({ marginBottom: '14px' })

export const textArea = css({
  display: 'block',
  width: '100%',
  border: '1px solid #d4d4d8',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  fontFamily: 'inherit',
  lineHeight: '1.5',
  color: '#18181b',
  backgroundColor: '#ffffff',
  resize: 'vertical',
  '&:focus-visible': focusRing,
})

export const button = cva({
  base: {
    minHeight: '44px',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'inherit',
    border: '1px solid transparent',
    cursor: 'pointer',
    '&:disabled': { opacity: '0.5', cursor: 'default' },
    '&:focus-visible': focusRing,
  },
  variants: {
    kind: {
      primary: { backgroundColor: '#18181b', color: '#ffffff' },
      secondary: {
        backgroundColor: '#ffffff',
        color: '#3f3f46',
        borderColor: '#d4d4d8',
      },
    },
  },
  defaultVariants: { kind: 'primary' },
})

export const gradeButton = css({
  width: '44px',
  height: '44px',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'inherit',
  lineHeight: '1',
  border: '1px solid #d4d4d8',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  color: '#3f3f46',
  cursor: 'pointer',
  '&[aria-pressed="true"]': {
    backgroundColor: '#18181b',
    borderColor: '#18181b',
    color: '#ffffff',
  },
  '&:focus-visible': focusRing,
})

export const badge = cva({
  base: {
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '5px',
    padding: '1px 6px',
    border: '1px solid',
  },
  variants: {
    kind: {
      graded: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        borderColor: '#bbf7d0',
      },
      none: {
        backgroundColor: '#f4f4f5',
        color: '#71717a',
        borderColor: '#e4e4e7',
      },
    },
  },
})

export const statusDot = cva({
  base: {
    width: '8px',
    height: '8px',
    borderRadius: '9999px',
    display: 'inline-block',
    flexShrink: '0',
  },
  variants: {
    tone: {
      success: { backgroundColor: '#16a34a' },
      failure: { backgroundColor: '#dc2626' },
      pending: { backgroundColor: '#f59e0b' },
    },
  },
})

export const mutedText = css({ fontSize: '12px', color: '#71717a' })

export const secondaryText = css({ fontSize: '13px', color: '#3f3f46' })

export const errorText = css({ fontSize: '13px', color: '#dc2626' })

export const successText = css({ fontSize: '13px', color: '#16a34a' })

export const inlineLink = css({
  color: '#18181b',
  fontWeight: '600',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  '&:focus-visible': focusRing,
})

export const runBox = css({
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '14px',
})

export const checkboxRow = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  fontSize: '13px',
  color: '#3f3f46',
  marginBottom: '14px',
  cursor: 'pointer',
})

export const checkboxBox = css({
  width: '16px',
  height: '16px',
  accentColor: '#18181b',
  '&:focus-visible': focusRing,
})

export const sliderRow = css({ marginBottom: '18px' })

export const sliderLabelRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  fontWeight: '600',
  color: '#18181b',
  marginBottom: '2px',
  '& span': { fontVariantNumeric: 'tabular-nums', color: '#3f3f46' },
})

export const sliderControl = css({
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  width: '100%',
  cursor: 'pointer',
})

export const sliderTrack = css({
  height: '4px',
  width: '100%',
  backgroundColor: '#e4e4e7',
  borderRadius: '9999px',
  position: 'relative',
})

export const sliderIndicator = css({
  backgroundColor: '#18181b',
  borderRadius: '9999px',
})

export const sliderThumb = css({
  width: '16px',
  height: '16px',
  borderRadius: '9999px',
  backgroundColor: '#ffffff',
  border: '1px solid #d4d4d8',
  boxShadow: '0 1px 3px rgba(0,0,0,.15)',
  '&:focus-visible': focusRing,
})
```

- [ ] **Step 2: Codegen, typecheck, tests**

Run: `pnpm codegen && pnpm exec tsc --noEmit && pnpm test`
Expected: codegen succeeds; tsc silent; vitest all green (module compiles; nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add app/components/panel/styles.ts
git commit -m "feat(panel): add theme-proof panel style module — clean-utility recipes"
```

---

### Task 2: Panel shell (`panel.tsx`)

**Files:**
- Modify: `app/routes/panel.tsx` (full replacement below)

**Interfaces:**
- Consumes from `../components/panel/styles`: `page`, `sheet`, `pageTitle`, `segTabs`, `segTab`, `errorText`, `mutedText`.
- Produces: unchanged route/component contract; tab children render exactly as before.

- [ ] **Step 1: Replace the file**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import {
  page,
  sheet,
  pageTitle,
  segTabs,
  segTab,
  errorText,
  mutedText,
} from '../components/panel/styles'
import { fetchStatus, type PanelStatus } from '../components/panel/api'
import { RateTab } from '../components/panel/RateTab'
import { ArchiveTab } from '../components/panel/ArchiveTab'
import { WeightsTab } from '../components/panel/WeightsTab'
import { RunTab } from '../components/panel/RunTab'

export const Route = createFileRoute('/panel')({
  component: PanelPage,
})

function PanelPage() {
  const [status, setStatus] = useState<PanelStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    fetchStatus().then(setStatus).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Failed to load')
    })
  }, [])
  useEffect(load, [load])

  if (error) {
    return (
      <main className={page}>
        <div className={sheet}>
          <h1 className={pageTitle}>Owner Panel</h1>
          <p role="alert" className={errorText}>{error}</p>
        </div>
      </main>
    )
  }
  if (!status) {
    return (
      <main className={page}>
        <div className={sheet}>
          <h1 className={pageTitle}>Owner Panel</h1>
          <p className={mutedText}>Loading…</p>
        </div>
      </main>
    )
  }

  return (
    <main className={page}>
      <div className={sheet}>
        <h1 className={pageTitle}>Owner Panel</h1>
        <Tabs.Root defaultValue="rate">
          <Tabs.List className={segTabs}>
            <Tabs.Tab value="rate" className={segTab}>Rate</Tabs.Tab>
            <Tabs.Tab value="archive" className={segTab}>Archive</Tabs.Tab>
            <Tabs.Tab value="weights" className={segTab}>Weights</Tabs.Tab>
            <Tabs.Tab value="run" className={segTab}>Run</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="rate"><RateTab unrated={status.unrated} onRated={load} /></Tabs.Panel>
          <Tabs.Panel value="archive"><ArchiveTab /></Tabs.Panel>
          <Tabs.Panel value="weights"><WeightsTab initial={status.weights} /></Tabs.Panel>
          <Tabs.Panel value="run"><RunTab latestRun={status.latestRun} onTriggered={load} /></Tabs.Panel>
        </Tabs.Root>
      </div>
    </main>
  )
}
```

Note: this deletes the old `panelReset` object — `page` in styles.ts now carries the theme-proof reset (font, size, color, background).

- [ ] **Step 2: Typecheck + tests**

Run: `pnpm exec tsc --noEmit && pnpm test`
Expected: both green.

- [ ] **Step 3: Commit**

```bash
git add app/routes/panel.tsx
git commit -m "feat(panel): sheet layout and segmented tab control on panel shell"
```

---

### Task 3: RateTab

**Files:**
- Modify: `app/components/panel/RateTab.tsx` (full replacement below)

**Interfaces:**
- Consumes from `./styles`: `sectionTitle`, `mutedText`, `fieldLabel`, `field`, `textArea`, `button`, `gradeButton`, `errorText`, `successText`, `inlineLink`, `dateMuted` (added in this task).
- Produces: same props (`unrated: RatingIssue[]`, `onRated: () => void`), same behavior.

- [ ] **Step 0: Add the `dateMuted` export** (append to `app/components/panel/styles.ts`):

```ts
export const dateMuted = css({ fontWeight: '400', color: '#71717a' })
```

- [ ] **Step 1: Replace the file**

```tsx
import { useState } from 'react'
import { css, cx } from '../../../styled-system/css'
import {
  sectionTitle,
  mutedText,
  fieldLabel,
  field,
  textArea,
  button,
  gradeButton,
  errorText,
  successText,
  inlineLink,
  dateMuted,
} from './styles'
import { submitRating, type RatingIssue } from './api'

function prettyDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export function RateTab({ unrated, onRated }: { unrated: RatingIssue[]; onRated: () => void }) {
  const [activeDate, setActiveDate] = useState(unrated[0]?.date ?? '')
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [worked, setWorked] = useState('')
  const [didnt, setDidnt] = useState('')
  const [tryNext, setTryNext] = useState('')
  const [state, setState] = useState<{ kind: 'idle' } | { kind: 'busy' } | { kind: 'done'; url: string } | { kind: 'error'; message: string }>({ kind: 'idle' })

  if (unrated.length === 0 && state.kind !== 'done') {
    return <p className={mutedText}>Nothing waiting for a rating. 🎉</p>
  }

  const submit = async () => {
    if (!grade || !activeDate) return
    setState({ kind: 'busy' })
    try {
      const res = await submitRating({ date: activeDate, grade, worked, didnt, try: tryNext })
      setState({ kind: 'done', url: res.issueUrl })
      onRated()
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed' })
    }
  }

  return (
    <section>
      <h2 className={sectionTitle}>
        {prettyDate(activeDate)}{' '}
        <span className={dateMuted}>· {activeDate}</span>
      </h2>
      <p className={fieldLabel} id="grade-label">Grade</p>
      <div
        role="group"
        aria-labelledby="grade-label"
        className={css({ display: 'flex', gap: '8px', marginBottom: '14px' })}
      >
        {(['A', 'B', 'C', 'D'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrade(g)}
            aria-pressed={grade === g}
            className={gradeButton}
          >
            {g}
          </button>
        ))}
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>What worked</span>
          <textarea className={textArea} value={worked} onChange={(e) => setWorked(e.target.value)} rows={2} />
        </label>
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>What didn't</span>
          <textarea className={textArea} value={didnt} onChange={(e) => setDidnt(e.target.value)} rows={2} />
        </label>
      </div>
      <div className={field}>
        <label>
          <span className={fieldLabel}>Try next</span>
          <textarea className={textArea} value={tryNext} onChange={(e) => setTryNext(e.target.value)} rows={2} />
        </label>
      </div>
      <button
        type="button"
        disabled={!grade || state.kind === 'busy'}
        onClick={submit}
        className={cx(css({ width: '100%' }), button({ kind: 'primary' }))}
      >
        {state.kind === 'busy' ? 'Submitting…' : 'Submit rating'}
      </button>
      {state.kind === 'done' && (
        <p className={cx(successText, css({ marginTop: '10px' }))}>
          Saved — <a className={inlineLink} href={state.url}>view issue</a>. Harvested on the next run.
        </p>
      )}
      {state.kind === 'error' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>{state.message}</p>
      )}
      {unrated.length > 1 && (
        <aside className={css({ marginTop: '20px' })}>
          <h3 className={fieldLabel}>Also unrated</h3>
          <ul className={css({ listStyle: 'none', padding: '0', display: 'flex', gap: '8px', flexWrap: 'wrap' })}>
            {unrated.filter((i) => i.date !== activeDate).map((i) => (
              <li key={i.number}>
                <button type="button" className={button({ kind: 'secondary' })} onClick={() => setActiveDate(i.date)}>
                  {i.date}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  )
}
```

Behavior notes for the implementer:
- `aria-pressed` drives the selected grade style (see `gradeButton` in styles.ts) — no conditional className needed.
- The grade group's label moved from `aria-label="grade"` to a visible `<p id="grade-label">` + `aria-labelledby` — same accessible name, now visible. This is the only aria change in the plan and it is intentional (spec: labeled grade group).
- Layout-only `css()` calls (flex/gap/margins) are allowed inline; anything with color or font must come from styles.ts.
- Combine recipe classes with `cx(...)` from `styled-system/css` — never manual string concatenation.

- [ ] **Step 2: Typecheck + tests**

Run: `pnpm exec tsc --noEmit && pnpm test`
Expected: both green.

- [ ] **Step 3: Commit**

```bash
git add app/components/panel/RateTab.tsx app/components/panel/styles.ts
git commit -m "feat(panel): restyle RateTab — labeled fields, 44px grade buttons, full-width submit"
```

---

### Task 4: ArchiveTab

**Files:**
- Modify: `app/components/panel/ArchiveTab.tsx` (full replacement below)

**Interfaces:**
- Consumes from `./styles`: `badge`, `mutedText`, `errorText`, `archiveLink`, `ratingNotes` (last two added in this task).
- Produces: same zero-prop component, same fetch behavior.

- [ ] **Step 0: Add the `archiveLink` and `ratingNotes` exports** (append to `app/components/panel/styles.ts`):

```ts
export const archiveLink = css({
  fontSize: '13px',
  color: '#18181b',
  fontWeight: '600',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
  '&:focus-visible': focusRing,
})

export const ratingNotes = css({ fontSize: '12px', color: '#3f3f46', marginTop: '2px' })
```

- [ ] **Step 1: Replace the file**

```tsx
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { css, cx } from '../../../styled-system/css'
import { badge, mutedText, errorText, archiveLink, ratingNotes } from './styles'

interface ArchiveEntry {
  date: string
  brief: string
  archetype: string
  rating: { grade: string; worked: string; didnt: string; try: string } | null
}

type State =
  | { kind: 'loading' }
  | { kind: 'loaded'; entries: ArchiveEntry[] }
  | { kind: 'error'; message: string }

export function ArchiveTab() {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    fetch('/archive/_data.json')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load archive (${res.status})`)
        const data = (await res.json()) as ArchiveEntry[]
        setState({ kind: 'loaded', entries: data })
      })
      .catch((err: unknown) => {
        setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed to load archive' })
      })
  }, [])

  if (state.kind === 'loading') return <p className={mutedText}>Loading…</p>
  if (state.kind === 'error') return <p role="alert" className={errorText}>{state.message}</p>

  const entries = state.entries
  if (entries.length === 0) return <p className={mutedText}>No archive entries yet.</p>

  return (
    <ul className={css({ listStyle: 'none', padding: '0', margin: '0' })}>
      {entries.map((e) => (
        <li key={e.date} className={css({ padding: '10px 0', borderBottom: '1px solid #f4f4f5' })}>
          <div className={css({ display: 'flex', gap: '8px', alignItems: 'center' })}>
            <Link
              to="/archive/$date"
              params={{ date: e.date }}
              className={archiveLink}
            >
              {e.date}
            </Link>
            <span className={badge({ kind: e.rating ? 'graded' : 'none' })}>
              {e.rating?.grade ?? '—'}
            </span>
            <span className={mutedText}>{e.archetype}</span>
          </div>
          <p className={cx(mutedText, css({ marginTop: '3px' }))}>{e.brief}</p>
          {e.rating && (e.rating.worked || e.rating.didnt || e.rating.try) && (
            <p className={ratingNotes}>
              {e.rating.worked && <>✓ {e.rating.worked} </>}
              {e.rating.didnt && <>✗ {e.rating.didnt} </>}
              {e.rating.try && <>→ {e.rating.try}</>}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
```

This removes both theme leaks: `borderColor: 'currentColor'` → `#f4f4f5` hairline, and `fontSize: 'sm'` → raw px via `mutedText`/`secondaryText`.

- [ ] **Step 2: Typecheck + tests**

Run: `pnpm exec tsc --noEmit && pnpm test`
Expected: both green.

- [ ] **Step 3: Commit**

```bash
git add app/components/panel/ArchiveTab.tsx app/components/panel/styles.ts
git commit -m "feat(panel): restyle ArchiveTab rows with grade badges; fix theme-leaking styles"
```

---

### Task 5: WeightsTab

**Files:**
- Modify: `app/components/panel/WeightsTab.tsx` (full replacement below)

**Interfaces:**
- Consumes from `./styles`: `sliderRow`, `sliderLabelRow`, `sliderControl`, `sliderTrack`, `sliderIndicator`, `sliderThumb`, `mutedText`, `button`, `errorText`, `successText`.
- Produces: same props (`initial: Weights`), same save behavior.

- [ ] **Step 1: Replace the file**

```tsx
import { useState } from 'react'
import { Slider } from '@base-ui/react/slider'
import { css, cx } from '../../../styled-system/css'
import {
  sliderRow,
  sliderLabelRow,
  sliderControl,
  sliderTrack,
  sliderIndicator,
  sliderThumb,
  mutedText,
  button,
  errorText,
  successText,
} from './styles'
import { saveWeights, type Weights } from './api'

const ROWS: Array<{ key: keyof Weights; label: string; desc: string }> = [
  { key: 'signals', label: 'Signals', desc: 'How much daily signals steer content' },
  { key: 'inspiration', label: 'Inspiration', desc: 'How much references steer style' },
  { key: 'ratings', label: 'Ratings', desc: 'How much past feedback influences decisions' },
  { key: 'risk', label: 'Risk', desc: 'How bold the design gestures get' },
]

export function WeightsTab({ initial }: { initial: Weights }) {
  const [weights, setWeights] = useState<Weights>(initial)
  const [state, setState] = useState<'idle' | 'busy' | 'saved' | string>('idle')

  const save = async () => {
    setState('busy')
    try {
      await saveWeights(weights)
      setState('saved')
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      {ROWS.map(({ key, label, desc }) => (
        <div key={key} className={sliderRow}>
          <Slider.Root
            min={0}
            max={10}
            step={1}
            value={weights[key]}
            onValueChange={(value) => setWeights((w) => ({ ...w, [key]: value }))}
          >
            <div className={sliderLabelRow}>
              <Slider.Label>{label}</Slider.Label>
              <span>{weights[key]}</span>
            </div>
            <Slider.Control className={sliderControl}>
              <Slider.Track className={sliderTrack}>
                <Slider.Indicator className={sliderIndicator} />
                <Slider.Thumb className={sliderThumb} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <p className={mutedText}>{desc}</p>
        </div>
      ))}
      <button type="button" disabled={state === 'busy'} onClick={save} className={button({ kind: 'primary' })}>
        {state === 'busy' ? 'Saving…' : 'Save weights'}
      </button>
      {state === 'saved' && <p className={cx(successText, css({ marginTop: '10px' }))}>Saved — applies to the next run.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'saved' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>{state}</p>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Typecheck + tests**

Run: `pnpm exec tsc --noEmit && pnpm test`
Expected: both green.

- [ ] **Step 3: Commit**

```bash
git add app/components/panel/WeightsTab.tsx
git commit -m "feat(panel): restyle WeightsTab sliders — ink fill, bordered thumb, 44px hit area"
```

---

### Task 6: RunTab

**Files:**
- Modify: `app/components/panel/RunTab.tsx` (full replacement below)

**Interfaces:**
- Consumes from `./styles`: `sectionTitle`, `runBox`, `statusDot`, `mutedText`, `checkboxRow`, `checkboxBox`, `button`, `errorText`, `successText`, `runStatusLine`, `subtleLink` (last two added in this task).
- Consumes from `./api`: `RunInfo` is `{ status: string; conclusion: string | null; url: string; createdAt: string }` (verified against `api.ts:15-20`).
- Produces: same props, same trigger behavior.

- [ ] **Step 0: Add the `runStatusLine` and `subtleLink` exports** (append to `app/components/panel/styles.ts`):

```ts
export const runStatusLine = css({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#18181b',
})

export const subtleLink = css({
  color: '#18181b',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  '&:focus-visible': focusRing,
})
```

- [ ] **Step 1: Replace the file**

```tsx
import { useState } from 'react'
import { css, cx } from '../../../styled-system/css'
import {
  sectionTitle,
  runBox,
  statusDot,
  mutedText,
  runStatusLine,
  subtleLink,
  checkboxRow,
  checkboxBox,
  button,
  errorText,
  successText,
} from './styles'
import { triggerRun, type RunInfo } from './api'

function runTone(run: RunInfo): 'success' | 'failure' | 'pending' {
  if (!run.conclusion) return 'pending'
  return run.conclusion === 'success' ? 'success' : 'failure'
}

export function RunTab({ latestRun, onTriggered }: { latestRun: RunInfo | null; onTriggered: () => void }) {
  const [dryRun, setDryRun] = useState(false)
  const [state, setState] = useState<'idle' | 'busy' | 'dispatched' | string>('idle')

  const trigger = async () => {
    setState('busy')
    try {
      await triggerRun(dryRun)
      setState('dispatched')
      onTriggered()
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      <h2 className={sectionTitle}>Latest run</h2>
      {latestRun ? (
        <div className={runBox}>
          <div className={runStatusLine}>
            <span className={statusDot({ tone: runTone(latestRun) })} />
            {latestRun.status}
            {latestRun.conclusion ? ` — ${latestRun.conclusion}` : ''}
          </div>
          <p className={cx(mutedText, css({ marginTop: '3px' }))}>
            {new Date(latestRun.createdAt).toLocaleString()} ·{' '}
            <a className={subtleLink} href={latestRun.url}>view on GitHub ↗</a>
          </p>
        </div>
      ) : (
        <p className={cx(mutedText, css({ marginBottom: '14px' }))}>No runs found.</p>
      )}
      <label className={checkboxRow}>
        <input type="checkbox" className={checkboxBox} checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} />
        Dry run (build + verify, no commit)
      </label>
      <button type="button" disabled={state === 'busy'} onClick={trigger} className={button({ kind: 'primary' })}>
        {state === 'busy' ? 'Dispatching…' : 'Trigger build'}
      </button>
      {state === 'dispatched' && <p className={cx(successText, css({ marginTop: '10px' }))}>Dispatched — refresh status in a minute.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'dispatched' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>{state}</p>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Typecheck + tests**

Run: `pnpm exec tsc --noEmit && pnpm test`
Expected: both green.

- [ ] **Step 3: Commit**

```bash
git add app/components/panel/RunTab.tsx app/components/panel/styles.ts
git commit -m "feat(panel): restyle RunTab — status dot summary box, styled checkbox"
```

---

### Task 7: Visual verification on preview deploy

The panel's API only exists on Vercel (serverless functions + basic-auth edge middleware), so visual verification happens on a preview deploy, exactly how the original panel was E2E-verified.

**Files:**
- Create: `/private/tmp/claude-501/-Users-dougmarch-Projects-dougmarch/89d2bc0d-bfa0-4477-9341-2b5a3b089e0c/scratchpad/panel-shots.mjs` (scratchpad — not committed)

**Interfaces:**
- Consumes: preview URL from `vercel deploy`; credentials `doug` / contents of `.superpowers/sdd/panel-password.txt`.
- Produces: 8 screenshots (4 tabs × 375px and 1280px widths) for the user to review.

- [ ] **Step 1: Push branch and deploy a preview**

```bash
git push -u origin feat/panel-restyle
vercel deploy --scope marchdoes-projects 2>&1 | tail -5
```

Expected: a `https://doug-march-<hash>-marchdoes-projects.vercel.app` preview URL. (Do NOT pass `--prod`.)

- [ ] **Step 2: Write the screenshot script**

```js
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const base = process.argv[2] // preview URL
const password = readFileSync('.superpowers/sdd/panel-password.txt', 'utf8').trim()
const outDir = process.argv[3] ?? '.'

const browser = await chromium.launch()
const ctx = await browser.newContext({ httpCredentials: { username: 'doug', password } })
const pg = await ctx.newPage()

for (const width of [375, 1280]) {
  await pg.setViewportSize({ width, height: 900 })
  await pg.goto(`${base}/panel`, { waitUntil: 'networkidle' })
  for (const tab of ['Rate', 'Archive', 'Weights', 'Run']) {
    await pg.getByRole('tab', { name: tab }).click()
    await pg.waitForTimeout(400)
    await pg.screenshot({ path: `${outDir}/panel-${tab.toLowerCase()}-${width}.png`, fullPage: true })
  }
}
await browser.close()
```

- [ ] **Step 3: Run it**

```bash
node /private/tmp/claude-501/-Users-dougmarch-Projects-dougmarch/89d2bc0d-bfa0-4477-9341-2b5a3b089e0c/scratchpad/panel-shots.mjs <PREVIEW_URL> /private/tmp/claude-501/-Users-dougmarch-Projects-dougmarch/89d2bc0d-bfa0-4477-9341-2b5a3b089e0c/scratchpad
```

Expected: 8 PNGs. Open each and check against the approved mockups: segmented tabs with white active pill; 44px grade buttons (selected = ink fill); uppercase field labels; bordered textareas; full-width submit on Rate; hairline archive rows with green/gray grade badges; 4px slider tracks with ink fill and bordered thumbs; run summary box with status dot. Confirm nothing inherits the daily theme (fonts stay system-ui, colors stay in the zinc palette).

- [ ] **Step 4: Show the user**

Present the screenshots (at minimum rate + archive at both widths) and wait for approval before merging anything. Fix-and-redeploy loop stays inside this task until the screenshots match the mockups.

---

## Self-Review

- **Spec coverage:** visual system → Task 1; shell/segmented tabs → Task 2; per-tab treatments → Tasks 3–6; theme-leak fixes → Task 4 (ArchiveTab, both leaks); responsive/44px/focus rings → recipes in Task 1, exercised in 2–6; screenshot verification → Task 7. No gaps.
- **Placeholder scan:** every code step contains complete file contents; no TBDs.
- **Type consistency:** all imports match Task 1's export list; `button`/`badge`/`statusDot` used as cva calls everywhere; `RunInfo` fields verified against api.ts.
