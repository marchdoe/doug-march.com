import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  borderBottom: '3px solid',
  borderColor: 'accent',
  padding: '0',
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(22px, 2.5vw, 32px)',
  letterSpacing: '-0.02em',
  color: 'text',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  height: '28px',
  width: 'auto',
})

const navStyle = css({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '4px 0',
  borderBottom: '2px solid transparent',
  transition: 'border-color 0.15s, color 0.15s',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: {
    color: 'accentDeep',
    borderBottomColor: 'accent',
  },
})

const taglineStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontStyle: 'italic',
  color: 'textMuted',
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
})

const datelineStyle = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  flexWrap: 'nowrap',
})

const dateSepStyle = css({
  color: 'border',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <header>
      <nav className={mastheadStyle} aria-label="Main navigation">
        <a href="/" className={nameStyle}>
          <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
          <span>DOUG MARCH</span>
        </a>
        <span className={taglineStyle}>Product Designer &amp; Developer</span>
        <div className={navStyle}>
          <a href="/about" className={navLinkStyle}>About</a>
          <a href="/" className={navLinkStyle}>Work</a>
        </div>
      </nav>
      <div className={datelineStyle}>
        <span>Tuesday, June 16, 2026</span>
        <span className={dateSepStyle}>·</span>
        <span>☽ New Cycle Day 2 · 4.4% Lit</span>
        <span className={dateSepStyle}>·</span>
        <span>☀ 04:48 → 19:32 · 14.7 Hrs</span>
        <span className={dateSepStyle}>·</span>
        <span>Juneteenth in 3 Days</span>
      </div>
    </header>
  )
}