import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const pageWrap = css({
  display: 'grid',
  gridTemplateRows: '1fr 48px',
  minHeight: '100vh',
  maxWidth: 'none',
})

const heroZone = css({
  display: 'grid',
  placeItems: 'center',
  padding: '80px 6vw 0',
  minHeight: 'calc(100dvh - 48px)',
})

const quoteBlock = css({
  textAlign: 'center',
  maxWidth: '1400px',
  width: '100%',
})

const heroText = css({
  fontFamily: 'display',
  fontSize: 'clamp(3rem, 7.2vw, 6.75rem)',
  lineHeight: 'tight',
  letterSpacing: 'snug',
  color: 'accent',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  margin: '0',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '28px',
  lineHeight: 'snug',
})

const signalStrip = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  padding: '0 6vw',
  height: '48px',
  borderTop: '1px solid {colors.stone.700}',
  background: '{colors.stone.900}',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

const signalItem = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  color: '{colors.stone.300}',
  flexShrink: '0',
  fontVariantNumeric: 'tabular-nums',
})

const signalHighlight = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  color: 'accent',
  flexShrink: '0',
})

const signalMuted = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: '{colors.stone.500}',
  flexShrink: '0',
})

const signalScore = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  color: '{colors.stone.400}',
  flexShrink: '0',
  fontVariantNumeric: 'tabular-nums',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: '{colors.stone.500}',
  textDecoration: 'none',
  flexShrink: '0',
  marginLeft: 'auto',
  padding: '12px 0',
  _hover: {
    color: '{colors.amber.300}',
  },
  _focus: {
    outline: '2px solid {colors.amber.400}',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <div className={pageWrap}>
      <div className={heroZone}>
        <div className={quoteBlock}>
          <h1 className={heroText}>
            Art is the signature<br />of civilizations.
          </h1>
          <p className={attribution}>— Beverly Sills</p>
        </div>
      </div>
      <div className={signalStrip} role="contentinfo" aria-label="Daily signals">
        <span className={signalHighlight}>✿ Mother's Day</span>
        <span className={signalItem}>Truist · Fitzpatrick <span style={{ color: '#F2A82A' }}>−14</span></span>
        <span className={signalScore}>DET 109–116</span>
        <span className={signalScore}>DET 1–5</span>
        <span className={signalMuted}>Wet Leg · GBV</span>
        <span className={signalScore}>🌘 31%</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </div>
    </div>
  )
}