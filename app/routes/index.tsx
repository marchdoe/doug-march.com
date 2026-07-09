import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroWrap = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '80px 5vw 48px',
  minHeight: 'calc(100vh - 48px)',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(2.8rem, 9vw, 11rem)',
  lineHeight: 'tight',
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  color: 'text',
  maxWidth: 'none',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accent',
  textAlign: 'right',
  marginTop: '40px',
})

const signalStrip = css({
  height: '48px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5vw',
  gap: '16px',
  overflow: 'hidden',
  flexWrap: 'nowrap',
})

const signalItem = css({
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.06em',
  color: 'text',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

const signalMuted = css({
  fontSize: '0.75rem',
  fontWeight: 'normal',
  letterSpacing: '0.06em',
  color: 'textMuted',
  whiteSpace: 'nowrap',
  flexShrink: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'none',

  '@media (min-width: 768px)': {
    display: 'block',
  },
})

const winDot = css({
  color: 'accent',
})

function HomePage() {
  return (
    <>
      <main className={heroWrap}>
        <h1 className={heroPhrase}>
          Do not be so open-minded that your brains fall out.
        </h1>
        <p className={attribution}>— Gilbert Keith Chesterton</p>
      </main>
      <footer className={signalStrip} aria-label="Daily signals">
        <span className={signalItem}>
          <span className={winDot}>●</span>{' '}Tigers · 6–1 ✓
        </span>
        <span className={signalMuted}>Wiesberger −6 · Scottish Open</span>
        <span className={signalMuted}>☽ 22% · Waning</span>
        <span className={signalMuted}>Wet Leg · The War on Drugs</span>
        <a href="/archive" className={signalMuted} style={{ textDecoration: 'none' }}>Archive</a>
      </footer>
    </>
  )
}