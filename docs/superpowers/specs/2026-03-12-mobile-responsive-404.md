# Mobile Responsive Layout + 404 Page — Design Spec

**Date:** 2026-03-12
**Status:** Approved

---

## Overview

Two additions to the doug-march.com portfolio site:

1. **Mobile responsive layout** — at <768px, the fixed sidebar collapses into a compact sticky top bar
2. **404 page** — a styled not-found page matching the Mission Control aesthetic

---

## Part 1: Mobile Responsive Layout

### Breakpoint

`768px` — below this width, the sidebar is hidden and replaced by a compact top bar.

### Desktop (≥768px) — Unchanged

The existing 280px sidebar + main content grid remains exactly as-is. No changes to desktop layout, styling, or behavior.

### Mobile (<768px) — Top Bar

The sidebar is replaced by a sticky top bar via CSS. The `<aside>` element stays in the DOM but its layout changes entirely at the breakpoint:

- `flex-direction: row` with `justify-content: space-between`
- `height: auto` (not 100vh)
- `width: 100%`
- `position: sticky; top: 0`

**Left side:** Logo squircle + "DOUG MARCH" name only. The `DESIGNER & DEVELOPER` role subtitle is hidden on mobile (`display: none`).

**Right side:** Two nav links only — `work` and `about`. Nav is right-aligned via `margin-left: auto` on the `<nav>` element.

The `//` prefix pseudo-element is retained on nav links. Active link state (cyan) applies based on current route.

### Hidden on Mobile (CSS `display: none`)

- `DESIGNER & DEVELOPER` role subtitle
- `spaceman.llc` external nav link
- Status dot section (also removed from DOM entirely — see below)
- Social links section in sidebar

### Status Dot — Removed Everywhere

The "AVAILABLE FOR PROJECTS" status dot and text are removed from `Sidebar.tsx` and `Sidebar.module.css` entirely — markup deleted, styles deleted. Not hidden responsively — fully gone.

### Social Links on Mobile — MobileFooter Component

On mobile, social links move to a new `MobileFooter` component rendered inside `Layout.tsx` after `<main>`. It is hidden on desktop via `display: none` at ≥768px.

**MobileFooter contents:**
- Left: `© {year} DOUG MARCH`
- Right: social links inline — full labels matching the sidebar: `GitHub ↗`, `Twitter / X ↗`, `LinkedIn ↗`, `Email →`

**iOS Safe Area:**

The footer must account for the iPhone home indicator and iOS system UI (including iOS 26's Liquid Glass bottom bar). Use `env(safe-area-inset-bottom)` for bottom padding:

```css
.footer {
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}
```

This requires the HTML `<meta name="viewport">` tag to include `viewport-fit=cover`. Update the viewport meta in `__root.tsx`:

```tsx
{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
```

Without `viewport-fit=cover`, `env(safe-area-inset-bottom)` always returns `0` and the fix has no effect.

### `index.tsx` Footer — No Changes

The existing desktop footer in `index.tsx` (copyright + "GET IN TOUCH →" CTA) stays as-is. It is not extracted or modified. The `MobileFooter` is a separate addition — on mobile the `index.tsx` footer will still render below `MobileFooter` but this is acceptable for now. The two can be unified in a future pass.

**Files Changed table correction:** `index.tsx` is not changed in this spec.

---

## Part 2: 404 Not-Found Page

### Trigger

TanStack Router's `notFound()` is already thrown by the `work.$slug` loader for unknown slugs. The root route needs a `notFoundComponent` to render a styled page instead of the default fallback.

### Design

The `NotFound` component must explicitly wrap its content in `<Layout>` — the root route does not apply Layout automatically (Layout is applied per-route). Without this, the 404 page will render without a sidebar/top bar.

Content:

```
// 404

NOT FOUND

The page you're looking for doesn't exist or has been moved.

← BACK TO WORK        (link to /)
```

Styling:
- `// 404` — small label style, `--text-dim`, same pattern as section labels
- `NOT FOUND` — `1.9rem`, bold, `--text`, letter-spacing tight
- Description — `0.7rem`, italic, `--text-dim`
- Back link — same `.back` style as project pages (small, bold, cyan on hover)

Nav active state: no link is active on the 404 route. Both `work` and `about` render in their default (inactive) state.

### Implementation

Add `notFoundComponent` to the root route in `app/routes/__root.tsx`. The `NotFound` component can live inline in `__root.tsx` (it's small — ~20 lines):

```tsx
export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({ ... }),
  component: RootComponent,
})

function NotFound() {
  return (
    <Layout>
      {/* 404 content */}
    </Layout>
  )
}
```

The `NotFound` component needs its own CSS module: `app/routes/not-found.module.css`.

---

## Files Changed

| File | Change |
|---|---|
| `app/components/Sidebar.tsx` | Remove status dot markup; add mobile top-bar layout |
| `app/components/Sidebar.module.css` | Remove status styles; add mobile media query for top-bar layout |
| `app/components/Layout.tsx` | Add `<MobileFooter />` after `<main>` |
| `app/components/Layout.module.css` | Add mobile media query (single-column grid, hide sidebar) |
| `app/components/MobileFooter.tsx` | New: social links + copyright for mobile |
| `app/components/MobileFooter.module.css` | New: mobile-only footer styles with safe-area-inset-bottom |
| `app/routes/__root.tsx` | Add `notFoundComponent`; update viewport meta with `viewport-fit=cover` |
| `app/routes/not-found.module.css` | New: 404 page styles |

---

## Out of Scope

- Tablet-specific layout (768px breakpoint covers both tablet and mobile)
- Hamburger/drawer navigation
- Bottom tab bar
- Responsive typography scaling
- Touch-specific interactions
- Unifying the `index.tsx` desktop footer with `MobileFooter`
