import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '48px',
        borderBottom: '1px solid',
        borderColor: 'border',
        padding: '0',
        width: '100%',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'text',
          _hover: { color: 'accent' },
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '20px', height: '20px' })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: 'medium',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
          })}
        >
          DOUGLAS MARCH
        </span>
      </a>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Work
        </a>
        <span className={css({ color: 'textMuted', fontSize: '12px' })}>·</span>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}