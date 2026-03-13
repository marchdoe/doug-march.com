# Content Contract Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a content contract — required sections manifest, direct-import components, and About page extraction — so the daily redesign pipeline can never accidentally drop content or break data flow.

**Architecture:** All content-bearing components import their own data directly from `app/content/` (no props for content). New list-level components (`FeaturedProject`, `SelectedWork`, `Experiments`) own the home page sections. The About page is extracted from a 200-line monolith into four focused components (`Bio`, `Timeline`, `Capabilities`, `Personal`). Route files become thin assemblers. The pipeline prompt is updated with explicit section constraints.

**Tech Stack:** TanStack Router, PandaCSS (`styled()` from `styled-system/jsx`), TypeScript, pnpm. Build: `panda codegen && vite build`. Worktree: `.worktrees/daily-redesign-phase1`.

---

## File Map

### New files
| File | Responsibility |
|---|---|
| `app/content/about.ts` | Identity statement + personal facts (golf, teams, focus) |
| `app/components/FeaturedProject.tsx` | Imports `featuredProject`, renders hero card |
| `app/components/SelectedWork.tsx` | Imports `selectedWork`, renders project list |
| `app/components/Experiments.tsx` | Imports `experiments`, renders experiments list |
| `app/components/Bio.tsx` | Imports `identity` from `about.ts`, renders bio |
| `app/components/Timeline.tsx` | Imports `timeline` from `timeline.ts`, renders career history |
| `app/components/Capabilities.tsx` | Imports `capabilities` from `timeline.ts`, renders skills grid |
| `app/components/Personal.tsx` | Imports `personal` from `about.ts`, renders personal facts |

### Modified files
| File | Change |
|---|---|
| `app/routes/index.tsx` | Remove content imports + inline maps; assemble new components |
| `app/routes/about.tsx` | Remove all inline styled components; assemble new components |
| `app/components/MissionCard.tsx` | Delete — replaced by `FeaturedProject.tsx` |
| `app/components/ProjectRow.tsx` | Keep as dumb item component (still takes `project` prop from parent list) |
| `scripts/utils/site-context.js` | Add 8 new components to `MUTABLE_FILES`; remove `MissionCard` |
| `scripts/utils/prompt-builder.js` | Add content contract section to system prompt |
| `themes/canonical/` | Re-snapshot all mutable files after refactor |

### Unchanged files
- `app/content/projects.ts` — off-limits, never touch
- `app/content/timeline.ts` — stays as-is; `Timeline` and `Capabilities` import from here
- `app/content/types.ts` — no changes needed
- `app/components/ProjectRow.tsx` — kept as dumb presentational item
- `app/components/SectionHead.tsx` — no changes needed
- `app/components/Layout.tsx`, `Sidebar.tsx`, `MobileFooter.tsx` — no changes needed

---

## Chunk 1: Content foundation

### Task 1: Create `app/content/about.ts`

**Files:**
- Create: `app/content/about.ts`

This file is the source of truth for all About page content that isn't already in `timeline.ts`. Write the identity statement yourself — this is your copy, locked forever.

- [ ] **Step 1: Create the file**

```typescript
// app/content/about.ts

export type Identity = {
  name: string
  role: string
  statement: string
}

export type Personal = {
  holesInOne: number
  sport: string
  teams: string[]
  currentFocus: string
}

export const identity: Identity = {
  name: 'Doug March',
  role: 'Designer & Developer',
  statement:
    "I work at the intersection of design and engineering — not as a generalist, but as someone who has gone deep in both. I've spent my career closing the gap between what gets designed and what gets built: making sure designs are technically feasible before a line of code is written, and that what ships actually looks like what was designed.",
}

export const personal: Personal = {
  holesInOne: 4,
  sport: 'golf',
  teams: ['Lions', 'Tigers', 'Pistons', 'Red Wings'],
  currentFocus: 'Using AI as a force multiplier in product work',
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/dougmarch/Projects/dougmarch/.worktrees/daily-redesign-phase1
pnpm build
```

Expected: build succeeds (new file is unused so far — no errors)

- [ ] **Step 3: Commit**

```bash
git add app/content/about.ts
git commit -m "feat: add about.ts content file (identity + personal)"
```

---

## Chunk 2: Home page components

Goal: replace the inline content rendering in `index.tsx` with three focused components, each owning their own data import.

### Task 2: Create `FeaturedProject.tsx`

**Files:**
- Create: `app/components/FeaturedProject.tsx`
- This replaces `MissionCard.tsx` usage (don't delete `MissionCard.tsx` yet — delete it in Task 5)

The component imports `featuredProject` directly and renders the hero card. Copy the styled components from the current `MissionCard.tsx` — the visual design is unchanged, only the data source moves.

- [ ] **Step 1: Create the component**

```typescript
// app/components/FeaturedProject.tsx
import { featuredProject } from '../content/projects'
import { styled } from '../../styled-system/jsx'

const Card = styled('div', {
  base: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    background: 'bg.card',
    paddingTop: '6',
    paddingBottom: '6',
    paddingLeft: '8',
    paddingRight: '8',
    marginBottom: '12',
    position: 'relative',
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.04), inset 0 0 20px rgba(0, 229, 255, 0.01)',
    _before: {
      content: '"ACTIVE MISSION"',
      position: 'absolute',
      top: '-0.55rem',
      left: '6',
      background: 'bg',
      paddingLeft: '2',
      paddingRight: '2',
      fontSize: 'xs',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      color: 'accent',
    },
    _after: {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      width: '2px',
      background: 'linear-gradient(to bottom, transparent, var(--colors-accent), transparent)',
      opacity: '0.3',
    },
  },
})

const CardName = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'bold',
    letterSpacing: 'tight',
    color: 'accent',
    textShadow: '0 0 24px rgba(0, 229, 255, 0.25)',
    marginBottom: '0.4rem',
    lineHeight: 'tight',
  },
})

const CardDesc = styled('div', {
  base: {
    fontSize: '0.65rem',
    color: 'text.dim',
    lineHeight: 'normal',
    fontStyle: 'italic',
    marginBottom: '5',
  },
})

const CardLink = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontSize: '0.62rem',
    fontWeight: 'bold',
    color: 'logo.green',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.green',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.85rem',
    paddingRight: '0.85rem',
    transitionProperty: 'background, gap',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: {
      background: 'logo.greenDim',
      gap: '0.75rem',
    },
  },
})

export function FeaturedProject() {
  if (!featuredProject) return null

  return (
    <Card>
      <CardName>{featuredProject.title.toUpperCase()}</CardName>
      {featuredProject.problem && <CardDesc>{featuredProject.problem}</CardDesc>}
      {featuredProject.externalUrl && (
        <CardLink
          href={featuredProject.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          → VISIT {featuredProject.externalUrl.replace(/^https?:\/\//, '').toUpperCase()}
        </CardLink>
      )}
    </Card>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

Expected: success

- [ ] **Step 3: Commit**

```bash
git add app/components/FeaturedProject.tsx
git commit -m "feat: add FeaturedProject component with direct content import"
```

---

### Task 3: Create `SelectedWork.tsx` and `Experiments.tsx`

**Files:**
- Create: `app/components/SelectedWork.tsx`
- Create: `app/components/Experiments.tsx`

Both import their data slice directly. Both use `ProjectRow` internally as a dumb item renderer — `ProjectRow` still takes a `project` prop, that's fine. The contract is at the list level.

- [ ] **Step 1: Create `SelectedWork.tsx`**

```typescript
// app/components/SelectedWork.tsx
import { selectedWork } from '../content/projects'
import { ProjectRow } from './ProjectRow'

export function SelectedWork() {
  return (
    <>
      {selectedWork.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </>
  )
}
```

- [ ] **Step 2: Create `Experiments.tsx`**

```typescript
// app/components/Experiments.tsx
import { experiments } from '../content/projects'
import { ProjectRow } from './ProjectRow'

export function Experiments() {
  return (
    <>
      {experiments.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
pnpm build
```

Expected: success

- [ ] **Step 4: Commit**

```bash
git add app/components/SelectedWork.tsx app/components/Experiments.tsx
git commit -m "feat: add SelectedWork and Experiments components with direct imports"
```

---

### Task 4: Refactor `index.tsx` to use new components

**Files:**
- Modify: `app/routes/index.tsx`

Remove the content imports, remove the `.map()` calls, replace with the new components. Keep `Footer` and `Gap` styled components here — they're layout, not content.

- [ ] **Step 1: Rewrite `index.tsx`**

```typescript
// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { FeaturedProject } from '../components/FeaturedProject'
import { SelectedWork } from '../components/SelectedWork'
import { Experiments } from '../components/Experiments'
import { SectionHead } from '../components/SectionHead'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({
  component: Home,
})

const Gap = styled('div', {
  base: { marginTop: '10' },
})

const Footer = styled('div', {
  base: {
    marginTop: '12',
    paddingTop: '5',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const FooterText = styled('span', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'logo.green',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.green',
    paddingTop: '0.35rem',
    paddingBottom: '0.35rem',
    paddingLeft: '3',
    paddingRight: '3',
    transitionProperty: 'background',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { background: 'logo.greenDim' },
  },
})

function Home() {
  return (
    <Layout>
      <FeaturedProject />

      <SectionHead label="SELECTED WORK" />
      <SelectedWork />

      <Gap />

      <SectionHead label="EXPERIMENTS &amp; SIDE PROJECTS" />
      <Experiments />

      <Footer>
        <FooterText>© {new Date().getFullYear()} DOUG MARCH</FooterText>
        <FooterLink href="mailto:doug@doug-march.com">GET IN TOUCH →</FooterLink>
      </Footer>
    </Layout>
  )
}
```

- [ ] **Step 2: Delete `MissionCard.tsx`** — it is now fully replaced by `FeaturedProject.tsx`

```bash
rm app/components/MissionCard.tsx
```

- [ ] **Step 3: Verify build passes**

```bash
pnpm build
```

Expected: success. Visually identical to before.

- [ ] **Step 4: Commit**

```bash
git add app/routes/index.tsx
git rm app/components/MissionCard.tsx
git commit -m "refactor: index.tsx uses direct-import section components, remove MissionCard"
```

---

## Chunk 3: About page components

Goal: extract `about.tsx` from a 200-line monolith into four focused components plus a thin assembler.

### Task 5: Create `Bio.tsx`

**Files:**
- Create: `app/components/Bio.tsx`

Renders the identity statement from `about.ts`. Copy the intro section styles from the current `about.tsx`.

- [ ] **Step 1: Create the component**

```typescript
// app/components/Bio.tsx
import { identity } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '10',
  },
})

const Label = styled('div', {
  base: {
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '3',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: { content: '"//"', color: 'accent' },
  },
})

const Statement = styled('p', {
  base: {
    fontSize: '0.75rem',
    color: 'text.mid',
    lineHeight: '2',
    fontStyle: 'italic',
    maxWidth: '560px',
    '& strong': { color: 'text', fontStyle: 'normal' },
  },
})

export function Bio() {
  return (
    <Wrap>
      <Label>ABOUT</Label>
      <Statement>{identity.statement}</Statement>
    </Wrap>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Bio.tsx
git commit -m "feat: add Bio component"
```

---

### Task 6: Create `Timeline.tsx`

**Files:**
- Create: `app/components/Timeline.tsx`

Renders career history from `timeline.ts`. Extract the `TlItem` block of styled components from `about.tsx`.

- [ ] **Step 1: Create the component**

```typescript
// app/components/Timeline.tsx
import { timeline } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Item = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '80px 1px 1fr',
    gap: '0 6',
  },
})

const Year = styled('div', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    paddingTop: '4',
    paddingBottom: '4',
    textAlign: 'right',
  },
})

const LineWrap = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Dot = styled('div', {
  base: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'logo.blueDim',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blue',
    marginTop: '1.1rem',
    flexShrink: '0',
  },
  variants: {
    current: {
      true: {
        background: 'logo.green',
        borderColor: 'logo.green',
        boxShadow: '0 0 8px var(--colors-logo-green)',
      },
    },
  },
})

const Rule = styled('div', {
  base: {
    flex: '1',
    width: '1px',
    background: 'logo.blueDim',
  },
})

const Content = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const Role = styled('div', {
  base: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    marginBottom: '0.2rem',
  },
})

const Company = styled('div', {
  base: {
    fontSize: 'sm',
    color: 'accent.dim',
    marginBottom: '0.4rem',
  },
  variants: {
    current: {
      true: { color: 'logo.green' },
    },
  },
})

const Description = styled('div', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    lineHeight: '1.7',
    fontStyle: 'italic',
  },
})

export function Timeline() {
  return (
    <div>
      {timeline.map((entry) => (
        <Item key={entry.year}>
          <Year>{entry.year}</Year>
          <LineWrap>
            <Dot current={entry.current ? true : undefined} />
            <Rule />
          </LineWrap>
          <Content>
            <Role>{entry.role}</Role>
            <Company current={entry.current ? true : undefined}>{entry.company}</Company>
            <Description>{entry.description}</Description>
          </Content>
        </Item>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Timeline.tsx
git commit -m "feat: add Timeline component"
```

---

### Task 7: Create `Capabilities.tsx`

**Files:**
- Create: `app/components/Capabilities.tsx`

Renders the capabilities list from `timeline.ts`.

- [ ] **Step 1: Create the component**

```typescript
// app/components/Capabilities.tsx
import { capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Grid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2',
    marginTop: '10',
  },
})

const Item = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    textTransform: 'uppercase',
  },
})

export function Capabilities() {
  return (
    <Grid>
      {capabilities.map((skill) => (
        <Item key={skill}>{skill}</Item>
      ))}
    </Grid>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Capabilities.tsx
git commit -m "feat: add Capabilities component"
```

---

### Task 8: Create `Personal.tsx`

**Files:**
- Create: `app/components/Personal.tsx`

New section — renders the personal facts from `about.ts`. Design it simply for now; the daily redesign will dress it up.

- [ ] **Step 1: Create the component**

```typescript
// app/components/Personal.tsx
import { personal } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    marginTop: '10',
    paddingTop: '8',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
  },
})

const Facts = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    marginTop: '4',
  },
})

const Fact = styled('div', {
  base: {
    fontSize: '0.65rem',
    color: 'text.dim',
    lineHeight: '1.6',
  },
})

const Label = styled('span', {
  base: {
    color: 'text.mid',
    fontWeight: 'bold',
    marginRight: '2',
  },
})

export function Personal() {
  return (
    <Wrap>
      <Facts>
        <Fact>
          <Label>Sport:</Label>
          {personal.sport} — {personal.holesInOne} holes in one
        </Fact>
        <Fact>
          <Label>Teams:</Label>
          {personal.teams.join(', ')}
        </Fact>
        <Fact>
          <Label>Currently:</Label>
          {personal.currentFocus}
        </Fact>
      </Facts>
    </Wrap>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Personal.tsx
git commit -m "feat: add Personal component"
```

---

### Task 9: Refactor `about.tsx` into thin assembler

**Files:**
- Modify: `app/routes/about.tsx`

Replace all inline styled components with the four new components. The route becomes a thin shell.

- [ ] **Step 1: Rewrite `about.tsx`**

```typescript
// app/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { Bio } from '../components/Bio'
import { Timeline } from '../components/Timeline'
import { Capabilities } from '../components/Capabilities'
import { Personal } from '../components/Personal'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <Bio />
      <SectionHead label="BACKGROUND" />
      <Timeline />
      <SectionHead label="CAPABILITIES" />
      <Capabilities />
      <Personal />
    </Layout>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

Expected: success. Visit `/about` in dev server to confirm visual parity (plus the new Personal section).

- [ ] **Step 3: Commit**

```bash
git add app/routes/about.tsx
git commit -m "refactor: about.tsx becomes thin assembler using extracted components"
```

---

## Chunk 4: Pipeline updates

### Task 10: Update `MUTABLE_FILES` in site-context.js

**Files:**
- Modify: `scripts/utils/site-context.js`

Add the 8 new components. Remove `MissionCard.tsx`.

- [ ] **Step 1: Update the list**

Find `MUTABLE_FILES` in `scripts/utils/site-context.js` and replace with:

```javascript
export const MUTABLE_FILES = [
  'elements/preset.ts',
  'app/components/Layout.tsx',
  'app/components/Sidebar.tsx',
  'app/components/SectionHead.tsx',
  'app/components/MobileFooter.tsx',
  'app/components/ProjectRow.tsx',
  'app/components/FeaturedProject.tsx',
  'app/components/SelectedWork.tsx',
  'app/components/Experiments.tsx',
  'app/components/Bio.tsx',
  'app/components/Timeline.tsx',
  'app/components/Capabilities.tsx',
  'app/components/Personal.tsx',
  'app/routes/__root.tsx',
  'app/routes/index.tsx',
  'app/routes/about.tsx',
  'app/routes/work.$slug.tsx',
]
```

- [ ] **Step 2: Update `CONTENT_FILES_FOR_SUMMARY` and fix stale comment**

In `scripts/utils/site-context.js`, make two changes:

Add `app/content/about.ts` to the content summary array so Claude's daily redesign knows the About page structure exists:

```javascript
const CONTENT_FILES_FOR_SUMMARY = [
  'app/content/projects.ts',
  'app/content/timeline.ts',
  'app/content/about.ts',
]
```

Also update the stale comment in `buildContentSummary()` — after the refactor, `timeline.ts` is imported by `Timeline.tsx` and `Capabilities.tsx`, not by `about.tsx` directly:

```javascript
lines.push('These are imported by app/components/Timeline.tsx and app/components/Capabilities.tsx — preserve those import statements.')
```

- [ ] **Step 3: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add scripts/utils/site-context.js
git commit -m "feat: update MUTABLE_FILES for content contract components"
```

---

### Task 11: Update system prompt with content contract

**Files:**
- Modify: `scripts/utils/prompt-builder.js`

Add a `## Content Contract` section to `SYSTEM_PROMPT`.

- [ ] **Step 1: Update the system prompt**

In `prompt-builder.js`, append to the `SYSTEM_PROMPT` constant:

```javascript
const SYSTEM_PROMPT = `You are the daily designer for doug-march.com — a personal portfolio site for Doug March, a product designer and developer.

Every day, you redesign this site from scratch. Your brief comes from signals: what happened in the world yesterday. Weather, sports, news, what's trending on GitHub. These signals are not just data — they are your creative palette. Let them genuinely inform your design decisions.

This is inspired by CSS Zen Garden, but you have more power: you can change components, layout, typography, color, animation, density, anything in the presentation layer. The content (projects, bio) is fixed. How that content is presented is entirely yours.

Be bold. A safe redesign is a failed redesign. The person who owns this site wants to be surprised by their own website every morning.

## Content Contract

Every redesign must include all required sections. Do not remove or rename component exports.

**Home page required sections:**
- FeaturedProject — must render: project title, problem statement, external link
- SelectedWork — must render each project: title, type, year, and a link to /work/$slug
- Experiments — must render each project: title, type, year, and a link or external URL

**About page required sections:**
- Bio — must render the identity statement
- Timeline — must render each entry: year, role, company, description
- Capabilities — must render all capability strings
- Personal — must render: holes in one count, sport, teams, current focus

**All pages:**
- Sidebar — must render: name, role, and all nav links

**Rules:**
1. Each component imports its own data directly from app/content/. Do not change these import paths.
2. Every data key listed above must appear somewhere in the rendered output. You may present them in any visual form — large type, small label, tooltip, hover state — but they must be present.
3. Component prop interfaces for ProjectRow (project, index) must remain compatible. You may add optional props but never remove required ones.
4. You may completely reimagine the layout, typography, color, spacing, and interaction of any component. The contract is about what is shown, not how.`
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add scripts/utils/prompt-builder.js
git commit -m "feat: add content contract to daily redesign system prompt"
```

---

### Task 12: Update canonical snapshot

**Files:**
- Modify: `themes/canonical/` — re-snapshot all mutable files

The canonical snapshot was created before this refactor. It needs to reflect the new component architecture so `restore-canonical.js` restores a working v2 state.

- [ ] **Step 1: Re-run the snapshot**

```bash
mkdir -p themes/canonical/components themes/canonical/routes

cp elements/preset.ts themes/canonical/preset.ts
cp app/components/Layout.tsx themes/canonical/components/
cp app/components/Sidebar.tsx themes/canonical/components/
cp app/components/SectionHead.tsx themes/canonical/components/
cp app/components/MobileFooter.tsx themes/canonical/components/
cp app/components/ProjectRow.tsx themes/canonical/components/
cp app/components/FeaturedProject.tsx themes/canonical/components/
cp app/components/SelectedWork.tsx themes/canonical/components/
cp app/components/Experiments.tsx themes/canonical/components/
cp app/components/Bio.tsx themes/canonical/components/
cp app/components/Timeline.tsx themes/canonical/components/
cp app/components/Capabilities.tsx themes/canonical/components/
cp app/components/Personal.tsx themes/canonical/components/
cp app/routes/__root.tsx themes/canonical/routes/
cp app/routes/index.tsx themes/canonical/routes/
cp app/routes/about.tsx themes/canonical/routes/
cp "app/routes/work.\$slug.tsx" themes/canonical/routes/
```

- [ ] **Step 2: Update `restore-canonical.js`**

Update `scripts/restore-canonical.js` to match the new file list (remove `MissionCard`, add 8 new components):

```javascript
const FILES = [
  ['themes/canonical/preset.ts',                        'elements/preset.ts'],
  ['themes/canonical/components/Layout.tsx',            'app/components/Layout.tsx'],
  ['themes/canonical/components/Sidebar.tsx',           'app/components/Sidebar.tsx'],
  ['themes/canonical/components/SectionHead.tsx',       'app/components/SectionHead.tsx'],
  ['themes/canonical/components/MobileFooter.tsx',      'app/components/MobileFooter.tsx'],
  ['themes/canonical/components/ProjectRow.tsx',        'app/components/ProjectRow.tsx'],
  ['themes/canonical/components/FeaturedProject.tsx',   'app/components/FeaturedProject.tsx'],
  ['themes/canonical/components/SelectedWork.tsx',      'app/components/SelectedWork.tsx'],
  ['themes/canonical/components/Experiments.tsx',       'app/components/Experiments.tsx'],
  ['themes/canonical/components/Bio.tsx',               'app/components/Bio.tsx'],
  ['themes/canonical/components/Timeline.tsx',          'app/components/Timeline.tsx'],
  ['themes/canonical/components/Capabilities.tsx',      'app/components/Capabilities.tsx'],
  ['themes/canonical/components/Personal.tsx',          'app/components/Personal.tsx'],
  ['themes/canonical/routes/__root.tsx',                'app/routes/__root.tsx'],
  ['themes/canonical/routes/index.tsx',                 'app/routes/index.tsx'],
  ['themes/canonical/routes/about.tsx',                 'app/routes/about.tsx'],
  ['themes/canonical/routes/work.$slug.tsx',            'app/routes/work.$slug.tsx'],
]
```

- [ ] **Step 3: Verify restore works**

```bash
node scripts/restore-canonical.js
pnpm build
```

Expected: build passes

- [ ] **Step 4: Commit**

```bash
git add themes/canonical/ scripts/restore-canonical.js
git commit -m "chore: update canonical snapshot and restore script for content contract"
```

---

### Task 13: Push branch

- [ ] **Step 1: Push**

```bash
git push
```

Expected: `feature/daily-redesign-phase1` updated on remote. PR #3 will show all new commits.
