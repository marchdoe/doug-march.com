# doug-march.com Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build doug-march.com as a TanStack Start portfolio site with the Mission Control aesthetic — dark navy, Space Mono, cyan/green/blue accents, fixed split layout.

**Architecture:** TanStack Start app with file-based routing. Projects stored as typed TypeScript data files (no CMS, no database). Sidebar is a shared layout component. Pages: Home, Project (case study + lightweight), About.

**Tech Stack:** TanStack Start, React, TypeScript, CSS Modules, Vercel, Space Mono (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-11-doug-march-site-redesign.md`

---

## Chunk 1: Project Scaffold

### Task 1: Initialize TanStack Start project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `app.config.ts`
- Create: `vite.config.ts`

- [ ] **Step 1: Scaffold TanStack Start**

```bash
npm create tsrouter-app@latest . -- --template start-basic --package-manager npm
```

Expected: project files created with TanStack Start + Router installed.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at http://localhost:3000, default page loads.

- [ ] **Step 3: Clean out boilerplate**

Remove default route content from `app/routes/index.tsx`. Replace with:

```tsx
export default function Home() {
  return <div>hello</div>
}
```

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold TanStack Start project"
```

---

### Task 2: Install dependencies and configure fonts

**Files:**
- Modify: `app/routes/__root.tsx`
- Create: `app/styles/global.css`

- [ ] **Step 1: Add Google Fonts to root**

In `app/routes/__root.tsx`, add Space Mono to the `<head>`:

```tsx
import { createRootRoute, Outlet, HeadContent } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}
```

- [ ] **Step 2: Create global CSS with design tokens**

Create `app/styles/global.css`:

```css
:root {
  --bg:             #050C18;
  --bg-side:        #040913;
  --bg-card:        #070F1E;
  --border:         #0A1828;
  --border-mid:     #0D2040;

  --text:           #D4E8F8;
  --text-mid:       #7AADC4;
  --text-dim:       #3E6882;

  --cyan:           #00E5FF;
  --cyan-dim:       #2090A8;
  --cyan-glow:      rgba(0, 229, 255, 0.08);

  --logo-blue:      #4A8FD4;
  --logo-blue-dim:  rgba(74, 143, 212, 0.12);
  --logo-green:     #5CBE4A;
  --logo-green-dim: rgba(92, 190, 74, 0.10);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 18px; }

body {
  font-family: 'Space Mono', monospace;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Step 3: Import global CSS in root**

In `app/routes/__root.tsx`, add at the top:

```tsx
import '../styles/global.css'
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Open browser, inspect body — confirm `font-family: Space Mono` is applied.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add design tokens and Space Mono font"
```

---

## Chunk 2: Content Model + Data

### Task 3: Define project content types and seed data

**Files:**
- Create: `app/content/types.ts`
- Create: `app/content/projects.ts`

- [ ] **Step 1: Create types**

Create `app/content/types.ts`:

```ts
export type ProjectType =
  | 'SaaS'
  | 'Design'
  | 'Product'
  | 'Founder'
  | 'AI'
  | 'OSS'
  | 'Experiment'

export type Project = {
  slug: string
  title: string
  type: ProjectType
  year: number
  depth: 'full' | 'lightweight'
  featured?: boolean
  externalUrl?: string
  // Full case study fields
  role?: string
  timeline?: string
  status?: string
  problem?: string
  approach?: string
  outcome?: string
  stack?: string[]
  liveUrl?: string
  githubUrl?: string
  // Lightweight fields
  description?: string
}
```

- [ ] **Step 2: Create seed project data**

Create `app/content/projects.ts`:

```ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'spaceman',
    title: 'Spaceman',
    type: 'SaaS',
    year: 2024,
    depth: 'full',
    featured: true,
    externalUrl: 'https://spaceman.llc',
    role: 'Founder & Builder',
    timeline: 'Ongoing',
    status: 'Live',
    problem: 'Aerospace teams were stuck using generic tools that didn\'t fit their workflows.',
    approach: 'Talked to 20+ aerospace engineers before writing a line of code. Built around their actual processes.',
    outcome: 'Currently in active development with early users.',
    stack: ['TanStack Start', 'TypeScript', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://spaceman.llc',
  },
  {
    slug: 'project-alpha',
    title: 'Project Alpha',
    type: 'SaaS',
    year: 2023,
    depth: 'full',
    role: 'Design & Engineering',
    timeline: '6 months',
    status: 'Live',
    problem: 'Placeholder — add your real project details.',
    approach: 'Placeholder — add your real project details.',
    outcome: 'Placeholder — add your real project details.',
    stack: ['React', 'TypeScript', 'Postgres', 'Vercel'],
    liveUrl: '#',
  },
  {
    slug: 'ai-experiment',
    title: 'AI Side Project',
    type: 'AI',
    year: 2024,
    depth: 'lightweight',
    externalUrl: '#',
    description: 'A short description of what this experiment does and why you built it.',
  },
]

export const featuredProject = projects.find((p) => p.featured)
export const selectedWork = projects.filter((p) => !p.featured && p.depth === 'full')
export const experiments = projects.filter((p) => p.depth === 'lightweight')
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/content/
git commit -m "feat: add project content model and seed data"
```

---

## Chunk 3: Layout Shell

### Task 4: Build the Sidebar component

**Files:**
- Create: `app/components/Sidebar.tsx`
- Create: `app/components/Sidebar.module.css`
- Create: `app/assets/logo.svg` (inline SVG content from spec)

- [ ] **Step 1: Save logo SVG**

Create `app/assets/logo.svg` with the SVG content from the design spec (the dart/compass mark with green ring and blue pin).

- [ ] **Step 2: Create Sidebar CSS module**

Create `app/components/Sidebar.module.css`:

```css
.sidebar {
  background: var(--bg-side);
  border-right: 1px solid var(--logo-blue-dim);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 280px;
}

.identity {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--logo-blue-dim);
}

.logoWrap {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 28%;
  background: #fff;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoWrap img {
  width: 100%;
  height: 100%;
}

.idName {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
  line-height: 1.25;
}

.idRole {
  font-size: 0.52rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  margin-top: 0.2rem;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.statusDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.statusText {
  font-size: 0.58rem;
  color: var(--cyan-dim);
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  flex-direction: column;
}

.navLink {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-mid);
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--logo-blue-dim);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.15s;
}

.navLink::before {
  content: '//';
  font-size: 0.55rem;
  color: var(--text-dim);
  transition: color 0.15s;
}

.navLink:hover,
.navLinkActive {
  color: var(--cyan);
}

.navLink:hover::before,
.navLinkActive::before {
  color: var(--cyan);
}

.navLinkExt {
  color: var(--text-dim);
  font-size: 0.65rem;
}

.social {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--logo-blue-dim);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.socialLink {
  font-size: 0.62rem;
  color: var(--text-dim);
  transition: color 0.15s;
}

.socialLink:hover {
  color: var(--cyan);
}
```

- [ ] **Step 3: Create Sidebar component**

Create `app/components/Sidebar.tsx`:

```tsx
import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.identity}>
        <div className={styles.logoWrap}>
          <img src={logoUrl} alt="Doug March logo" />
        </div>
        <div>
          <div className={styles.idName}>DOUG MARCH</div>
          <div className={styles.idRole}>DESIGNER &amp; DEVELOPER</div>
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.statusDot} />
        <div className={styles.statusText}>AVAILABLE FOR PROJECTS</div>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
        >
          work
        </Link>
        <Link
          to="/about"
          className={`${styles.navLink} ${location.pathname === '/about' ? styles.navLinkActive : ''}`}
        >
          about
        </Link>
        <a
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navLink} ${styles.navLinkExt}`}
        >
          spaceman.llc
        </a>
      </nav>

      <div className={styles.social}>
        <a href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub ↗</a>
        <a href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter / X ↗</a>
        <a href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn ↗</a>
        <a href="mailto:doug@doug-march.com" className={styles.socialLink}>Email →</a>
      </div>
    </aside>
  )
}
```

- [ ] **Step 4: Create the shell layout**

Create `app/components/Layout.tsx`:

```tsx
import { Sidebar } from './Sidebar'
import styles from './Layout.module.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
```

Create `app/components/Layout.module.css`:

```css
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  position: relative;
}

.layout::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(74, 143, 212, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 143, 212, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.main {
  padding: 3rem 2.5rem;
  max-width: 780px;
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 5: Verify Sidebar renders**

Add Layout to `app/routes/index.tsx` temporarily:

```tsx
import { Layout } from '../components/Layout'
export default function Home() {
  return <Layout><div style={{ color: 'white' }}>test</div></Layout>
}
```

Run `npm run dev`, verify sidebar appears with logo, nav, and social links.

- [ ] **Step 6: Commit**

```bash
git add app/components/ app/assets/
git commit -m "feat: add Sidebar and Layout shell"
```

---

## Chunk 4: Home Page

### Task 5: Build the Active Mission block

**Files:**
- Create: `app/components/MissionCard.tsx`
- Create: `app/components/MissionCard.module.css`

- [ ] **Step 1: Create MissionCard CSS**

Create `app/components/MissionCard.module.css`:

```css
.card {
  border: 1px solid var(--logo-blue-dim);
  background: var(--bg-card);
  padding: 1.5rem 2rem;
  margin-bottom: 3rem;
  position: relative;
  box-shadow:
    0 0 30px rgba(0, 229, 255, 0.04),
    inset 0 0 20px rgba(0, 229, 255, 0.01);
}

.card::before {
  content: 'ACTIVE MISSION';
  position: absolute;
  top: -0.55rem;
  left: 1.5rem;
  background: var(--bg);
  padding: 0 0.5rem;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--cyan);
}

.card::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--cyan), transparent);
  opacity: 0.3;
}

.name {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--cyan);
  text-shadow: 0 0 24px rgba(0, 229, 255, 0.25);
  margin-bottom: 0.4rem;
  line-height: 1;
}

.desc {
  font-size: 0.65rem;
  color: var(--text-dim);
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 1.25rem;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--logo-green);
  border: 1px solid var(--logo-green);
  padding: 0.4rem 0.85rem;
  transition: background 0.2s, gap 0.2s;
}

.link:hover {
  background: var(--logo-green-dim);
  gap: 0.75rem;
}
```

- [ ] **Step 2: Create MissionCard component**

Create `app/components/MissionCard.tsx`:

```tsx
import type { Project } from '../content/types'
import styles from './MissionCard.module.css'

type Props = { project: Project }

export function MissionCard({ project }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.name}>{project.title.toUpperCase()}</div>
      {project.problem && (
        <div className={styles.desc}>{project.problem}</div>
      )}
      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          → VISIT {project.externalUrl.replace('https://', '').toUpperCase()}
        </a>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/MissionCard*
git commit -m "feat: add MissionCard component"
```

---

### Task 6: Build the project list rows

**Files:**
- Create: `app/components/ProjectRow.tsx`
- Create: `app/components/ProjectRow.module.css`
- Create: `app/components/SectionHead.tsx`
- Create: `app/components/SectionHead.module.css`

- [ ] **Step 1: Create SectionHead**

Create `app/components/SectionHead.module.css`:

```css
.head {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--logo-blue-dim);
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.head::before {
  content: '';
  flex: 0 0 1rem;
  height: 1px;
  background: var(--logo-blue);
  opacity: 0.3;
}
```

Create `app/components/SectionHead.tsx`:

```tsx
import styles from './SectionHead.module.css'
export function SectionHead({ label }: { label: string }) {
  return <div className={styles.head}>// {label}</div>
}
```

- [ ] **Step 2: Create ProjectRow CSS**

Create `app/components/ProjectRow.module.css`:

```css
.row {
  display: grid;
  grid-template-columns: 1.75rem 1fr auto 4rem;
  gap: 0 1rem;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--logo-blue-dim);
  cursor: pointer;
  transition: padding-left 0.2s;
}

.row:hover {
  padding-left: 0.35rem;
}

.num {
  font-size: 0.52rem;
  color: var(--text-dim);
  text-align: right;
}

.name {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-mid);
  transition: color 0.15s;
}

.row:hover .name {
  color: var(--text);
}

.tag {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: var(--text-dim);
  background: var(--bg-card);
  border: 1px solid var(--logo-blue-dim);
  padding: 0.15rem 0.4rem;
}

.year {
  font-size: 0.58rem;
  color: var(--text-dim);
  text-align: right;
  transition: color 0.15s;
}

.row:hover .year {
  color: var(--cyan);
}

.experiment .name {
  font-weight: 400;
  font-style: italic;
  color: var(--text-dim);
}

.experiment:hover .name {
  color: var(--text-mid);
}
```

- [ ] **Step 3: Create ProjectRow component**

Create `app/components/ProjectRow.tsx`:

```tsx
import { Link } from '@tanstack/react-router'
import type { Project } from '../content/types'
import styles from './ProjectRow.module.css'

type Props = { project: Project; index: number }

export function ProjectRow({ project, index }: Props) {
  const isExperiment = project.depth === 'lightweight'
  const rowClass = `${styles.row} ${isExperiment ? styles.experiment : ''}`
  const yearLabel = project.externalUrl
    ? `${project.year} ↗`
    : `${project.year}`

  if (project.externalUrl && isExperiment) {
    return (
      <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
        <div className={styles.name}>{project.title}</div>
        <div className={styles.tag}>{project.type.toUpperCase()}</div>
        <div className={styles.year}>{yearLabel}</div>
      </a>
    )
  }

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className={rowClass}>
      <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
      <div className={styles.name}>{project.title}</div>
      <div className={styles.tag}>{project.type.toUpperCase()}</div>
      <div className={styles.year}>{yearLabel}</div>
    </Link>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/ProjectRow* app/components/SectionHead*
git commit -m "feat: add ProjectRow and SectionHead components"
```

---

### Task 7: Wire up the Home page

**Files:**
- Modify: `app/routes/index.tsx`
- Create: `app/routes/index.module.css`

- [ ] **Step 1: Create home page CSS**

Create `app/routes/index.module.css`:

```css
.gap { margin-top: 2.5rem; }

.footer {
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--logo-blue-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footerText {
  font-size: 0.52rem;
  color: var(--text-dim);
}

.footerLink {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--logo-green);
  border: 1px solid var(--logo-green);
  padding: 0.35rem 0.75rem;
  transition: background 0.2s;
}

.footerLink:hover {
  background: var(--logo-green-dim);
}
```

- [ ] **Step 2: Build the Home page**

Replace `app/routes/index.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { MissionCard } from '../components/MissionCard'
import { ProjectRow } from '../components/ProjectRow'
import { SectionHead } from '../components/SectionHead'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Layout>
      {featuredProject && <MissionCard project={featuredProject} />}

      <SectionHead label="SELECTED WORK" />
      {selectedWork.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <div className={styles.gap} />

      <SectionHead label="EXPERIMENTS &amp; SIDE PROJECTS" />
      {experiments.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <div className={styles.footer}>
        <span className={styles.footerText}>© {new Date().getFullYear()} DOUG MARCH</span>
        <a href="mailto:doug@doug-march.com" className={styles.footerLink}>
          GET IN TOUCH →
        </a>
      </div>
    </Layout>
  )
}
```

- [ ] **Step 3: Run dev server and verify home page**

```bash
npm run dev
```

Expected: Sidebar + Mission card (SPACEMAN) + project rows + footer all visible.

- [ ] **Step 4: Commit**

```bash
git add app/routes/index*
git commit -m "feat: build home page with mission card and project list"
```

---

## Chunk 5: Project Pages

### Task 8: Create the project route and case study page

**Files:**
- Create: `app/routes/work.$slug.tsx`
- Create: `app/routes/work.$slug.module.css`

- [ ] **Step 1: Create project page CSS**

Create `app/routes/work.$slug.module.css`:

```css
.back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 0.06em;
  margin-bottom: 2rem;
  transition: color 0.15s;
}
.back:hover { color: var(--cyan); }

.header {
  border-bottom: 1px solid var(--logo-blue-dim);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.typeLabel {
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.typeLabel::before { content: '//'; color: var(--cyan); }

.title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--cyan);
  text-shadow: 0 0 24px rgba(0, 229, 255, 0.2);
  line-height: 1;
  margin-bottom: 0.75rem;
}

.meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.metaItem { display: flex; flex-direction: column; gap: 0.2rem; }
.metaLabel { font-size: 0.48rem; letter-spacing: 0.1em; color: var(--text-dim); }
.metaValue { font-size: 0.65rem; font-weight: 700; color: var(--text-mid); }

.section { margin-bottom: 2rem; }
.sectionTitle {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--cyan-dim);
  margin-bottom: 0.6rem;
}

.body {
  font-size: 0.72rem;
  color: var(--text-mid);
  line-height: 1.9;
  font-style: italic;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}
.tag {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: var(--text-dim);
  background: var(--bg-card);
  border: 1px solid var(--logo-blue-dim);
  padding: 0.2rem 0.5rem;
}

.ctas { display: flex; gap: 0.75rem; margin-top: 2rem; }

.btnGreen {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.62rem; font-weight: 700;
  color: var(--logo-green);
  border: 1px solid var(--logo-green);
  padding: 0.4rem 0.85rem;
  transition: background 0.2s, gap 0.2s;
}
.btnGreen:hover { background: var(--logo-green-dim); gap: 0.75rem; }

.btnGhost {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.62rem; font-weight: 700;
  color: var(--text-mid);
  border: 1px solid var(--border-mid);
  padding: 0.4rem 0.85rem;
  transition: color 0.2s, border-color 0.2s, gap 0.2s;
}
.btnGhost:hover { color: var(--cyan); border-color: var(--cyan-dim); gap: 0.75rem; }

/* Lightweight variant */
.lightCard {
  border: 1px solid var(--logo-blue-dim);
  background: var(--bg-card);
  padding: 1.75rem 2rem;
  margin-bottom: 2.5rem;
  position: relative;
}
.lightCard::before {
  content: attr(data-label);
  position: absolute; top: -0.55rem; left: 1.5rem;
  background: var(--bg); padding: 0 0.5rem;
  font-size: 0.52rem; font-weight: 700; letter-spacing: 0.12em; color: var(--text-dim);
}
.lightTitle {
  font-size: 1.9rem; font-weight: 700; letter-spacing: -0.03em;
  color: var(--text); line-height: 1; margin-bottom: 0.5rem;
}
.lightDesc {
  font-size: 0.7rem; color: var(--text-mid); line-height: 1.85;
  font-style: italic; margin-bottom: 1.25rem;
}
.quickFacts {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--logo-blue-dim); margin-bottom: 2rem;
}
.fact {
  padding: 0.85rem 1rem;
  border-right: 1px solid var(--logo-blue-dim);
}
.fact:last-child { border-right: none; }
.factLabel { font-size: 0.48rem; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.3rem; }
.factValue { font-size: 0.72rem; font-weight: 700; color: var(--text-mid); }
```

- [ ] **Step 2: Create project route**

Create `app/routes/work.$slug.tsx`:

```tsx
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { projects } from '../content/projects'
import styles from './work.$slug.module.css'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

function ProjectPage() {
  const project = Route.useLoaderData()

  if (project.depth === 'lightweight') {
    return (
      <Layout>
        <Link to="/" className={styles.back}>← BACK TO WORK</Link>
        <div className={styles.lightCard} data-label={project.type.toUpperCase()}>
          <div className={styles.lightTitle}>{project.title}</div>
          <div className={styles.lightDesc}>{project.description}</div>
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGreen}>
              VIEW PROJECT ↗
            </a>
          )}
        </div>
        <SectionHead label="QUICK FACTS" />
        <div className={styles.quickFacts}>
          <div className={styles.fact}>
            <div className={styles.factLabel}>TYPE</div>
            <div className={styles.factValue}>{project.type}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>YEAR</div>
            <div className={styles.factValue}>{project.year}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>STATUS</div>
            <div className={styles.factValue}>{project.status ?? 'Complete'}</div>
          </div>
        </div>
        {project.stack && (
          <>
            <SectionHead label="STACK" />
            <div className={styles.tags} style={{ marginTop: '0.5rem' }}>
              {project.stack.map((s) => <div key={s} className={styles.tag}>{s.toUpperCase()}</div>)}
            </div>
          </>
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <Link to="/" className={styles.back}>← BACK TO WORK</Link>

      <div className={styles.header}>
        <div className={styles.typeLabel}>{project.type} · {project.year}</div>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.meta}>
          {project.role && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>ROLE</div>
              <div className={styles.metaValue}>{project.role}</div>
            </div>
          )}
          {project.timeline && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>TIMELINE</div>
              <div className={styles.metaValue}>{project.timeline}</div>
            </div>
          )}
          {project.status && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>STATUS</div>
              <div className={styles.metaValue}>{project.status}</div>
            </div>
          )}
        </div>
      </div>

      {project.problem && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// PROBLEM</div>
          <div className={styles.body}>{project.problem}</div>
        </div>
      )}

      {project.approach && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// APPROACH</div>
          <div className={styles.body}>{project.approach}</div>
        </div>
      )}

      {project.outcome && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// OUTCOME</div>
          <div className={styles.body}>{project.outcome}</div>
        </div>
      )}

      {project.stack && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// STACK</div>
          <div className={styles.tags}>
            {project.stack.map((s) => <div key={s} className={styles.tag}>{s.toUpperCase()}</div>)}
          </div>
        </div>
      )}

      <div className={styles.ctas}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGreen}>
            VIEW LIVE SITE →
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
            VIEW ON GITHUB ↗
          </a>
        )}
      </div>
    </Layout>
  )
}
```

- [ ] **Step 3: Verify project page renders**

```bash
npm run dev
```

Navigate to http://localhost:3000/work/spaceman — verify case study layout renders.
Navigate to http://localhost:3000/work/ai-experiment — verify lightweight layout renders.

- [ ] **Step 4: Commit**

```bash
git add app/routes/work*
git commit -m "feat: add project pages (case study + lightweight)"
```

---

## Chunk 6: About Page

### Task 9: Build the About page

**Files:**
- Create: `app/routes/about.tsx`
- Create: `app/routes/about.module.css`
- Create: `app/content/timeline.ts`

- [ ] **Step 1: Create timeline data**

Create `app/content/timeline.ts`:

```ts
export type TimelineEntry = {
  year: string
  role: string
  company: string
  description: string
  current?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    year: '2024 —',
    role: 'Founder',
    company: 'Spaceman',
    description: 'Building tools for aerospace teams that don\'t hate using software.',
    current: true,
  },
  {
    year: '2022 —',
    role: 'Design & Engineering Lead',
    company: 'Previous Company',
    description: 'Led product design and front-end engineering.',
  },
  {
    year: '2019 —',
    role: 'Independent Consultant',
    company: 'Various Clients',
    description: 'Design and build work for early-stage startups.',
  },
]

export const capabilities = [
  'Product Design',
  'Front-End Dev',
  'Full-Stack',
  'Brand & Identity',
  'System Design',
  'Prototyping',
]
```

- [ ] **Step 2: Create About page CSS**

Create `app/routes/about.module.css`:

```css
.intro {
  border-bottom: 1px solid var(--logo-blue-dim);
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
}

.introLabel {
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.introLabel::before { content: '//'; color: var(--cyan); }

.introText {
  font-size: 0.75rem;
  color: var(--text-mid);
  line-height: 2;
  font-style: italic;
  max-width: 560px;
}
.introText strong { color: var(--text); font-style: normal; }

.tlItem {
  display: grid;
  grid-template-columns: 80px 1px 1fr;
  gap: 0 1.5rem;
}

.tlYear {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-dim);
  padding: 1rem 0;
  text-align: right;
}

.tlLineWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tlDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--logo-blue-dim);
  border: 1px solid var(--logo-blue);
  margin-top: 1.1rem;
  flex-shrink: 0;
}

.tlDotCurrent {
  background: var(--logo-green);
  border-color: var(--logo-green);
  box-shadow: 0 0 8px var(--logo-green);
}

.tlRule {
  flex: 1;
  width: 1px;
  background: var(--logo-blue-dim);
}

.tlContent {
  padding: 0.85rem 0 1.25rem;
  border-bottom: 1px solid var(--border);
}

.tlRole {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.tlCompany {
  font-size: 0.6rem;
  color: var(--cyan-dim);
  margin-bottom: 0.4rem;
}
.tlCompanyCurrent { color: var(--logo-green); }

.tlDesc {
  font-size: 0.62rem;
  color: var(--text-dim);
  line-height: 1.7;
  font-style: italic;
}

.skillsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  margin-top: 2.5rem;
}

.skill {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: var(--text-dim);
  background: var(--bg-card);
  border: 1px solid var(--logo-blue-dim);
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Create About page**

Create `app/routes/about.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { timeline, capabilities } from '../content/timeline'
import styles from './about.module.css'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <div className={styles.intro}>
        <div className={styles.introLabel}>ABOUT</div>
        <p className={styles.introText}>
          I'm a <strong>designer and developer</strong> who builds products from first
          principles — from idea through design, engineering, and launch. Currently
          focused on <strong>Spaceman</strong>, building tools for aerospace teams.
          <br /><br />
          I care about craft, clarity, and products that actually get used.
        </p>
      </div>

      <SectionHead label="BACKGROUND" />

      <div>
        {timeline.map((entry) => (
          <div key={entry.company} className={styles.tlItem}>
            <div className={styles.tlYear}>{entry.year}</div>
            <div className={styles.tlLineWrap}>
              <div className={`${styles.tlDot} ${entry.current ? styles.tlDotCurrent : ''}`} />
              <div className={styles.tlRule} />
            </div>
            <div className={styles.tlContent}>
              <div className={styles.tlRole}>{entry.role}</div>
              <div className={`${styles.tlCompany} ${entry.current ? styles.tlCompanyCurrent : ''}`}>
                {entry.company}
              </div>
              <div className={styles.tlDesc}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead label="CAPABILITIES" />
      <div className={styles.skillsGrid}>
        {capabilities.map((skill) => (
          <div key={skill} className={styles.skill}>{skill}</div>
        ))}
      </div>
    </Layout>
  )
}
```

- [ ] **Step 4: Verify about page**

```bash
npm run dev
```

Navigate to http://localhost:3000/about — verify timeline and skills render.

- [ ] **Step 5: Commit**

```bash
git add app/routes/about* app/content/timeline.ts
git commit -m "feat: add About page with timeline"
```

---

## Chunk 7: Deploy

### Task 10: Deploy to Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Add Vercel config**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": null
}
```

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/dougmarch/doug-march-site.git
git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

1. Go to vercel.com → New Project
2. Import the GitHub repo
3. Framework: Other
4. Build command: `npm run build`
5. Output: `.output/public`
6. Deploy

- [ ] **Step 4: Set custom domain**

In Vercel project settings → Domains → Add `doug-march.com` and `www.doug-march.com`.

Update DNS records at registrar:
- A record: `76.76.21.21`
- CNAME www: `cname.vercel-dns.com`

- [ ] **Step 5: Verify live**

Visit https://doug-march.com — confirm all pages load, fonts render, logo displays correctly.

- [ ] **Step 6: Final commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel deployment config"
```
