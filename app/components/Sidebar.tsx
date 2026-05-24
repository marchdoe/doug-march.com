import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 28px',
        background: 'bgSignal',
      })}
    >
      <a href="/" className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        _hover: { textDecoration: 'none' },
      })}>
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '28px', height: '28px' })}
        />
        <span className={css({
          fontFamily: 'body',
          fontSize: '12px',
          fontWeight: 'medium',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}>
          DOUG MARCH
        </span>
      </a>
      <div className={css({
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
      })}>
        {[
          { label: 'WORK', href: '/' },
          { label: 'ABOUT', href: '/about' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              padding: '12px 4px',
              _hover: {
                color: 'text',
                textDecoration: 'none',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}