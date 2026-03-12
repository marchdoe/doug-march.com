# Elements Showcase Design

**Goal:** A subtle, public-accessible route at `/elements` that displays the design tokens and components of the `elements/` preset — both as a living reference while building and as a discoverable "guts of the site" page for curious visitors.

**Audience:** Developers and designers who find it, potential clients/employers who want to see how the site is built. Discoverable via the sidebar nav, but not prominent.

---

## Architecture

- Single TanStack Router route: `app/routes/elements.tsx`
- Uses the existing `Layout` component — inherits sidebar + main area automatically
- No new shared components; everything is inline in the route file
- Sidebar gets a new nav entry below `spaceman.llc` using `NavLinkInternal` with `ext={true}` — same dim/small styling. The `//` prefix is rendered automatically by the `_before` pseudo-element in `navLinkConfig`; the text content is just `elements`
- The `ext` variant hides the link on mobile (`_mobile: { display: 'none' }`). This is intentional — the showcase is desktop-only for now
- Two top-level sections, each introduced by the existing `SectionHead` component:
  1. Tokens
  2. Components

---

## Section 1: Tokens

Each token category is a sub-section with a label and a row/grid of swatches or samples.

### Colors

Two groups:

**Semantic tokens** (`bg`, `bg.side`, `bg.card`, `text`, `text.mid`, `text.dim`, `accent`, `accent.dim`, `border`, `border.mid`, `logo.blue`, `logo.green`) — each rendered as a colored swatch block showing the token name and its CSS variable (`var(--colors-*)`). All resolve automatically to dark/light values via the existing CSS variables — no extra wiring needed.

**Primitive swatches** (`ink`, `void`, `cyan`, `green`, `blue`) — each scale rendered as a horizontal row of colored blocks, labeled with the scale key (e.g. `ink.800`) and hex value.

### Typography

Each `fontSizes` token rendered as a live text sample (e.g. `"DOUG MARCH"`) at that size, with token name and rem value alongside. Font weights (`regular`, `bold`) and letter spacings (`tight`, `wide`, `wider`, `widest`) shown as small labeled samples.

### Spacing

A row of blocks of increasing width — one per spacing token — each labeled with token name and rem value.

---

## Section 2: Components

Each component rendered live with placeholder data. Where variants exist, each is shown separately with a small label.

| Component | What's shown | Implementation note |
|---|---|---|
| `MissionCard` | Single instance | Pass a fabricated `Project` object with `title`, `problem`, `externalUrl` |
| `ProjectRow` | Two instances | Pass two fabricated `Project` objects. `RowLinkExt` requires **both** `externalUrl` set **and** `depth: 'lightweight'` — without both conditions, `ProjectRow` falls through to `RowLink`. Required fields on `Project`: `slug`, `title`, `type`, `year`, `depth` |
| `SectionHead` | Single instance with sample text | Direct use |
| `MobileFooter` | Forced visible via inline `style={{ display: 'flex' }}` prop | Add a label above noting "mobile-only component" |
| `NotFound styled components` | `Wrap`, `Code`, `Heading`, `Message`, `BackLink` rendered inline | These are not exported from `__root.tsx`. Duplicate them as local `const` styled components inside `elements.tsx` — they are small and self-contained |
| `Sidebar` | Skipped | Already visible on every page via `Layout` |

---

## Sidebar Nav Entry

Added to `Sidebar.tsx` below the `spaceman.llc` external link:

```tsx
<NavLinkInternal to="/elements" ext={true}>
  elements
</NavLinkInternal>
```

The `//` prefix appears automatically from `navLinkConfig`'s `_before` pseudo-element. The `ext` variant applies dim color, small font size, and hides the link on mobile — intentional for a non-primary nav item.

---

## Non-Goals

- No copy-to-clipboard, no interactive controls, no variant playground — static display only for now
- No MDX, no Storybook, no external tooling
- No new shared components — everything inline in `elements.tsx`
