import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

const mastheadStyle = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  padding: '14px 5vw',
  background: 'bgMasthead',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  flexWrap: 'wrap',
  gap: '8px',
})

const nameplateStyle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'clamp(14px, 1.6vw, 22px)',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'text',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const dateStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(10px, 0.8vw, 12px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  display: { base: 'none', md: 'block' },
})

const navStyle = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '20px',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(11px, 0.8vw, 13px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '12px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 0.15s ease',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <header className={mastheadStyle}>
      <a href="/" className={nameplateStyle}>
        <img src={logoSvg} alt="Doug March logo" style={{ width: '28px', height: '28px' }} />
        <span>Doug March</span>
      </a>
      <span className={dateStyle}>Wed 24 June 2026</span>
      <nav className={navStyle}>
        <a href="/" className={navLinkStyle}>Work</a>
        <a href="/about" className={navLinkStyle}>About</a>
      </nav>
    </header>
  )
}