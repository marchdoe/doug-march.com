import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: '0 4vw',
  borderBottom: '1px solid',
  borderColor: 'border',
  background: 'bg',
  position: 'sticky',
  top: 0,
  zIndex: 100,
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const wordmark = css({
  fontFamily: 'display',
  fontSize: '18px',
  letterSpacing: '0.1em',
  color: 'text',
  textDecoration: 'none',
  lineHeight: '1',
  _hover: { color: 'accent' },
})

const rightGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 4px',
  transition: 'color 0.15s ease',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <nav className={navWrap}>
      <div className={leftGroup}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="" className={logoStyle} />
        </a>
        <a href="/" className={wordmark}>DOUG MARCH</a>
      </div>
      <div className={rightGroup}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}