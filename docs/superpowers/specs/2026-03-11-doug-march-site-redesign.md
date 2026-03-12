# doug-march.com Redesign — Design Spec

## Overview

A redesign of Doug March's personal portfolio site from the current JS SPA (renders nothing without JS) to a modern, fast, accessible portfolio. The site is a professional portfolio targeting clients, recruiters, and general visitors. Showcases software products, design work, experiments, client work, and company-building.

**Identity:** Designer & Developer
**Current domain:** doug-march.com
**Related:** spaceman.llc (external, linked from site)

---

## Tech Stack

- **Framework:** TanStack Start (full-stack React, SSR, type-safe routing)
- **Deployment:** Vercel
- **Styling:** CSS (scoped per component or CSS modules — no Tailwind)
- **Fonts:** Space Mono (Google Fonts) — display and body
- **Content:** File-based (MDX or structured TS files for projects)

---

## Visual Design System

### Color Palette

```
--bg:             #050C18   /* Dark navy base */
--bg-side:        #040913   /* Sidebar — slightly darker */
--bg-card:        #070F1E   /* Cards, mission block */
--border:         #0A1828   /* Structural borders */
--border-mid:     #0D2040   /* Mid-weight borders */

/* Text — all WCAG AA or better on --bg */
--text:           #D4E8F8   /* Primary — ~14:1 ✅ AAA */
--text-mid:       #7AADC4   /* Secondary — ~6.2:1 ✅ AA */
--text-dim:       #3E6882   /* Tertiary labels — ~4.6:1 ✅ AA */

/* Accents */
--cyan:           #00E5FF   /* Main accent — hover states, headings */
--cyan-dim:       #2090A8   /* Status/label text — ~5.6:1 ✅ AA */
--cyan-glow:      rgba(0, 229, 255, 0.08)

/* Logo colors */
--logo-blue:      #4A8FD4   /* Hairlines only (decorative, non-text) */
--logo-blue-dim:  rgba(74, 143, 212, 0.12)
--logo-green:     #5CBE4A   /* Buttons/CTAs only */
--logo-green-dim: rgba(92, 190, 74, 0.10)
```

### Typography

- **Font:** Space Mono (monospace) — used for all text
- **Base size:** 18px root (`html { font-size: 18px }`)
- **Scale:** rem-based from 0.5rem (9px) up to 2.5rem (45px)
- **Key sizes:**
  - Labels/tags: 0.5–0.55rem
  - Body/nav: 0.7–0.8rem
  - Section headings: 0.55rem uppercase + letter-spacing
  - Feature headline (SPACEMAN): 1.9rem
  - Sidebar name: 0.8rem

### Background Texture

Subtle dot grid on the main content area:
```css
background-image:
  linear-gradient(rgba(74,143,212,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(74,143,212,0.02) 1px, transparent 1px);
background-size: 40px 40px;
```

### Logo Treatment

SVG logo inlined, placed on a **white squircle** container:
```css
width: 44px; height: 44px;
border-radius: 28%;
background: #fff;
padding: 5px;
```

---

## Layout

### Global Shell

Fixed split layout on all pages:

```
┌─────────────────┬──────────────────────────────────┐
│  Sidebar 280px  │  Main content (max-width 780px)  │
│  (sticky/fixed) │  (scrollable)                    │
└─────────────────┴──────────────────────────────────┘
```

### Sidebar (identical on all pages)

- Logo (SVG squircle) + name + role
- Availability status dot (pulsing cyan) + text
- Nav: Work / About / spaceman.llc ↗
- Social links pinned to bottom: GitHub, Twitter/X, LinkedIn, Email

Active nav item highlighted in cyan.

### Main content area

Varies per page. Max-width 780px. Padding 3rem 2.5rem.

---

## Pages

### 1. Home (`/`)

**Sections:**

1. **Active Mission block** — Spaceman featured project
   - Border: 1px `--logo-blue-dim`, background `--bg-card`
   - Label: "ACTIVE MISSION" positioned above border (absolute)
   - Right-edge cyan gradient light bar
   - Project name in `--cyan` with text-shadow glow
   - Italic description in `--text-dim`
   - Green CTA button → spaceman.llc

2. **Selected Work** — case study projects
   - Section header: `// SELECTED WORK` with decorative line
   - Rows: number | name | tag | year
   - Hover: row slides right, name brightens to `--text`, year turns cyan

3. **Experiments & Side Projects**
   - Same row structure, entry names in italic `--text-dim`
   - Year links show `↗` for external

### 2. Project — Case Study (`/work/[slug]`)

- Back link `← BACK TO WORK`
- Project header: type/year label, large cyan title, metadata row (role, timeline, status)
- Sections: Problem, Approach, Outcome (each with `// LABEL` heading + italic body text)
- Image/screenshot placeholder block
- Stack tags
- CTA row: green "VIEW LIVE SITE →" + ghost "VIEW ON GITHUB ↗"

### 3. Project — Lightweight (`/work/[slug]`)

- Back link
- Card container with "EXPERIMENT" label (same border treatment as mission card)
- Project name + description paragraph
- Quick facts grid: type | year | status
- Stack tags
- Single green CTA

**Differentiation from case study:** Determined by a `depth: "full" | "lightweight"` field in project content.

### 4. About (`/about`)

- Intro paragraph with `// ABOUT` label
- Timeline: year | vertical rule with dot | role + company + description
  - Current role dot: logo green with glow
  - Past role dots: `--logo-blue-dim` fill, `--logo-blue` border
- Capabilities grid (3-column tag grid)

---

## Accessibility

- **Minimum:** WCAG AA (4.5:1 for normal text, 3:1 for large text)
- All text colors verified against `--bg: #050C18`
- Hairlines and decorative borders exempt (non-text)
- Semantic HTML: `<aside>`, `<nav>`, `<main>`, proper heading hierarchy
- Focus states on all interactive elements

---

## Content Model

Projects stored as structured content. Each project has:

```ts
type Project = {
  slug: string
  title: string
  type: 'SaaS' | 'Design' | 'Product' | 'Founder' | 'AI' | 'OSS' | 'Experiment'
  year: number
  depth: 'full' | 'lightweight'
  featured?: boolean        // pins to Active Mission slot
  externalUrl?: string      // shows ↗, links out directly
  // Case study fields (depth: 'full')
  role?: string
  timeline?: string
  status?: string
  problem?: string          // MDX
  approach?: string         // MDX
  outcome?: string          // MDX
  stack?: string[]
  liveUrl?: string
  githubUrl?: string
  // Lightweight fields
  description?: string
  quickFacts?: { type: string; year: number; status: string }
}
```

---

## Deferred (not in this build)

- Mobile / responsive layout
- Dark/light mode toggle
- spaceman.llc site
- Contact form
- RSS feed
- Analytics
