import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 6vw',
        zIndex: '100',
        pointerEvents: 'none',
      })}
    >
      <a
        href="/"
        className={css({
          pointerEvents: 'auto',
          display: 'block',
          opacity: '0.6',
          transition: 'opacity 0.15s ease',
          _hover: { opacity: '1' },
        })}
        aria-label="Doug March home"
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ height: '28px', width: 'auto' })}
        />
      </a>
      <div
        className={css({
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          pointerEvents: 'auto',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}