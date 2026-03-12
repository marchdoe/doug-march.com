import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/elements')({
  component: Elements,
})

// ── Shared layout primitives ──────────────────────────────────────────────────

const Section = styled('div', {
  base: { marginBottom: '12' },
})

const SubHead = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '6',
    marginTop: '8',
  },
})

const Label = styled('div', {
  base: {
    fontSize: '0.55rem',
    color: 'text.dim',
    letterSpacing: 'wide',
    marginTop: '2',
  },
})

// ── Color swatches ────────────────────────────────────────────────────────────

const SwatchGrid = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3',
    marginBottom: '6',
  },
})

const SwatchItem = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '1' },
})

const SwatchBlock = styled('div', {
  base: {
    width: '44px',
    height: '44px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border',
  },
})

const SwatchLabel = styled('div', {
  base: {
    fontSize: '0.48rem',
    color: 'text.dim',
    letterSpacing: 'wide',
    maxWidth: '44px',
    lineHeight: 'snug',
  },
})

const semanticColors: { name: string; cssVar: string }[] = [
  { name: 'bg',          cssVar: 'var(--colors-bg)'          },
  { name: 'bg.side',     cssVar: 'var(--colors-bg-side)'     },
  { name: 'bg.card',     cssVar: 'var(--colors-bg-card)'     },
  { name: 'text',        cssVar: 'var(--colors-text)'        },
  { name: 'text.mid',    cssVar: 'var(--colors-text-mid)'    },
  { name: 'text.dim',    cssVar: 'var(--colors-text-dim)'    },
  { name: 'accent',      cssVar: 'var(--colors-accent)'      },
  { name: 'accent.dim',  cssVar: 'var(--colors-accent-dim)'  },
  { name: 'border',      cssVar: 'var(--colors-border)'      },
  { name: 'border.mid',  cssVar: 'var(--colors-border-mid)'  },
  { name: 'logo.blue',   cssVar: 'var(--colors-logo-blue)'   },
  { name: 'logo.green',  cssVar: 'var(--colors-logo-green)'  },
]

const primitiveColors: { scale: string; steps: { key: string; hex: string }[] }[] = [
  { scale: 'ink',  steps: [
    { key: '50',  hex: '#F2F7FC' }, { key: '100', hex: '#E8EFF8' },
    { key: '200', hex: '#C4D4E8' }, { key: '300', hex: '#A8BECE' },
    { key: '400', hex: '#5A7A95' }, { key: '500', hex: '#3E6882' },
    { key: '600', hex: '#2D5070' }, { key: '700', hex: '#7AADC4' },
    { key: '800', hex: '#D4E8F8' }, { key: '900', hex: '#0D1F30' },
  ]},
  { scale: 'void', steps: [
    { key: '100', hex: '#070F1E' }, { key: '200', hex: '#040913' },
    { key: '300', hex: '#050C18' }, { key: '400', hex: '#0A1828' },
    { key: '500', hex: '#0D2040' },
  ]},
  { scale: 'cyan', steps: [
    { key: '400', hex: '#006E96' }, { key: '500', hex: '#2090A8' },
    { key: '600', hex: '#00E5FF' },
  ]},
  { scale: 'green', steps: [
    { key: '400', hex: '#4AAE3A' }, { key: '500', hex: '#5CBE4A' },
  ]},
  { scale: 'blue', steps: [
    { key: '400', hex: '#3A7FC4' }, { key: '500', hex: '#4A8FD4' },
  ]},
]

function Elements() {
  return (
    <Layout>
      {/* ── TOKENS ── */}
      <Section>
        <SectionHead label="TOKENS" />

        <SubHead>COLORS — SEMANTIC</SubHead>
        <SwatchGrid>
          {semanticColors.map(({ name, cssVar }) => (
            <SwatchItem key={name}>
              <SwatchBlock style={{ background: cssVar }} />
              <SwatchLabel>{name}</SwatchLabel>
            </SwatchItem>
          ))}
        </SwatchGrid>

        <SubHead>COLORS — PRIMITIVE</SubHead>
        {primitiveColors.map(({ scale, steps }) => (
          <div key={scale} style={{ marginBottom: '1rem' }}>
            <Label>{scale}</Label>
            <SwatchGrid style={{ marginBottom: 0 }}>
              {steps.map(({ key, hex }) => (
                <SwatchItem key={key}>
                  <SwatchBlock style={{ background: hex }} />
                  <SwatchLabel>{scale}.{key}</SwatchLabel>
                  <SwatchLabel>{hex}</SwatchLabel>
                </SwatchItem>
              ))}
            </SwatchGrid>
          </div>
        ))}
      </Section>
    </Layout>
  )
}
