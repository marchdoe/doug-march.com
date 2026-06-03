import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroSection = css({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
})

const heroInner = css({
  position: 'relative',
  width: '100%',
  padding: '0 5vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  minHeight: '60vh',
  justifyContent: 'center',
})

const line1 = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 11.5vw, 166px)',
  fontWeight: 'bold',
  lineHeight: 'tight',
  letterSpacing: '-0.02em',
  color: 'text',
  textAlign: 'left',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'nowrap',
})

const line2 = css({
  fontFamily: 'display',
  fontSize: 'clamp(60px, 15vw, 216px)',
  fontWeight: 'bold',
  lineHeight: 'tight',
  letterSpacing: '-0.02em',
  color: 'text',
  textAlign: 'right',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'nowrap',
})

const signalBar = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  minHeight: '64px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 5vw',
  borderTop: '1px solid',
  borderColor: 'border',
  gap: '8px',
  flexWrap: 'wrap',
})

const signalItem = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  whiteSpace: 'nowrap',
  lineHeight: '1.5',
})

const signalAccent = css({
  fontFamily: 'display',
  fontSize: '11px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'accentLight',
  whiteSpace: 'nowrap',
  lineHeight: '1.5',
})

const signalSep = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  userSelect: 'none',
})

const footerStrip = css({
  padding: '24px 5vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid',
  borderColor: 'border',
  flexWrap: 'wrap',
  gap: '12px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

function HomePage() {
  return (
    <>
      <section className={heroSection} aria-label="Hero">
        <div className={heroInner}>
          <h1>
            <span className={line1}>Concentrate</span>
            <span className={line2}>The Mind</span>
          </h1>
        </div>

        <div className={signalBar} aria-label="Daily signals">
          <span className={signalAccent}>Tigers 8–0</span>
          <span className={signalSep} aria-hidden="true">·</span>
          <span className={signalItem}>◑ 84.9%</span>
          <span className={signalSep} aria-hidden="true">·</span>
          <span className={signalItem}>Memorial TBD</span>
          <span className={signalSep} aria-hidden="true">·</span>
          <span className={signalItem}>14.6 Hrs Daylight</span>
          <span className={signalSep} aria-hidden="true">·</span>
          <span className={signalItem}>3 Jun 2026</span>
          <span className={signalSep} aria-hidden="true">·</span>
          <span className={signalItem}>— Buddha</span>
        </div>
      </section>

      <footer className={footerStrip}>
        <span className={footerText}>Doug March — Product Designer &amp; Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}