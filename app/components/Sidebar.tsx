import { css } from '../../styled-system/css'
import { Flex } from '../../styled-system/jsx'
import { BrandMark } from './BrandMark'

// "Sidebar" here implements the mockup's top prompt bar — the shared
// chrome rendered once by Layout across every route.
export function Sidebar() {
  return (
    <Flex
      as="header"
      align="center"
      gap="4"
      wrap="wrap"
      className={css({
        minHeight: '56px',
        borderBottom: '1px solid',
        borderColor: 'border',
        paddingY: '3',
      })}
    >
      <a
        href="/"
        aria-label="Doug March home"
        className={css({ display: 'flex', alignItems: 'center', gap: '2', flexShrink: 0 })}
      >
        <BrandMark size={24} />
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'sm',
            letterSpacing: 'normal',
            color: 'text',
          })}
        >
          Doug March
        </span>
      </a>

      <span
        className={css({
          fontFamily: 'body',
          fontSize: 'xs',
          letterSpacing: 'normal',
          color: 'textMuted',
          whiteSpace: 'nowrap',
        })}
      >
        <span className={css({ color: 'pine.400' })}>~/doug-march</span> —
      </span>

      <nav
        aria-label="Primary"
        className={css({
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6',
          fontSize: 'sm',
        })}
      >
        <span className={css({ color: 'accent', fontWeight: 'bold' })}>$</span>
        <a
          href="/"
          className={css({
            color: 'textSecondary',
            paddingY: '2',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            letterSpacing: 'normal',
            _hover: { color: 'accentBright' },
          })}
        >
          work
        </a>
        <a
          href="/about"
          className={css({
            color: 'textSecondary',
            paddingY: '2',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            letterSpacing: 'normal',
            _hover: { color: 'accentBright' },
          })}
        >
          about
        </a>
        <a
          href="mailto:hello@doug-march.com"
          className={css({
            color: 'textSecondary',
            paddingY: '2',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            letterSpacing: 'normal',
            _hover: { color: 'accentBright' },
          })}
        >
          contact
        </a>
      </nav>
    </Flex>
  )
}