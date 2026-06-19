import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroZoneStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '96px 6vw 48px',
  minHeight: '100vh',
  maxWidth: 'none',
  position: 'relative',
  overflow: 'hidden',
})

const eyebrowStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(0.875rem, 1.75vw, 1.5rem)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '{colors.gold.400}',
  fontWeight: '600',
  lineHeight: '1.15',
  marginBottom: '16px',
})

const goldRuleStyle = css({
  width: '100%',
  height: '1px',
  background: '{colors.gold.400}',
  border: 'none',
  marginBottom: '32px',
})

const heroLineStyle = css({
  fontFamily: 'heading',
  fontSize: 'clamp(3.5rem, 18vw, 16rem)',
  fontWeight: '800',
  letterSpacing: '-0.01em',
  lineHeight: '0.88',
  color: '{colors.indigo.900}',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'nowrap',
})

const heroLine2Style = css({
  fontFamily: 'heading',
  fontSize: 'clamp(3.5rem, 18vw, 16rem)',
  fontWeight: '800',
  letterSpacing: '-0.01em',
  lineHeight: '0.88',
  color: '{colors.indigo.900}',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
  textWrap: 'nowrap',
  marginTop: 'clamp(8px, 2vw, 24px)',
})

const signalFooterStyle = css({
  position: 'fixed',
  bottom: '0',
  left: '0',
  padding: '24px 6vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  zIndex: 50,
  '@media (max-width: 640px)': {
    padding: '16px 6vw',
  },
})

const signalLineStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
  letterSpacing: '0.01em',
  lineHeight: '1.5',
  color: '{colors.parchment.600}',
})

const signalLineAccentStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
  letterSpacing: '0.01em',
  lineHeight: '1.5',
  color: '{colors.indigo.700}',
})

const dateStampStyle = css({
  position: 'fixed',
  bottom: '0',
  right: '0',
  padding: '24px 6vw',
  fontFamily: 'heading',
  fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.parchment.400}',
  zIndex: 50,
  '@media (max-width: 640px)': {
    padding: '16px 6vw',
  },
})

const archiveLinkStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
  letterSpacing: '0.01em',
  lineHeight: '1.5',
  color: '{colors.parchment.600}',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
    color: '{colors.parchment.700}',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <>
      <main className={heroZoneStyle}>
        <p className={eyebrowStyle} aria-label="June 19, 1865">
          June 19, 1865
        </p>
        <hr className={goldRuleStyle} aria-hidden="true" />
        <h1>
          <span className={heroLineStyle}>The Word</span>
          <span className={heroLine2Style}>Arrived.</span>
        </h1>
      </main>

      <footer className={signalFooterStyle} aria-label="Daily signals">
        <span className={signalLineStyle}>☽ Waxing crescent · 25%</span>
        <span className={signalLineAccentStyle}>
          Wet Leg · My Morning Jacket · Guided by Voices
        </span>
        <span className={signalLineStyle}>Father's Day Sunday</span>
        <span className={signalLineStyle}>HN: Project Valhalla lands in JDK 28</span>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>

      <div className={dateStampStyle} aria-label="Today's date">
        June 19, 2026
      </div>
    </>
  )
}