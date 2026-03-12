# Elements Showcase Design

**Goal:** A subtle, public-accessible route at `/elements` that displays the design tokens and components of the `elements/` preset — both as a living reference while building and as a discoverable "guts of the site" page for curious visitors.

**Audience:** Developers and designers who find it, potential clients/employers who want to see how the site is built. Discoverable via the sidebar nav, but not prominent.

---

## Architecture

- Single TanStack Router route: `app/routes/elements.tsx`
- Uses the existing `Layout` component — inherits sidebar + main area automatically
- No new shared components; everything is inline in the route file
- Sidebar gets a new nav entry below `spaceman.llc`: text `// elements`, same dim/small styling as the external link (`ext` variant), internal `NavLinkInternal`
- Three top-level sections, each introduced by the existing `SectionHead` component:
  1. Tokens
  2. Components

---

## Section 1: Tokens

Each token category is a sub-section with a label and a row/grid of swatches or samples.

### Colors

Two groups:

**Semantic tokens** (`bg`, `text`, `accent`, `border`, `logo.*`) — each rendered as a colored swatch block showing:
- Token name (e.g. `bg`, `text.dim`, `accent`)
- The actual resolved CSS variable value at current theme

**Primitive swatches** (`ink`, `void`, `cyan`, `green`, `blue`) — each scale rendered as a horizontal row of colored blocks, labeled with the scale key (e.g. `ink.800`) and hex value.

All colors respond to dark/light theme automatically via CSS variables — no extra wiring needed.

### Typography

Each `fontSizes` token rendered as a live text sample (e.g. `"DOUG MARCH"`) at that size, with token name and rem value alongside. Font weights (`regular`, `bold`) and letter spacings (`tight`, `wide`, `wider`, `widest`) shown the same way as small labeled samples.

### Spacing

A row of blocks of increasing size — one per spacing token — each labeled with token name and rem value. Visual representation of the spacing scale.

---

## Section 2: Components

Each component rendered live with placeholder data. Where variants exist, each variant is shown separately with a small label.

| Component | What's shown |
|---|---|
| `MissionCard` | Single instance with placeholder project object |
| `ProjectRow` | Two instances: one `RowLink` (internal), one `RowLinkExt` (external), with placeholder data |
| `SectionHead` | Single instance with sample text |
| `MobileFooter` | Forced visible (override `display: none`) with a label noting it's mobile-only |
| `NotFound` | Inline render of the 404 styled components (`Wrap`, `Code`, `Heading`, `Message`, `BackLink`) |
| `Sidebar` | Skipped — already visible on every page via `Layout` |

---

## Sidebar Nav Entry

Added to `Sidebar.tsx` below the `spaceman.llc` external link:

```tsx
<NavLinkInternal to="/elements" ext={true}>
  elements
</NavLinkInternal>
```

Uses the `ext` variant (dim, small, hidden on mobile) — subtle, below the main nav, not prominent.

---

## Non-Goals

- No copy-to-clipboard, no interactive controls, no variant playground — static display only for now
- No MDX, no Storybook, no external tooling
- No new shared components — everything inline in `elements.tsx`
