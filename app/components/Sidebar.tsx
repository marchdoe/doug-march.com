import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        padding: '28px 6vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: '10',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          _hover: { textDecoration: 'none' },
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '28px', height: '28px' })}
        />
        <span
          className={css({
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 'semibold',
            color: '{colors.stone.900}',
            fontFamily: 'body',
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
            fontSize: '13px',
            letterSpacing: '0.08em',
            fontWeight: 'medium',
            color: '{colors.stone.600}',
            textDecoration: 'none',
            textTransform: 'uppercase',
            padding: '8px 0',
            transition: 'color 0.2s ease',
            _hover: { color: '{colors.teal.500}', textDecoration: 'none' },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: '{colors.teal.500}',
              outlineOffset: '4px',
            },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontSize: '13px',
            letterSpacing: '0.08em',
            fontWeight: 'medium',
            color: '{colors.stone.600}',
            textDecoration: 'none',
            textTransform: 'uppercase',
            padding: '8px 0',
            transition: 'color 0.2s ease',
            _hover: { color: '{colors.teal.500}', textDecoration: 'none' },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: '{colors.teal.500}',
              outlineOffset: '4px',
            },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}