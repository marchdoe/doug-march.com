# PandaCSS + Elements Design System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all CSS Modules to PandaCSS `styled()` components, establish the `elements/` design token preset with full dark/light mode support, and implement mobile responsive layout + MobileFooter (superseding tasks 1–3 of `2026-03-12-mobile-responsive-404.md`).

**Architecture:** PandaCSS codegen generates `styled-system/` TypeScript utilities; a PostCSS plugin injects CSS at build time via a layer-declaration seed file. All CSS Modules are deleted and replaced with `styled()` components importing from `styled-system/jsx`. An `elements/preset.ts` defines all tokens via `definePreset()` — structured for future npm distribution.

**Tech Stack:** PandaCSS, TanStack Router, React 19, TypeScript, Vite 7, pnpm

**Spec:** `docs/superpowers/specs/2026-03-12-pandacss-elements-design-system.md`

---

## Chunk 1: PandaCSS Setup + Token Preset

### Task 1: Install PandaCSS and create the elements/ preset

**Files:**
- Create: `elements/preset.ts`
- Create: `elements/index.ts`
- Create: `app/hooks/useTheme.ts`
- Create: `panda.config.ts`
- Create: `postcss.config.cjs`
- Create: `app/styles/panda.css`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install @pandacss/dev**

```bash
pnpm add -D @pandacss/dev
```

Expected: `@pandacss/dev` appears in `package.json` devDependencies.

- [ ] **Step 2: Create `elements/preset.ts`**

```ts
import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  theme: {
    tokens: {
      colors: {
        // ink: blue family. Lower = lighter. Covers dark-mode text + light-mode backgrounds.
        ink: {
          50:  { value: '#F2F7FC' },
          100: { value: '#E8EFF8' },
          200: { value: '#C4D4E8' },
          300: { value: '#A8BECE' },
          400: { value: '#5A7A95' },
          500: { value: '#3E6882' },
          600: { value: '#2D5070' },
          700: { value: '#7AADC4' },
          800: { value: '#D4E8F8' },
          900: { value: '#0D1F30' },
        },
        // void: dark-mode backgrounds and borders only
        void: {
          100: { value: '#070F1E' },
          200: { value: '#040913' },
          300: { value: '#050C18' },
          400: { value: '#0A1828' },
          500: { value: '#0D2040' },
        },
        cyan: {
          400: { value: '#006E96' },
          500: { value: '#2090A8' },
          600: { value: '#00E5FF' },
          glow: { value: 'rgba(0,229,255,0.08)' },
        },
        green: {
          400: { value: '#4AAE3A' },
          500: { value: '#5CBE4A' },
          dim:  { value: 'rgba(92,190,74,0.10)' },
        },
        blue: {
          400: { value: '#3A7FC4' },
          500: { value: '#4A8FD4' },
          dim:  { value: 'rgba(74,143,212,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.48rem' },  // meta labels: TYPE, YEAR
        xs:    { value: '0.52rem' },  // copyright, badges, section heads
        sm:    { value: '0.6rem'  },  // nav links, back links
        base:  { value: '0.7rem'  },  // primary body text
        md:    { value: '0.8rem'  },  // component names, sidebar identity
        lg:    { value: '1rem'    },  // subheadings
        xl:    { value: '1.9rem'  },  // large headings, mission card title
        '2xl': { value: '2.5rem'  },  // project detail page title
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.03em' },
        wide:   { value: '0.06em'  },
        wider:  { value: '0.1em'   },
        widest: { value: '0.12em'  },
      },
      lineHeights: {
        tight:  { value: '1'   },
        snug:   { value: '1.3' },
        normal: { value: '1.8' },
      },
      spacing: {
        1:  { value: '0.25rem' },
        2:  { value: '0.5rem'  },
        3:  { value: '0.75rem' },
        4:  { value: '1rem'    },
        5:  { value: '1.25rem' },
        6:  { value: '1.5rem'  },
        8:  { value: '2rem'    },
        10: { value: '2.5rem'  },
        12: { value: '3rem'    },
      },
      durations: {
        fast: { value: '0.15s' },
        base: { value: '0.25s' },
        slow: { value: '0.4s'  },
      },
      easings: {
        default: { value: 'ease' },
        out:     { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.void.300}', _light: '{colors.ink.50}'  } },
          side:    { value: { base: '{colors.void.200}', _light: '{colors.ink.100}' } },
          card:    { value: { base: '{colors.void.100}', _light: '#FFFFFF'          } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.void.400}', _light: '{colors.ink.200}' } },
          mid:     { value: { base: '{colors.void.500}', _light: '{colors.ink.300}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.ink.800}',  _light: '{colors.ink.900}' } },
          mid:     { value: { base: '{colors.ink.700}',  _light: '{colors.ink.600}' } },
          dim:     { value: { base: '{colors.ink.500}',  _light: '{colors.ink.400}' } },
        },
        accent: {
          DEFAULT: { value: { base: '{colors.cyan.600}', _light: '{colors.cyan.400}' } },
          dim:     { value: { base: '{colors.cyan.500}', _light: '{colors.cyan.500}' } },
          glow:    { value: { base: '{colors.cyan.glow}', _light: 'rgba(0,110,150,0.08)' } },
        },
        logo: {
          blue:     { value: { base: '{colors.blue.500}',  _light: '{colors.blue.400}'         } },
          blueDim:  { value: { base: '{colors.blue.dim}',  _light: 'rgba(58,127,196,0.12)'     } },
          green:    { value: { base: '{colors.green.500}', _light: '{colors.green.400}'         } },
          greenDim: { value: { base: '{colors.green.dim}', _light: 'rgba(74,174,58,0.12)'       } },
        },
      },
    },
  },
})
```

- [ ] **Step 3: Create `elements/index.ts`**

```ts
export { elementsPreset } from './preset'
```

- [ ] **Step 4: Create `app/hooks/useTheme.ts`**

```ts
export function useTheme() {
  const current = (): 'dark' | 'light' =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'

  const toggle = () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(next)
    localStorage.setItem('theme', next)
  }

  return { toggle, current }
}
```

- [ ] **Step 5: Create `panda.config.ts`**

```ts
import { defineConfig } from '@pandacss/dev'
import { elementsPreset } from './elements/preset'

export default defineConfig({
  preflight: false,
  presets: [elementsPreset],
  include: ['./app/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
  conditions: {
    extend: {
      light:  '.light &, [data-theme=light] &',
      dark:   '.dark &,  [data-theme=dark] &',
      mobile: '@media (max-width: 767px)',
    },
  },
})
```

- [ ] **Step 6: Create `postcss.config.cjs`**

```js
module.exports = {
  plugins: {
    '@pandacss/dev/postcss': {},
  },
}
```

- [ ] **Step 7: Create `app/styles/panda.css`**

This is the layer-declaration seed file. The PostCSS plugin expands it into the full generated CSS at build time.

```css
@layer reset, base, tokens, recipes, utilities;
```

- [ ] **Step 8: Update `package.json` scripts**

Replace the `scripts` block:

```json
"scripts": {
  "dev": "panda codegen && vite dev --port 3000",
  "build": "panda codegen && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "codegen": "panda codegen",
  "codegen:watch": "panda codegen --watch"
}
```

Note: `panda codegen` runs once before the dev server starts. For active token development, run `pnpm codegen:watch` in a separate terminal alongside `vite dev --port 3000`.

- [ ] **Step 9: Add `styled-system/` to `.gitignore`**

Append to `.gitignore`:

```
styled-system/
```

- [ ] **Step 10: Run codegen**

```bash
pnpm codegen
```

Expected: `styled-system/` directory created at project root containing `jsx.tsx`, `css.ts`, `tokens/index.ts`, and other generated files. No errors.

- [ ] **Step 11: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors. If PandaCSS types are not found, check that `styled-system/` was generated and that `tsconfig.json` includes the project root.

- [ ] **Step 12: Commit**

```bash
git add elements/preset.ts elements/index.ts app/hooks/useTheme.ts panda.config.ts postcss.config.cjs app/styles/panda.css package.json .gitignore
git commit -m "feat: add PandaCSS setup and elements/ token preset"
```

---

## Chunk 2: Shell Components (Layout + Sidebar + MobileFooter)

### Task 2: Migrate Layout component

**Files:**
- Modify: `app/components/Layout.tsx`
- Delete: `app/components/Layout.module.css`

- [ ] **Step 1: Replace `app/components/Layout.tsx`**

```tsx
import { Sidebar } from './Sidebar'
import { MobileFooter } from './MobileFooter'
import { styled } from '../../styled-system/jsx'

const LayoutRoot = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    minHeight: '100vh',
    position: 'relative',
    _before: {
      content: '""',
      position: 'fixed',
      inset: '0',
      backgroundImage: [
        'linear-gradient(rgba(74, 143, 212, 0.02) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(74, 143, 212, 0.02) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
      zIndex: '0',
    },
    _mobile: {
      gridTemplateColumns: '1fr',
    },
  },
})

const Main = styled('main', {
  base: {
    paddingTop: '12',
    paddingBottom: '12',
    paddingLeft: '10',
    paddingRight: '10',
    maxWidth: '780px',
    position: 'relative',
    zIndex: '1',
    _mobile: {
      paddingTop: '6',
      paddingBottom: '6',
      paddingLeft: '5',
      paddingRight: '5',
    },
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutRoot>
      <Sidebar />
      <Main>{children}</Main>
      <MobileFooter />
    </LayoutRoot>
  )
}
```

- [ ] **Step 2: Delete `app/components/Layout.module.css`**

```bash
rm app/components/Layout.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors. (MobileFooter doesn't exist yet — that's fine, it will be created in Task 4. If TypeScript errors on the import, create a stub: `export function MobileFooter() { return null }` in `app/components/MobileFooter.tsx` temporarily.)

- [ ] **Step 4: Commit**

```bash
git add app/components/Layout.tsx app/components/Layout.module.css
git commit -m "feat: migrate Layout to PandaCSS styled()"
```

---

### Task 3: Migrate Sidebar (+ remove status dot + add mobile top bar)

**Files:**
- Modify: `app/components/Sidebar.tsx`
- Delete: `app/components/Sidebar.module.css`

This task covers three things that were previously separate: removing the status dot (from superseded Task 1), adding mobile top bar styles (superseded Task 2), and migrating CSS Modules to PandaCSS.

- [ ] **Step 1: Replace `app/components/Sidebar.tsx`**

The status dot block (lines 20–23 in the original) is removed entirely. Mobile top bar styles are added as `_mobile` conditions.

```tsx
import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import { styled } from '../../styled-system/jsx'
import type { ComponentProps } from 'react'

const SidebarRoot = styled('aside', {
  base: {
    background: 'bg.side',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'logo.blueDim',
    paddingTop: '12',
    paddingBottom: '12',
    paddingLeft: '8',
    paddingRight: '8',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '0',
    height: '100vh',
    width: '280px',
    _mobile: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '3',
      paddingBottom: '3',
      paddingLeft: '5',
      paddingRight: '5',
      borderRightWidth: '0',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'logo.blueDim',
      zIndex: '100',
    },
  },
})

const Identity = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    marginBottom: '5',
    paddingBottom: '6',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    _mobile: {
      marginBottom: '0',
      paddingBottom: '0',
      borderBottomWidth: '0',
    },
  },
})

const LogoWrap = styled('div', {
  base: {
    width: '44px',
    height: '44px',
    flexShrink: '0',
    borderRadius: '28%',
    background: '#fff',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': { width: '100%', height: '100%' },
  },
})

const IdName = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    lineHeight: 'snug',
  },
})

const IdRole = styled('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
    letterSpacing: '0.04em',
    marginTop: '0.2rem',
    _mobile: { display: 'none' },
  },
})

const Nav = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    _mobile: {
      flexDirection: 'row',
      gap: '4',
      marginLeft: 'auto',
    },
  },
})

// Shared nav link styles — used for both internal (Link) and external (a) links
const navLinkConfig = {
  base: {
    fontSize: 'base',
    fontWeight: 'bold',
    color: 'text.mid',
    paddingTop: '2',
    paddingBottom: '2',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _before: {
      content: '"//"',
      fontSize: 'xs',
      color: 'text.dim',
      transitionProperty: 'color',
      transitionDuration: 'fast',
      transitionTimingFunction: 'default',
    },
    _hover: {
      color: 'accent',
      _before: { color: 'accent' },
    },
    _mobile: {
      borderBottomWidth: '0',
      paddingTop: '0',
      paddingBottom: '0',
      fontSize: 'xs',
    },
  },
  variants: {
    active: {
      true: {
        color: 'accent',
        _before: { color: 'accent' },
      },
    },
    ext: {
      true: {
        color: 'text.dim',
        fontSize: 'sm',
        _mobile: { display: 'none' },
      },
    },
  },
} as const

const NavLinkInternal = styled(Link, navLinkConfig)
const NavLinkExternal = styled('a', navLinkConfig)

const Social = styled('div', {
  base: {
    marginTop: 'auto',
    paddingTop: '6',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    _mobile: { display: 'none' },
  },
})

const SocialLink = styled('a', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

export function Sidebar() {
  const location = useLocation()

  return (
    <SidebarRoot>
      <Identity>
        <LogoWrap>
          <img src={logoUrl} alt="Doug March logo" />
        </LogoWrap>
        <div>
          <IdName>DOUG MARCH</IdName>
          <IdRole>DESIGNER &amp; DEVELOPER</IdRole>
        </div>
      </Identity>

      <Nav>
        <NavLinkInternal
          to="/"
          active={location.pathname === '/' ? true : undefined}
        >
          work
        </NavLinkInternal>
        <NavLinkInternal
          to="/about"
          active={location.pathname === '/about' ? true : undefined}
        >
          about
        </NavLinkInternal>
        <NavLinkExternal
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          ext
        >
          spaceman.llc
        </NavLinkExternal>
      </Nav>

      <Social>
        <SocialLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GitHub ↗</SocialLink>
        <SocialLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">Twitter / X ↗</SocialLink>
        <SocialLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LinkedIn ↗</SocialLink>
        <SocialLink href="mailto:doug@doug-march.com">Email →</SocialLink>
      </Social>
    </SidebarRoot>
  )
}
```

- [ ] **Step 2: Delete `app/components/Sidebar.module.css`**

```bash
rm app/components/Sidebar.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors. PandaCSS variant prop types may require `active={true}` rather than just `active` — adjust if TypeScript complains. The `ext` boolean prop on `NavLinkExternal` follows the same pattern.

- [ ] **Step 4: Commit**

```bash
git add app/components/Sidebar.tsx app/components/Sidebar.module.css
git commit -m "feat: migrate Sidebar to PandaCSS, remove status dot, add mobile top bar"
```

---

### Task 4: Create MobileFooter component

**Files:**
- Create: `app/components/MobileFooter.tsx`
- Delete stub if created in Task 2 Step 3

This component is new — it was never created in CSS Modules. It's built directly in PandaCSS. Hidden on desktop, visible on mobile. Uses `env(safe-area-inset-bottom)` for iOS home indicator clearance (works because `viewport-fit=cover` was added to the viewport meta in the 404 task).

- [ ] **Step 1: Create `app/components/MobileFooter.tsx`**

```tsx
import { styled } from '../../styled-system/jsx'

const FooterRoot = styled('footer', {
  base: {
    display: 'none',
    _mobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '3',
      paddingLeft: '5',
      paddingRight: '5',
      paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'logo.blueDim',
      marginTop: 'auto',
    },
  },
})

const Copy = styled('span', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
  },
})

const Links = styled('div', {
  base: {
    display: 'flex',
    gap: '3',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '0.58rem',
    color: 'text.dim',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

export function MobileFooter() {
  return (
    <FooterRoot>
      <Copy>© {new Date().getFullYear()} DOUG MARCH</Copy>
      <Links>
        <FooterLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GitHub ↗</FooterLink>
        <FooterLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">Twitter / X ↗</FooterLink>
        <FooterLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LinkedIn ↗</FooterLink>
        <FooterLink href="mailto:doug@doug-march.com">Email →</FooterLink>
      </Links>
    </FooterRoot>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify mobile layout**

```bash
pnpm dev
```

Open `http://localhost:3000` and resize below 768px. Verify:
- Sidebar becomes horizontal top bar with logo+name left, nav links right
- `spaceman.llc` nav link hidden on mobile
- `DESIGNER & DEVELOPER` role hidden on mobile
- Status dot is gone on desktop too
- MobileFooter visible at bottom of page on mobile with copyright + social links
- Desktop layout unchanged above 768px

Kill the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add app/components/MobileFooter.tsx
git commit -m "feat: add MobileFooter with iOS safe area"
```

---

## Chunk 3: Shared Components

### Task 5: Migrate SectionHead

**Files:**
- Modify: `app/components/SectionHead.tsx`
- Delete: `app/components/SectionHead.module.css`

- [ ] **Step 1: Replace `app/components/SectionHead.tsx`**

```tsx
import { styled } from '../../styled-system/jsx'

const Head = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    paddingBottom: '2',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    marginBottom: '0.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: {
      content: '""',
      flex: '0 0 1rem',
      height: '1px',
      background: 'logo.blue',
      opacity: '0.3',
    },
  },
})

export function SectionHead({ label }: { label: string }) {
  return <Head>// {label}</Head>
}
```

- [ ] **Step 2: Delete `app/components/SectionHead.module.css`**

```bash
rm app/components/SectionHead.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/components/SectionHead.tsx app/components/SectionHead.module.css
git commit -m "feat: migrate SectionHead to PandaCSS styled()"
```

---

### Task 6: Migrate ProjectRow

**Files:**
- Modify: `app/components/ProjectRow.tsx`
- Delete: `app/components/ProjectRow.module.css`

- [ ] **Step 1: Replace `app/components/ProjectRow.tsx`**

```tsx
import { Link } from '@tanstack/react-router'
import type { Project } from '../content/types'
import { styled } from '../../styled-system/jsx'

const Row = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1.75rem 1fr auto 4rem',
    gap: '0 1rem',
    alignItems: 'center',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    cursor: 'pointer',
    transitionProperty: 'padding-left',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '0.35rem' },
  },
  variants: {
    experiment: {
      true: {},
    },
  },
})

// Row is a layout container — Link and a need the same grid layout.
// We extend to both element types with shared config.
const RowLink = styled(Link, {
  base: {
    display: 'grid',
    gridTemplateColumns: '1.75rem 1fr auto 4rem',
    gap: '0 1rem',
    alignItems: 'center',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    cursor: 'pointer',
    transitionProperty: 'padding-left',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '0.35rem' },
  },
})

const RowLinkExt = styled('a', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1.75rem 1fr auto 4rem',
    gap: '0 1rem',
    alignItems: 'center',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    cursor: 'pointer',
    transitionProperty: 'padding-left',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '0.35rem' },
  },
})

const Num = styled('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
    textAlign: 'right',
  },
})

const Name = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'bold',
    color: 'text.mid',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    '[data-row]:hover &': { color: 'text' },
  },
  variants: {
    experiment: {
      true: {
        fontWeight: 'regular',
        fontStyle: 'italic',
        color: 'text.dim',
        '[data-row]:hover &': { color: 'text.mid' },
      },
    },
  },
})

const Tag = styled('div', {
  base: {
    fontSize: '0.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.15rem',
    paddingBottom: '0.15rem',
    paddingLeft: '0.4rem',
    paddingRight: '0.4rem',
  },
})

const Year = styled('div', {
  base: {
    fontSize: '0.58rem',
    color: 'text.dim',
    textAlign: 'right',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
  },
})

type Props = { project: Project; index: number }

export function ProjectRow({ project, index }: Props) {
  const isExperiment = project.depth === 'lightweight'
  const yearLabel = project.externalUrl ? `${project.year} ↗` : `${project.year}`
  const num = String(index + 1).padStart(2, '0')

  const inner = (
    <>
      <Num>{num}</Num>
      <Name experiment={isExperiment ? true : undefined}>{project.title}</Name>
      <Tag>{project.type.toUpperCase()}</Tag>
      <Year>{yearLabel}</Year>
    </>
  )

  if (project.externalUrl && isExperiment) {
    return (
      <RowLinkExt href={project.externalUrl} target="_blank" rel="noopener noreferrer">
        {inner}
      </RowLinkExt>
    )
  }

  return (
    <RowLink to="/work/$slug" params={{ slug: project.slug }}>
      {inner}
    </RowLink>
  )
}
```

Note: the `[data-row]:hover &` selectors for Name hover state require `data-row` on the row container. Since we're using separate `RowLink`/`RowLinkExt` elements, simplify: use `_groupHover` or change the Name hover to rely on the parent anchor's `:hover` state via CSS inheritance. Replace the `[data-row]:hover &` approach with a simpler solution — parent hover via CSS `group`:

Actually, the cleanest fix is to use PandaCSS's `_groupHover` condition. Add `data-group` to `RowLink`/`RowLinkExt` and use `_groupHover` on `Name` and `Year`:

Replace `Name` and `Year` with:

```tsx
const Name = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'bold',
    color: 'text.mid',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _groupHover: { color: 'text' },
  },
  variants: {
    experiment: {
      true: {
        fontWeight: 'regular',
        fontStyle: 'italic',
        color: 'text.dim',
        _groupHover: { color: 'text.mid' },
      },
    },
  },
})

const Year = styled('div', {
  base: {
    fontSize: '0.58rem',
    color: 'text.dim',
    textAlign: 'right',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _groupHover: { color: 'accent' },
  },
})
```

And add `data-group` attribute to both `RowLink` and `RowLinkExt` JSX:

```tsx
<RowLink to="/work/$slug" params={{ slug: project.slug }} data-group>
<RowLinkExt href={...} data-group>
```

`_groupHover` in PandaCSS maps to `[data-group]:hover &` which is exactly the pattern we need.

- [ ] **Step 2: Delete `app/components/ProjectRow.module.css`**

```bash
rm app/components/ProjectRow.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/components/ProjectRow.tsx app/components/ProjectRow.module.css
git commit -m "feat: migrate ProjectRow to PandaCSS styled()"
```

---

### Task 7: Migrate MissionCard

**Files:**
- Modify: `app/components/MissionCard.tsx`
- Delete: `app/components/MissionCard.module.css`

- [ ] **Step 1: Replace `app/components/MissionCard.tsx`**

```tsx
import type { Project } from '../content/types'
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

type Props = { project: Project }

export function MissionCard({ project }: Props) {
  return (
    <Card>
      <CardName>{project.title.toUpperCase()}</CardName>
      {project.problem && <CardDesc>{project.problem}</CardDesc>}
      {project.externalUrl && (
        <CardLink
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          → VISIT {project.externalUrl.replace(/^https?:\/\//, '').toUpperCase()}
        </CardLink>
      )}
    </Card>
  )
}
```

- [ ] **Step 2: Delete `app/components/MissionCard.module.css`**

```bash
rm app/components/MissionCard.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/components/MissionCard.tsx app/components/MissionCard.module.css
git commit -m "feat: migrate MissionCard to PandaCSS styled()"
```

---

## Chunk 4: Pages

### Task 8: Migrate index.tsx (Home page)

**Files:**
- Modify: `app/routes/index.tsx`
- Delete: `app/routes/index.module.css`

- [ ] **Step 1: Replace `app/routes/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { MissionCard } from '../components/MissionCard'
import { ProjectRow } from '../components/ProjectRow'
import { SectionHead } from '../components/SectionHead'
import { featuredProject, selectedWork, experiments } from '../content/projects'
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
      {featuredProject && <MissionCard project={featuredProject} />}

      <SectionHead label="SELECTED WORK" />
      {selectedWork.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <Gap />

      <SectionHead label="EXPERIMENTS &amp; SIDE PROJECTS" />
      {experiments.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <Footer>
        <FooterText>© {new Date().getFullYear()} DOUG MARCH</FooterText>
        <FooterLink href="mailto:doug@doug-march.com">GET IN TOUCH →</FooterLink>
      </Footer>
    </Layout>
  )
}
```

- [ ] **Step 2: Delete `app/routes/index.module.css`**

```bash
rm app/routes/index.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/routes/index.tsx app/routes/index.module.css
git commit -m "feat: migrate Home page to PandaCSS styled()"
```

---

### Task 9: Migrate about.tsx

**Files:**
- Modify: `app/routes/about.tsx`
- Delete: `app/routes/about.module.css`

- [ ] **Step 1: Replace `app/routes/about.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { timeline, capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/about')({
  component: About,
})

const Intro = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '10',
  },
})

const IntroLabel = styled('div', {
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

const IntroText = styled('p', {
  base: {
    fontSize: '0.75rem',
    color: 'text.mid',
    lineHeight: '2',
    fontStyle: 'italic',
    maxWidth: '560px',
    '& strong': { color: 'text', fontStyle: 'normal' },
  },
})

const TlItem = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '80px 1px 1fr',
    gap: '0 6',
  },
})

const TlYear = styled('div', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    paddingTop: '4',
    paddingBottom: '4',
    textAlign: 'right',
  },
})

const TlLineWrap = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const TlDot = styled('div', {
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

const TlRule = styled('div', {
  base: {
    flex: '1',
    width: '1px',
    background: 'logo.blueDim',
  },
})

const TlContent = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const TlRole = styled('div', {
  base: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    marginBottom: '0.2rem',
  },
})

const TlCompany = styled('div', {
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

const TlDesc = styled('div', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    lineHeight: '1.7',
    fontStyle: 'italic',
  },
})

const SkillsGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2',
    marginTop: '10',
  },
})

const Skill = styled('div', {
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

function About() {
  return (
    <Layout>
      <Intro>
        <IntroLabel>ABOUT</IntroLabel>
        <IntroText>
          I'm a <strong>designer and developer</strong> who builds products from first
          principles — from idea through design, engineering, and launch. Currently
          focused on <strong>Spaceman</strong>, building tools for aerospace teams.
          <br /><br />
          I care about craft, clarity, and products that actually get used.
        </IntroText>
      </Intro>

      <SectionHead label="BACKGROUND" />

      <div>
        {timeline.map((entry) => (
          <TlItem key={entry.year}>
            <TlYear>{entry.year}</TlYear>
            <TlLineWrap>
              <TlDot current={entry.current ? true : undefined} />
              <TlRule />
            </TlLineWrap>
            <TlContent>
              <TlRole>{entry.role}</TlRole>
              <TlCompany current={entry.current ? true : undefined}>{entry.company}</TlCompany>
              <TlDesc>{entry.description}</TlDesc>
            </TlContent>
          </TlItem>
        ))}
      </div>

      <SectionHead label="CAPABILITIES" />
      <SkillsGrid>
        {capabilities.map((skill) => (
          <Skill key={skill}>{skill}</Skill>
        ))}
      </SkillsGrid>
    </Layout>
  )
}
```

- [ ] **Step 2: Delete `app/routes/about.module.css`**

```bash
rm app/routes/about.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/routes/about.tsx app/routes/about.module.css
git commit -m "feat: migrate About page to PandaCSS styled()"
```

---

### Task 10: Migrate work.$slug.tsx

**Files:**
- Modify: `app/routes/work.$slug.tsx`
- Delete: `app/routes/work.$slug.module.css`

- [ ] **Step 1: Replace `app/routes/work.$slug.tsx`**

```tsx
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { projects } from '../content/projects'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

const BackLink = styled(Link, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wide',
    marginBottom: '8',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

const Header = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '8',
  },
})

const TypeLabel = styled('div', {
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

const Title = styled('div', {
  base: {
    fontSize: '2xl',
    fontWeight: 'bold',
    letterSpacing: '-0.04em',
    color: 'accent',
    textShadow: '0 0 24px rgba(0, 229, 255, 0.2)',
    lineHeight: 'tight',
    marginBottom: '3',
  },
})

const Meta = styled('div', {
  base: {
    display: 'flex',
    gap: '6',
    flexWrap: 'wrap',
  },
})

const MetaItem = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
})

const MetaLabel = styled('div', {
  base: { fontSize: '2xs', letterSpacing: 'wider', color: 'text.dim' },
})

const MetaValue = styled('div', {
  base: { fontSize: '0.65rem', fontWeight: 'bold', color: 'text.mid' },
})

const Section = styled('div', {
  base: { marginBottom: '8' },
})

const SectionTitle = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent.dim',
    marginBottom: '0.6rem',
  },
})

const Body = styled('div', {
  base: {
    fontSize: '0.72rem',
    color: 'text.mid',
    lineHeight: '1.9',
    fontStyle: 'italic',
  },
})

const Tags = styled('div', {
  base: {
    display: 'flex',
    gap: '2',
    flexWrap: 'wrap',
    marginTop: '3',
  },
})

const Tag = styled('div', {
  base: {
    fontSize: '0.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    paddingLeft: '2',
    paddingRight: '2',
  },
})

const Ctas = styled('div', {
  base: { display: 'flex', gap: '3', marginTop: '8' },
})

const BtnGreen = styled('a', {
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
    _hover: { background: 'logo.greenDim', gap: '0.75rem' },
  },
})

const BtnGhost = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontSize: '0.62rem',
    fontWeight: 'bold',
    color: 'text.mid',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.mid',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.85rem',
    paddingRight: '0.85rem',
    transitionProperty: 'color, border-color, gap',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', borderColor: 'accent.dim', gap: '0.75rem' },
  },
})

// Lightweight project card
const LightCard = styled('div', {
  base: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    background: 'bg.card',
    paddingTop: '1.75rem',
    paddingBottom: '1.75rem',
    paddingLeft: '8',
    paddingRight: '8',
    marginBottom: '10',
    position: 'relative',
    _before: {
      content: 'attr(data-label)',
      position: 'absolute',
      top: '-0.55rem',
      left: '6',
      background: 'bg',
      paddingLeft: '2',
      paddingRight: '2',
      fontSize: 'xs',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      color: 'text.dim',
    },
  },
})

const LightTitle = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'bold',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '2',
  },
})

const LightDesc = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.mid',
    lineHeight: '1.85',
    fontStyle: 'italic',
    marginBottom: '5',
  },
})

const QuickFacts = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    marginBottom: '8',
  },
})

const Fact = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '0.85rem',
    paddingLeft: '4',
    paddingRight: '4',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'logo.blueDim',
    '&:last-child': { borderRightWidth: '0' },
  },
})

const FactLabel = styled('div', {
  base: { fontSize: '2xs', letterSpacing: 'wider', color: 'text.dim', marginBottom: '0.3rem' },
})

const FactValue = styled('div', {
  base: { fontSize: '0.72rem', fontWeight: 'bold', color: 'text.mid' },
})

function ProjectPage() {
  const project = Route.useLoaderData()

  if (project.depth === 'lightweight') {
    return (
      <Layout>
        <BackLink to="/">← BACK TO WORK</BackLink>
        <LightCard data-label={project.type.toUpperCase()}>
          <LightTitle>{project.title}</LightTitle>
          <LightDesc>{project.description}</LightDesc>
          {project.externalUrl && (
            <BtnGreen href={project.externalUrl} target="_blank" rel="noopener noreferrer">
              VIEW PROJECT ↗
            </BtnGreen>
          )}
        </LightCard>
        <SectionHead label="QUICK FACTS" />
        <QuickFacts>
          <Fact><FactLabel>TYPE</FactLabel><FactValue>{project.type}</FactValue></Fact>
          <Fact><FactLabel>YEAR</FactLabel><FactValue>{project.year}</FactValue></Fact>
          <Fact><FactLabel>STATUS</FactLabel><FactValue>{project.status ?? 'Complete'}</FactValue></Fact>
        </QuickFacts>
        {project.stack && (
          <>
            <SectionHead label="STACK" />
            <Tags style={{ marginTop: '0.5rem' }}>
              {project.stack.map((s) => <Tag key={s}>{s.toUpperCase()}</Tag>)}
            </Tags>
          </>
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <BackLink to="/">← BACK TO WORK</BackLink>
      <Header>
        <TypeLabel>{project.type} · {project.year}</TypeLabel>
        <Title>{project.title}</Title>
        <Meta>
          {project.role && (
            <MetaItem><MetaLabel>ROLE</MetaLabel><MetaValue>{project.role}</MetaValue></MetaItem>
          )}
          {project.timeline && (
            <MetaItem><MetaLabel>TIMELINE</MetaLabel><MetaValue>{project.timeline}</MetaValue></MetaItem>
          )}
          {project.status && (
            <MetaItem><MetaLabel>STATUS</MetaLabel><MetaValue>{project.status}</MetaValue></MetaItem>
          )}
        </Meta>
      </Header>

      {project.problem && (
        <Section><SectionTitle>// PROBLEM</SectionTitle><Body>{project.problem}</Body></Section>
      )}
      {project.approach && (
        <Section><SectionTitle>// APPROACH</SectionTitle><Body>{project.approach}</Body></Section>
      )}
      {project.outcome && (
        <Section><SectionTitle>// OUTCOME</SectionTitle><Body>{project.outcome}</Body></Section>
      )}
      {project.stack && (
        <Section>
          <SectionTitle>// STACK</SectionTitle>
          <Tags>{project.stack.map((s) => <Tag key={s}>{s.toUpperCase()}</Tag>)}</Tags>
        </Section>
      )}

      <Ctas>
        {project.liveUrl && (
          <BtnGreen href={project.liveUrl} target="_blank" rel="noopener noreferrer">VIEW LIVE SITE →</BtnGreen>
        )}
        {project.githubUrl && (
          <BtnGhost href={project.githubUrl} target="_blank" rel="noopener noreferrer">VIEW ON GITHUB ↗</BtnGhost>
        )}
      </Ctas>
    </Layout>
  )
}
```

- [ ] **Step 2: Delete `app/routes/work.$slug.module.css`**

```bash
rm app/routes/work.$slug.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/routes/work.$slug.tsx app/routes/work.$slug.module.css
git commit -m "feat: migrate work detail page to PandaCSS styled()"
```

---

## Chunk 5: Root Route + Final Cleanup

### Task 11: Update __root.tsx — theme init script + NotFound styles + CSS import

**Files:**
- Modify: `app/routes/__root.tsx`
- Delete: `app/routes/not-found.module.css`

- [ ] **Step 1: Replace `app/routes/__root.tsx`**

Key changes:
1. Import `app/styles/panda.css` (PandaCSS generated styles) alongside `global.css`
2. Add theme-init inline `<script>` to `head()` to prevent flash of wrong theme
3. Replace CSS Module `not-found.module.css` import with inline `styled()` components

> **Implementer note:** TanStack Router's `head()` API accepts a `scripts` array. Verify the exact inline script shape for your installed version. If `{ children: '...' }` does not work, use the fallback approach: render a `<script dangerouslySetInnerHTML={{ __html: '...' }}>` element in `RootComponent` before `<HeadContent />`.

```tsx
import '../styles/global.css'
import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

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
    scripts: [
      { children: THEME_INIT_SCRIPT },
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

// NotFound styled components — inline here since they're only used in this file
const Wrap = styled('div', {
  base: { paddingTop: '12' },
})

const Code = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '6',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: { content: '"//"', color: 'text.dim' },
  },
})

const Heading = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'bold',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '3',
  },
})

const Message = styled('p', {
  base: {
    fontSize: 'base',
    color: 'text.dim',
    fontStyle: 'italic',
    lineHeight: 'normal',
    marginBottom: '8',
  },
})

const BackLink = styled(Link, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wide',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

function NotFound() {
  return (
    <Layout>
      <Wrap>
        <Code>404</Code>
        <Heading>NOT FOUND</Heading>
        <Message>The page you're looking for doesn't exist or has been moved.</Message>
        <BackLink to="/">← BACK TO WORK</BackLink>
      </Wrap>
    </Layout>
  )
}
```

- [ ] **Step 2: Delete `app/routes/not-found.module.css`**

```bash
rm app/routes/not-found.module.css
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/routes/__root.tsx app/routes/not-found.module.css
git commit -m "feat: update root route with theme init script and PandaCSS NotFound"
```

---

### Task 12: Strip global.css to resets only

**Files:**
- Modify: `app/styles/global.css`

- [ ] **Step 1: Replace `app/styles/global.css` with resets only**

All CSS custom properties (`--bg`, `--text`, etc.) are now in the PandaCSS token system. Remove them. Keep only the raw resets that don't belong in PandaCSS.

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 18px; }

body {
  font-family: 'Space Mono', monospace;
  background: var(--colors-bg);
  color: var(--colors-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: inherit; text-decoration: none; }
```

Note: `body` now uses PandaCSS CSS variables (`var(--colors-bg)`, `var(--colors-text)`) which are generated by PandaCSS from the semantic tokens. These resolve to the correct dark/light values automatically.

- [ ] **Step 2: Verify no .module.css files remain**

```bash
find app -name "*.module.css" | sort
```

Expected: no output (empty). If any files remain, they were missed — delete them and update the corresponding `.tsx` file.

- [ ] **Step 3: Start dev server and do a full visual check**

```bash
pnpm dev
```

Check all routes:
- `http://localhost:3000` — Home: mission card, project rows, footer
- `http://localhost:3000/about` — About: timeline, capabilities grid
- `http://localhost:3000/work/spaceman` — Project detail page
- `http://localhost:3000/does-not-exist` — 404 page
- Resize below 768px on all pages — mobile layout active

Kill dev server when done.

- [ ] **Step 4: Verify build succeeds**

```bash
pnpm build
```

Expected: no errors. `dist/` produced.

- [ ] **Step 5: Commit**

```bash
git add app/styles/global.css
git commit -m "feat: strip global.css to resets, complete PandaCSS migration"
```
