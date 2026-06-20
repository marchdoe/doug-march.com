import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        bottom: '0',
        right: '0',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '16px 28px',
        background: 'rgba(20, 12, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'border',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none!',
        })}
        aria-label="Doug March home"
      >
        <img
          src={logoSvg}
          alt=""
          className={css({ width: '24px', height: '24px' })}
        />
      </a>
      <a
        href="/"
        className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textSecondary',
          textDecoration: 'none',
          padding: '8px 4px',
          borderBottom: '1px solid transparent',
          transition: 'border-color 0.2s',
          _hover: { borderColor: 'accent', textDecoration: 'none!' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}
      >
        Work
      </a>
      <a
        href="/about"
        className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textSecondary',
          textDecoration: 'none',
          padding: '8px 4px',
          borderBottom: '1px solid transparent',
          transition: 'border-color 0.2s',
          _hover: { borderColor: 'accent', textDecoration: 'none!' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}
      >
        About
      </a>
    </nav>
  )
}