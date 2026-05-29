import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        height: '64px',
        width: '100%',
      })}
      aria-label="Main navigation"
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
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
            fontFamily: 'body',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '{colors.lime.400}',
            fontWeight: 'semibold',
          })}
        >
          DM
        </span>
      </a>
      <div className={css({ display: 'flex', gap: '20px', marginLeft: 'auto' })}>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.stone.300}',
            textDecoration: 'none',
            padding: '12px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: { color: '{colors.lime.400}', textDecoration: 'none' },
            _focusVisible: { outline: '2px solid', outlineColor: '{colors.lime.400}', outlineOffset: '2px' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.stone.300}',
            textDecoration: 'none',
            padding: '12px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: { color: '{colors.lime.400}', textDecoration: 'none' },
            _focusVisible: { outline: '2px solid', outlineColor: '{colors.lime.400}', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}