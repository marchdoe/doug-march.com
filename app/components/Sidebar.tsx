import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        padding: '0 6vw',
        width: '100%',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'textMuted',
          _hover: { color: 'accent' },
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '28px', height: '28px' })}
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
          Doug March
        </span>
      </a>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '10px 0',
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
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '10px 0',
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