import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '0 24px',
  padding: '0 6vw',
  height: '56px',
  alignItems: 'center',
  borderBottom: '2px solid',
  borderColor: 'accent',
  position: 'relative',
  zIndex: 10,
})

const logoZone = css({
  gridColumn: '1 / 5',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImg = css({
  height: '28px',
  width: '28px',
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '14px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'text',
})

const dateZone = css({
  gridColumn: '5 / 9',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  '@media (max-width: 767px)': {
    display: 'none',
  },
})

const navZone = css({
  gridColumn: '9 / 13',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '24px',
  '@media (max-width: 767px)': {
    gridColumn: '7 / 13',
    gap: '16px',
  },
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s',
  padding: '12px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const mobileStyle = css({
  '@media (max-width: 767px)': {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '0 12px',
    padding: '0 16px',
    height: '52px',
  },
})

export function Sidebar() {
  return (
    <header className={`${mastheadStyle} ${mobileStyle}`}>
      <div className={logoZone}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={nameStyle}>Doug March</span>
      </div>
      <div className={dateZone}>
        May 14, 2026 · Thursday · Issue No. 134
      </div>
      <nav className={navZone} aria-label="Main navigation">
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </nav>
    </header>
  )
}