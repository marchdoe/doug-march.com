import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4',
        padding: { base: '5 6', md: '5 16', lg: '5 24' },
        borderBottom: '1px solid',
        borderColor: 'border',
        minHeight: '72px',
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({ display: 'flex', alignItems: 'center', gap: '3' })}
      >
        <img
          src={logoMono}
          alt=""
          className={css({ width: '26px', height: 'auto', display: 'block', color: 'accentGlow' })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: 'sm',
            letterSpacing: 'wide',
            color: 'text',
          })}
        >
          Doug March
        </span>
      </a>
      <ul
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: { base: '4', md: '8' },
          listStyle: 'none',
        })}
      >
        {[
          { href: '/work', label: 'Work' },
          { href: '/about', label: 'About' },
          { href: '/#index', label: 'Index' },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={css({
                fontSize: 'xs',
                textTransform: 'uppercase',
                letterSpacing: 'wider',
                color: 'textSecondary',
                position: 'relative',
                padding: '1 0',
                display: 'inline-block',
                _hover: { color: 'accentGlow' },
              })}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}