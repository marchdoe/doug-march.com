# Mobile Responsive Layout + 404 Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make doug-march.com responsive at 768px (compact sticky top bar on mobile) and add a styled 404 page.

**Architecture:** CSS-only responsive — no JS toggle or state. The existing `<aside>` sidebar restructures to a horizontal top bar via a single `@media (max-width: 767px)` breakpoint. A new `MobileFooter` component renders social links on mobile with iOS safe-area padding. The 404 page is a `notFoundComponent` on the root route, wrapped in `Layout`.

**Tech Stack:** TanStack Router, React, TypeScript, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-12-mobile-responsive-404.md`

---

## Chunk 1: Cleanup + Viewport

### Task 1: Remove status dot and update viewport meta

**Files:**
- Modify: `app/components/Sidebar.tsx`
- Modify: `app/components/Sidebar.module.css`
- Modify: `app/routes/__root.tsx`

- [ ] **Step 1: Remove status dot from Sidebar.tsx**

In `app/components/Sidebar.tsx`, delete the entire status block (lines 20–23):

```tsx
// DELETE these 4 lines:
<div className={styles.status}>
  <div className={styles.statusDot} />
  <div className={styles.statusText}>AVAILABLE FOR PROJECTS</div>
</div>
```

After removal, the component renders: identity block → nav → social. Nothing else.

- [ ] **Step 2: Remove status styles from Sidebar.module.css**

In `app/components/Sidebar.module.css`, delete:
- The `.status` rule (lines 54–59)
- The `.statusDot` rule (lines 61–69)
- The `@keyframes pulse` block (lines 71–74)
- The `.statusText` rule (lines 76–80)

- [ ] **Step 3: Update viewport meta in __root.tsx**

In `app/routes/__root.tsx`, change the viewport meta content from:
```tsx
{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
```
to:
```tsx
{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
```

This enables `env(safe-area-inset-bottom)` to return non-zero values on iOS devices.

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/Sidebar.tsx app/components/Sidebar.module.css app/routes/__root.tsx
git commit -m "feat: remove status dot, add viewport-fit=cover"
```

---

## Chunk 2: Mobile Top Bar

### Task 2: Add mobile layout to Sidebar and Layout

**Files:**
- Modify: `app/components/Sidebar.module.css`
- Modify: `app/components/Layout.module.css`

- [ ] **Step 1: Add mobile media query to Sidebar.module.css**

Append to the end of `app/components/Sidebar.module.css`:

```css
@media (max-width: 767px) {
  /* Sidebar becomes a full-width sticky top bar */
  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-right: none;
    border-bottom: 1px solid var(--logo-blue-dim);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  /* Identity block: remove vertical spacing and divider */
  .identity {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  /* Hide role subtitle — only name + logo on mobile */
  .idRole {
    display: none;
  }

  /* Nav: row layout, pushed to right side */
  .nav {
    flex-direction: row;
    gap: 1rem;
    margin-left: auto;
  }

  .navLink {
    border-bottom: none;
    padding: 0;
    font-size: 0.65rem;
  }

  /* Hide spaceman.llc link on mobile */
  .navLinkExt {
    display: none;
  }

  /* Hide social links — they move to MobileFooter component */
  .social {
    display: none;
  }
}
```

- [ ] **Step 2: Add mobile media query to Layout.module.css**

Append to the end of `app/components/Layout.module.css`:

```css
@media (max-width: 767px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .main {
    padding: 1.5rem 1.25rem;
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Start dev server and verify mobile layout**

```bash
npm run dev
```

Open http://localhost:3000 (or 3001) and resize the browser window below 768px. Verify:
- Sidebar collapses to a horizontal top bar
- Logo and "DOUG MARCH" visible on left
- "work" and "about" nav links on right, spaceman.llc hidden
- "DESIGNER & DEVELOPER" hidden
- Desktop layout unchanged above 768px

Kill the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add app/components/Sidebar.module.css app/components/Layout.module.css
git commit -m "feat: add mobile top bar layout"
```

---

## Chunk 3: MobileFooter Component

### Task 3: Create MobileFooter with social links and iOS safe area

**Files:**
- Create: `app/components/MobileFooter.tsx`
- Create: `app/components/MobileFooter.module.css`
- Modify: `app/components/Layout.tsx`

- [ ] **Step 1: Create MobileFooter.module.css**

Create `app/components/MobileFooter.module.css`:

```css
.footer {
  display: none;
}

@media (max-width: 767px) {
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    border-top: 1px solid var(--logo-blue-dim);
    margin-top: auto;
  }

  .copy {
    font-size: 0.52rem;
    color: var(--text-dim);
  }

  .links {
    display: flex;
    gap: 0.75rem;
  }

  .link {
    font-size: 0.58rem;
    color: var(--text-dim);
    transition: color 0.15s;
  }

  .link:hover {
    color: var(--cyan);
  }
}
```

- [ ] **Step 2: Create MobileFooter.tsx**

Create `app/components/MobileFooter.tsx`:

```tsx
import styles from './MobileFooter.module.css'

export function MobileFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© {new Date().getFullYear()} DOUG MARCH</span>
      <div className={styles.links}>
        <a href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub ↗</a>
        <a href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter / X ↗</a>
        <a href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn ↗</a>
        <a href="mailto:doug@doug-march.com" className={styles.link}>Email →</a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Add MobileFooter to Layout.tsx**

Replace the contents of `app/components/Layout.tsx`:

```tsx
import { Sidebar } from './Sidebar'
import { MobileFooter } from './MobileFooter'
import styles from './Layout.module.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
      <MobileFooter />
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Start dev server and verify mobile footer**

```bash
npm run dev
```

Resize below 768px. Verify:
- Footer appears at bottom of page with copyright on left, social links on right
- Footer is hidden on desktop

Kill the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add app/components/MobileFooter.tsx app/components/MobileFooter.module.css app/components/Layout.tsx
git commit -m "feat: add MobileFooter with social links and iOS safe area"
```

---

## Chunk 4: 404 Page

### Task 4: Add styled not-found page

**Files:**
- Create: `app/routes/not-found.module.css`
- Modify: `app/routes/__root.tsx`

- [ ] **Step 1: Create not-found.module.css**

Create `app/routes/not-found.module.css`:

```css
.wrap {
  padding-top: 3rem;
}

.code {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.code::before {
  content: '//';
  color: var(--text-dim);
}

.heading {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  line-height: 1;
  margin-bottom: 0.75rem;
}

.message {
  font-size: 0.7rem;
  color: var(--text-dim);
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 0.06em;
  transition: color 0.15s;
}

.back:hover {
  color: var(--cyan);
}
```

- [ ] **Step 2: Add NotFound component and notFoundComponent to __root.tsx**

Replace the contents of `app/routes/__root.tsx`:

```tsx
import '../styles/global.css'
import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import styles from './not-found.module.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    ],
    title: 'Doug March',
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
  }),
  notFoundComponent: NotFound,
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

function NotFound() {
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.code}>404</div>
        <div className={styles.heading}>NOT FOUND</div>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.back}>← BACK TO WORK</Link>
      </div>
    </Layout>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Start dev server and verify 404 page**

```bash
npm run dev
```

Navigate to http://localhost:3000/does-not-exist — verify:
- Sidebar (desktop) or top bar (mobile) renders correctly
- "// 404" label, "NOT FOUND" heading, description text, and back link all appear
- Back link navigates to home

Kill the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add app/routes/not-found.module.css app/routes/__root.tsx
git commit -m "feat: add 404 not-found page"
```
