import { Box, HStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { BrandLockup } from './BrandLockup'
import { identity } from '../content/about'

const navLinks = [
  { href: '/#work', label: 'work' },
  { href: '/about', label: 'about' },
]

export function Sidebar() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      zIndex={20}
      p={{ base: '5', lg: '7' }}
      className={css({ color: 'text' })}
    >
      <a href="/" aria-label="Doug March — home" className={css({ display: 'inline-block' })}>
        <BrandLockup variant="horizontal-md" mode="single-color" />
      </a>
      <HStack
        gap="2"
        mt="2"
        className={css({ fontVariantCaps: 'small-caps', letterSpacing: 'wide' })}
      >
        {navLinks.map((link, i) => (
          <span
            key={link.href}
            className={css({ display: 'inline-flex', alignItems: 'center', gap: '2' })}
          >
            {i > 0 && <span className={css({ color: 'textFaint' })}>·</span>}
            <a
              href={link.href}
              className={css({ fontSize: 'sm', color: 'textMuted', _hover: { color: 'accent' } })}
            >
              {link.label}
            </a>
          </span>
        ))}
        <span className={css({ color: 'textFaint' })}>·</span>
        <a
          href={`mailto:${identity.email}`}
          className={css({ fontSize: 'sm', color: 'textMuted', _hover: { color: 'accent' } })}
        >
          contact
        </a>
      </HStack>
    </Box>
  )
}
