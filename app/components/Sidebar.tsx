import { Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Logo } from './Logo'

export function Sidebar() {
  return (
    <Flex
      as="header"
      align="flex-start"
      justify="space-between"
      gap="6"
      className={css({
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingTop: { base: '8', md: '12', lg: '16' },
        position: 'relative',
        zIndex: '1',
        flexDirection: { base: 'column', sm: 'row' },
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({
          display: 'inline-flex',
          alignItems: 'center',
          color: 'accentGlow',
          lineHeight: '0',
        })}
      >
        <Logo className={css({ height: { base: '32px', md: '44px', lg: '52px' }, width: 'auto', display: 'block' })} />
      </a>
      <nav
        aria-label="Primary"
        className={css({
          display: 'flex',
          gap: { base: '5', md: '8' },
          alignItems: 'center',
          paddingTop: '1',
        })}
      >
        {[
          { href: '/work', label: 'work' },
          { href: '/about', label: 'about' },
          { href: '/contact', label: 'contact' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'textSecondary',
              textTransform: 'lowercase',
              padding: '2',
              lineHeight: '1',
              _hover: {
                color: 'accentGlow',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              },
            })}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </Flex>
  )
}