import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 6vw',
      height: '48px',
    })}>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
        <a href="/" className={css({ display: 'flex', alignItems: 'center', gap: '3', textDecoration: 'none' })}>
          <img src={logoSvg} alt="Doug March logo" className={css({ width: '20px', height: '20px' })} />
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'textSecondary',
          })}>DOUG MARCH</span>
        </a>
      </div>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '6' })}>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textSecondary',
          textDecoration: 'none',
          padding: '2',
          _hover: { color: 'accentLight' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Work</a>
        <a href="/about" className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textSecondary',
          textDecoration: 'none',
          padding: '2',
          _hover: { color: 'accentLight' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>About</a>
      </div>
    </nav>
  )
}