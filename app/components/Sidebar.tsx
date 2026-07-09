import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5vw',
  zIndex: '10',
})

const leftZone = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const nameLink = css({
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const rightZone = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontSize: '0.75rem',
  fontWeight: 'normal',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={leftZone}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="" className={logoImg} />
        </a>
        <a href="/" className={nameLink}>Doug March</a>
      </div>
      <div className={rightZone}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}