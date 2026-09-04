import { VStack, HStack, Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { BrandLockup } from './BrandLockup'
import { identity } from '../content/about'

const navLinks = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
]

export function Sidebar() {
  return (
    <Box
      as="aside"
      className={css({
        display: { base: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '280px',
        flexShrink: 0,
        padding: '7',
        borderRight: '1px solid',
        borderColor: 'border',
        bg: 'bg',
      })}
    >
      <VStack gap="7" className={css({ alignItems: 'flex-start' })}>
        <BrandLockup variant="horizontal-md" mode="single-color" roleLine />

        <VStack gap="1" className={css({ alignItems: 'flex-start' })}>
          <Box className={css({ textStyle: 'sm', color: 'text', fontFamily: 'body' })}>
            {identity.name}
          </Box>
          <Box className={css({ textStyle: 'xs', color: 'textMuted', fontFamily: 'body' })}>
            {identity.role}
          </Box>
        </VStack>

        <nav aria-label="Primary">
          <HStack gap="4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={css({
                  textStyle: 'sm',
                  color: 'textMuted',
                  fontFamily: 'body',
                  _hover: { color: 'accent' },
                })}
              >
                {link.label}
              </a>
            ))}
          </HStack>
        </nav>
      </VStack>

      <VStack gap="2" className={css({ alignItems: 'flex-start' })}>
        <a
          href={`mailto:${identity.email}`}
          className={css({
            textStyle: 'xs',
            color: 'textFaint',
            fontFamily: 'body',
            _hover: { color: 'accent' },
          })}
        >
          {identity.email}
        </a>
      </VStack>
    </Box>
  )
}
