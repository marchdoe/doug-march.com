import { css } from '../../styled-system/css'
import { Logo } from './Logo'

// The mockup folds nav + footer into a single fixed bottom rail — this
// component IS that rail. It is still named/exported as `Sidebar` per the
// chassis contract; its role in this shell is the bottom navigation.
export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '60px',
        background: 'bg',
        borderTop: '1px solid',
        borderColor: 'text',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: { base: '5', md: '6' },
        gap: '4',
        zIndex: 50,
      })}
    >
      <a
        href="/"
        aria-label="Doug March, home"
        className={css({ display: 'flex', alignItems: 'center', gap: '3', color: 'text' })}
      >
        <Logo size={30} />
        <span
          className={css({
            display: { base: 'none', md: 'inline' },
            fontFamily: 'heading',
            fontWeight: 'medium',
            fontSize: 'md',
            letterSpacing: 'tight',
            color: 'text',
          })}
        >
          Doug March
        </span>
      </a>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '5' })}>
        <span
          className={css({
            display: { base: 'none', md: 'inline' },
            fontFamily: 'body',
            fontSize: '2xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textMuted',
            fontVariantNumeric: 'tabular-nums',
          })}
        >
          Rewritten by hand — 24 Jul 2026
        </span>
        <div className={css({ display: 'flex', gap: '4' })}>
          <a
            href="/#work"
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'paper.800',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              _hover: { color: 'accent', textDecoration: 'underline' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'paper.800',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              _hover: { color: 'accent', textDecoration: 'underline' },
            })}
          >
            About
          </a>
          <a
            href="mailto:hello@doug-march.com"
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'paper.800',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              _hover: { color: 'accent', textDecoration: 'underline' },
            })}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}