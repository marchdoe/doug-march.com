import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '28px 6vw',
  zIndex: '10',
})

const logoLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: '{colors.stone.400}',
  opacity: '0.35',
  _hover: {
    opacity: '1',
    color: '{colors.amber.300}',
  },
  _focus: {
    opacity: '1',
    outline: '2px solid {colors.amber.400}',
    outlineOffset: '4px',
  },
})

const logoImg = css({
  width: '20px',
  height: '20px',
})

const nameText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 'medium',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 'medium',
  color: '{colors.stone.400}',
  opacity: '0.35',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: {
    opacity: '1',
    color: '{colors.amber.300}',
  },
  _focus: {
    opacity: '1',
    outline: '2px solid {colors.amber.400}',
    outlineOffset: '4px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap}>
      <a href="/" className={logoLink}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={nameText}>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}