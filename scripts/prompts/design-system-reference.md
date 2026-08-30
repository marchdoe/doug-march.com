# Design System API Reference

This is the exact API surface available to you. Use ONLY what is documented here.

## Styled Components (from `../../styled-system/jsx`)

Available components: `Box`, `Flex`, `Grid`, `Stack`, `VStack`, `HStack`, `Container`, `Center`, `Divider`, `Spacer`, `VisuallyHidden`, `styled`

### `styled()` factory — create custom styled components:
```tsx
const Card = styled('div', {
  base: { padding: '4', background: 'bg.card', borderRadius: '8px' },
  variants: {
    size: {
      sm: { padding: '2' },
      lg: { padding: '6' },
    },
  },
})
```

### Layout component props:
- **Flex**: `align`, `justify`, `direction`, `wrap`, `gap`
- **Grid**: `columns`, `gap`, `columnGap`, `rowGap`, `minChildWidth`
- **Stack/VStack/HStack**: `gap`, `align`, `justify`
- **All components**: accept CSS props directly — `fontSize`, `color`, `padding`, `margin`, `background`, etc.

## CSS Function (from `../../styled-system/css`)

```tsx
import { css } from '../../styled-system/css'
const className = css({ display: 'flex', gap: '4', color: 'text' })
<div className={className}>Content</div>
```

## Content Data — Exact Exports

### `../content/projects` (from components) or `'../content/projects'` (from routes)
```typescript
type Project = {
  slug: string; title: string; type: ProjectType; year: number;
  depth: 'full' | 'lightweight'; featured?: boolean; externalUrl?: string;
  role?: string; problem?: string; approach?: string; outcome?: string;
  stack?: string[]; liveUrl?: string; githubUrl?: string; description?: string;
}
export const projects: Project[]
export const featuredProject: Project | undefined
export const selectedWork: Project[]    // depth === 'full' && !featured
export const experiments: Project[]      // depth === 'lightweight'
```

### `../content/timeline`
```typescript
type TimelineEntry = { year: string; role: string; company: string; description: string; current?: boolean }
export const timeline: TimelineEntry[]
export const capabilities: string[]
```

### `../content/about`
```typescript
export const identity: { name: string; role: string; statement: string; email: string }
// Full-depth projects may also carry white-paper fields — all optional:
//   context?: string
//   constraints?: string[]
//   process?: { phase, does, produces }[]      // ORDERED; order must be legible
//   decisions?: { decision, why }[]            // never split the pair
//   references?: { title, url, note? }[]       // real outbound anchors
export const personal: { holesInOne: number; sport: string; teams: string[]; currentFocus: string }
```
**WARNING:** There is NO `bio` export. Use `identity` for the Bio component.

## PandaCSS Preset Structure

```typescript
import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: { /* selector: styles */ },
  conditions: { extend: { light: '.light &, [data-theme=light] &' } },
  theme: {
    tokens: {
      colors: { paletteName: { shade: { value: '#hex' } } },
      fonts: { name: { value: "'Font Name', fallback" } },
      fontSizes: { name: { value: 'rem value' } },
      fontWeights: { name: { value: 'number' } },
      letterSpacings: { name: { value: 'em value' } },
      lineHeights: { name: { value: 'number' } },
      spacing: { name: { value: 'rem value' } },
      durations: { name: { value: 's value' } },
      easings: { name: { value: 'css timing fn' } },
    },
    semanticTokens: {
      colors: {
        tokenName: {
          DEFAULT: { value: { base: '{colors.palette.shade}', _light: '{colors.palette.shade}' } },
          variant: { value: { base: '...', _light: '...' } },
        },
      },
    },
  },
})
```

## Semantic Token Names (used in components)

Components reference token names, NOT raw color values. A name outside these sets ships as a bare identifier, the browser drops the declaration, and the element silently keeps its inherited value.

- **Colors:** whatever today's `elements/preset.ts` defines under `semanticTokens.colors`. Read that file; the set is redrawn every night and there is no name you can count on across builds.
- **Fonts:** `display` and `body` come from the chassis. Anything else exists only if the preset defines it.
- **Font sizes:** `2xs`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `hero`. Nothing above `5xl` exists. `hero` is a fluid clamp, ready to use on a headline.
- **Spacing:** `1`-`9`, mapping to 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px. A bare number is a spacing token, so a literal size needs its unit (`width: '44px'`).
- **Line heights:** `tight`, `snug`, `normal`, `loose`
- **Letter spacings:** `tight`, `normal`, `wide`, `wider`, `widest`

## Route Pattern

```tsx
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/path')({ component: MyPage })
function MyPage() { return <Layout>...</Layout> }
```

For parameterized routes: `const { slug } = Route.useParams()`

## Forbidden Imports

Do NOT import from: `@remix-run/react`, `react-router-dom`, `next/link`, `@emotion/*`, `styled-components`

For navigation links, use plain `<a href="/">` tags.
