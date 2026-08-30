import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'
import { identity } from '../content/about'

export function Sidebar() {
  return (
    <header
      className={css({
        background: 'panel',
        borderTop: '3px double',
        borderTopColor: 'border',
        borderBottom: '3px double',
        borderBottomColor: 'border',
        paddingY: '3',
        paddingX: { base: '4', md: '8' },
        display: 'grid',
        gridTemplateColumns: { base: '1fr', sm: '1fr auto 1fr' },
        alignItems: 'center',
        gap: '3',
        minHeight: '96px',
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: { base: 'center', sm: 'flex-start' },
          gap: '2',
        })}
      >
        <img
          src={logoMono}
          alt=""
          className={css({ height: '46px', width: 'auto', color: 'text' })}
        />
        <span
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'xl',
            letterSpacing: 'tight',
            lineHeight: 'tight',
            color: 'text',
          })}
        >
          Doug March
        </span>
      </a>

      <div
        className={css({
          order: { base: 3, sm: 0 },
          textAlign: 'center',
          fontFamily: 'body',
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'lowercase',
          fontWeight: 'semibold',
          color: 'textMuted',
        })}
      >
        Wednesday <span className={css({ color: 'accentGlow' })}>·</span> July 29, 2026{' '}
        <span className={css({ color: 'accentGlow' })}>·</span> Full Moon
      </div>

      <nav
        aria-label="Sections"
        className={css({
          order: { base: 2, sm: 0 },
          display: 'flex',
          justifyContent: { base: 'center', sm: 'flex-end' },
          flexWrap: 'wrap',
          gap: { base: '3', sm: '6' },
          fontFamily: 'body',
        })}
      >
        {[
          { href: '/', label: 'Work' },
          { href: '/about', label: 'About' },
          { href: `mailto:${identity.email}`, label: 'Contact' },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={css({
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'lowercase',
              fontWeight: 'semibold',
              color: 'text',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accent', textDecoration: 'underline' },
            })}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
