import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const pageStyle = css({
  display: 'grid',
  gridTemplateRows: '60px 1fr 48px',
  minHeight: '100vh',
  maxWidth: 'none',
  padding: '0',
})

const heroZone = css({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '8vw',
  paddingRight: '8vw',
})

const heroText = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(8rem, 18vw, 26rem)',
  lineHeight: '0.88',
  letterSpacing: '-0.01em',
  color: 'text',
  textTransform: 'uppercase',
  userSelect: 'none',
})

const signalStrip = css({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '8vw',
  paddingRight: '8vw',
  borderTop: '1px solid',
  borderColor: 'border',
  gap: '0',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': { display: 'none' },
})

const signalItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text.muted',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  lineHeight: '1.5',
  flexShrink: '0',
})

const signalDot = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text.muted',
  padding: '0 12px',
  flexShrink: '0',
  userSelect: 'none',
})

const musicItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  lineHeight: '1.5',
  flexShrink: '0',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'text.muted',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
    opacity: '1',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
  flexShrink: '0',
})

function HomePage() {
  return (
    <div className={pageStyle}>
      <div />

      <div className={heroZone}>
        <h1 className={heroText}>
          Less<br />
          is<br />
          more.
        </h1>
      </div>

      <div className={signalStrip}>
        <span className={signalItem}>DET 4 · CLE 10 — Tigers L</span>
        <span className={signalDot}>·</span>
        <span className={signalItem}>John Deere Classic: Glover −8 in progress</span>
        <span className={signalDot}>·</span>
        <span className={signalItem}>🌔 Moon 81%</span>
        <span className={signalDot}>·</span>
        <span className={signalItem}>Independence Day tomorrow</span>
        <span className={signalDot}>·</span>
        <span className={signalItem}>Virginia bans geolocation data</span>
        <span className={signalDot}>·</span>
        <span className={musicItem}>♫ War on Drugs · Radiohead · My Morning Jacket</span>
        <span className={signalDot}>·</span>
        <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'text.muted', fontStyle: 'italic', letterSpacing: '0.03em', flexShrink: '0' })}>"Less is more." — R. Browning</span>
        <span className={signalDot}>·</span>
        <a href="/archive" className={archiveLink}>Archive</a>
      </div>
    </div>
  )
}