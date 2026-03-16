import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { FeaturedProject } from '../components/FeaturedProject'
import { SelectedWork } from '../components/SelectedWork'
import { Experiments } from '../components/Experiments'
import { SectionHead } from '../components/SectionHead'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({ component: Home })

// Signal strip — four cells, four frequencies
const Strip = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
    marginBottom: '8',
    _mobile: { gridTemplateColumns: 'repeat(2, 1fr)' },
  },
})

const Cell = styled('div', {
  base: {
    paddingTop: '3',
    paddingBottom: '3',
    paddingLeft: '4',
    paddingRight: '4',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'border',
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  },
  variants: {
    last: { true: { borderRightWidth: '0' } },
    tint: {
      green: { background: 'accent.glow' },
      amber: { background: 'signal.winDim' },
    },
  },
})

const CellLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'ruled',
    color: 'text.dim',
    opacity: '0.55',
  },
})

const CellValue = styled('div', {
  base: {
    fontSize: 'xs',
    fontFamily: 'mono',
    color: 'text',
    lineHeight: 'snug',
    fontWeight: 'medium',
  },
  variants: {
    tone: {
      green: { color: 'accent' },
      amber: { color: 'signal.win' },
      dim:   { color: 'text.dim', opacity: '0.45' },
    },
  },
})

const CellNote = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.4',
    letterSpacing: 'wide',
  },
})

const Spacer = styled('div', { base: { marginTop: '8' } })

const Footer = styled('div', {
  base: {
    marginTop: '10',
    paddingTop: '6',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
    display: 'flex',
    justifyContent: 'flex-start',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'accent',
    letterSpacing: 'widest',
    opacity: '0.5',
    transitionProperty: 'opacity',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { opacity: '1' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'accent',
      outlineOffset: '3px',
      opacity: '1',
    },
  },
})

function Home() {
  return (
    <Layout>
      {/* Signal strip — four readings, monday morning */}
      <Strip>
        <Cell tint="green">
          <CellLabel>TOMORROW</CellLabel>
          <CellValue tone="green">St. Patrick's Day</CellValue>
          <CellNote>🍀 the eve of it</CellNote>
        </Cell>
        <Cell tint="amber">
          <CellLabel>THE PLAYERS</CellLabel>
          <CellValue tone="amber">Cameron Young</CellValue>
          <CellNote>−13 · first win · Sawgrass</CellNote>
        </Cell>
        <Cell>
          <CellLabel>MARKET</CellLabel>
          <CellValue tone="dim">SPY −0.57%</CellValue>
          <CellNote>monday drag</CellNote>
        </Cell>
        <Cell last={true}>
          <CellLabel>TONIGHT</CellLabel>
          <CellValue tone="dim">New Moon</CellValue>
          <CellNote>1.8% illuminated</CellNote>
        </Cell>
      </Strip>

      <FeaturedProject />

      <SectionHead label="SELECTED WORK" />
      <SelectedWork />

      <Spacer />

      <SectionHead label="EXPERIMENTS" />
      <Experiments />

      <Footer>
        <FooterLink href="mailto:doug@doug-march.com">GET IN TOUCH →</FooterLink>
      </Footer>
    </Layout>
  )
}
