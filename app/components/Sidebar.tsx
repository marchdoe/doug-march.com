import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: '0 40px',
  borderBottom: '1px solid',
  borderColor: 'border',
  width: '100%',
  '@media (max-width: 767px)': {
    padding: '0 20px',
    height: '48px',
  },
})

const wordmark = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const dmText = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'bold',
  letterSpacing: '0.08em',
  color: 'text',
  textTransform: 'uppercase',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  '@media (max-width: 480px)': {
    gap: '16px',
  },
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  padding: '10px 0',
  _hover: {
    color: 'accent',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={wordmark}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={dmText}>DM</span>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
        <a href="https://github.com" className={navLink}>Github</a>
      </div>
    </nav>
  )
}