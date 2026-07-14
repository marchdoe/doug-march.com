import { Flex, Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoMono from '../assets/logo-mono.svg'
import { identity } from '../content/about'

const navLinks = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Index', href: '/' },
]

export function Sidebar() {
  return (
    <>
      {/* brand lockup — top left, single-color cream */}
      <a
        href="/"
        aria-label={`${identity.name} — home`}
        className={css({
          position: 'fixed',
          top: { base: '5', md: '6' },
          left: { base: '5', md: '6' },
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '3',
          color: 'text',
        })}
      >
        <img
          src={logoMono}
          alt=""
          className={css({
            height: { base: '32px', md: '40px' },
            width: 'auto',
            display: 'block',
            color: 'text',
          })}
        />
        <Flex direction="column" gap="0">
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: 'sm',
              letterSpacing: 'normal',
              color: 'text',
              whiteSpace: 'nowrap',
            })}
          >
            {identity.name}
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textSecondary',
              whiteSpace: 'nowrap',
            })}
          >
            {identity.role}
          </span>
        </Flex>
      </a>

      {/* nav pills — top right */}
      <Flex
        as="nav"
        aria-label="Primary"
        className={css({
          position: 'fixed',
          top: { base: '5', md: '6' },
          right: { base: '4', md: '6' },
          zIndex: 50,
          gap: '2',
        })}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'text',
              paddingX: '4',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'full',
              background: 'transparent',
              transition: 'background .15s ease, color .15s ease, border-color .15s ease',
              _hover: { background: 'text', color: 'bg', borderColor: 'text' },
            })}
          >
            {link.label}
          </a>
        ))}
      </Flex>

      {/* baseline stamp — bottom left, pinned to canvas */}
      <Box
        className={css({
          position: 'fixed',
          left: { base: '5', md: '6' },
          bottom: { base: '4', md: '5' },
          zIndex: 50,
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: '2xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}
      >
        Summer · 14.5h daylight · Jul 14 2026
      </Box>
    </>
  )
}