import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroZoneClass = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  gap: '0',
  position: 'relative',
  overflow: 'hidden',
})

const line1Class = css({
  fontFamily: 'display',
  fontWeight: '700',
  fontSize: 'clamp(44px, 7vw, 112px)',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'balance',
})

const line2Class = css({
  fontFamily: 'display',
  fontWeight: '700',
  fontSize: 'clamp(60px, 9.5vw, 148px)',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'balance',
})

const line3Class = css({
  fontFamily: 'display',
  fontWeight: '700',
  fontSize: 'clamp(88px, 14vw, 220px)',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
})

const periodClass = css({
  color: 'accent',
})

const signalStripClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
  padding: '0 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  height: '72px',
  overflowX: 'auto',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

const signalLabelClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
  flexShrink: 0,
})

const signalValueClass = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  flexShrink: 0,
})

const signalAccentClass = css({
  color: 'accent',
})

const attributionClass = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: 'textFaint',
  textTransform: 'uppercase',
  marginLeft: 'auto',
  flexShrink: 0,
})

const archiveFooterClass = css({
  position: 'absolute',
  bottom: '24px',
  right: '6vw',
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textDecoration: 'none',
  _hover: {
    color: 'text',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

function HomePage() {
  return (
    <>
      <main className={heroZoneClass} aria-label="Hero">
        <h1>
          <span className={line1Class}>We Can</span>
          <span className={line2Class}>Learn To</span>
          <span className={line3Class}>Surf<span className={periodClass}>.</span></span>
        </h1>
        <a href="/archive" className={archiveFooterClass}>Archive</a>
      </main>
      <footer className={signalStripClass} aria-label="Signals">
        <span className={signalLabelClass}>
          PGA <span className={signalValueClass}>Smalley <span className={signalAccentClass}>–6</span></span>
        </span>
        <span className={signalValueClass}>
          DET 1–2
        </span>
        <span className={signalLabelClass}>
          <span className={signalAccentClass}>●</span> New Moon
        </span>
        <span className={signalLabelClass}>
          Zerostack <span className={signalValueClass}>403↑</span>
        </span>
        <span className={attributionClass}>— Dan Millman</span>
      </footer>
    </>
  )
}