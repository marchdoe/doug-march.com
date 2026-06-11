import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const heroZone = css({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: '1fr',
  alignContent: 'center',
  paddingLeft: '4vw',
  paddingRight: '4vw',
  paddingBottom: '56px',
})

const heroBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  lineHeight: '0.85',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: 'display',
  fontWeight: '400',
  color: 'text',
  userSelect: 'none',
})

const lineSmall = css({
  fontSize: 'clamp(48px, 10.5vw, 148px)',
  lineHeight: '0.85',
  display: 'block',
})

const lineLarge = css({
  fontSize: 'clamp(96px, 22.5vw, 320px)',
  lineHeight: '0.85',
  display: 'block',
  color: 'accent',
})

const subtext = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  color: 'textMuted',
  marginTop: '48px',
  paddingLeft: '2px',
})

function HomePage() {
  return (
    <main className={heroZone}>
      <div className={heroBlock}>
        <span className={lineSmall}>It was</span>
        <span className={lineLarge}>Already</span>
        <span className={lineSmall}>In there.</span>
        <p className={subtext}>Doug March — Product Designer &amp; Developer</p>
      </div>
    </main>
  )
}