import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'absolute',
        top: '40px',
        left: '6vw',
        right: '6vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
      })}
    >
      <div className={css({ display: 'flex', alignItems: 'center', gap: '12px' })}>
        <a href="/" className={css({ display: 'block', lineHeight: 0 })}>
          <img
            src={logoSvg}
            alt="Doug March logo"
            className={css({ width: '28px', height: '28px' })}
          />
        </a>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: 'medium',
            color: '{colors.stone.600}',
            textDecoration: 'none',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            _hover: { color: 'accent', textDecoration: 'none' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Doug March
        </a>
      </div>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '24px' })}>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: '{colors.stone.400}',
            display: { base: 'none', md: 'inline' },
          })}
        >
          Friday, June 12
        </span>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: '{colors.stone.500}',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'accent', textDecoration: 'underline', textDecorationColor: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: '{colors.stone.500}',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'accent', textDecoration: 'underline', textDecorationColor: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          about
        </a>
      </div>
    </nav>
  )
}