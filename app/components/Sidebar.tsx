import logo from '../assets/logo.svg'
import { Flex, Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLinks = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Signals', href: '/#charge' },
]

export function Sidebar() {
  return (
    <Flex
      justify="space-between"
      align={{ base: 'flex-start', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      gap="4"
      mb={{ base: '6', md: '8' }}
    >
      <Flex align="center" gap="4">
        <img
          src={logo}
          alt="Doug March mark"
          className={css({ height: { base: '56px', md: '76px' }, width: 'auto', flexShrink: 0 })}
        />
        <Box>
          <Box fontFamily="display" fontSize={{ base: 'xl', md: '2xl' }} lineHeight="tight" color="text">
            Doug March
          </Box>
          <Box fontSize="xs" color="textMuted" letterSpacing="wide" mt="1">
            Product builder · founder · designer
          </Box>
        </Box>
      </Flex>
      <Flex gap="3" wrap="wrap" align="center" as="nav" aria-label="Primary">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              paddingInline: '5',
              borderRadius: 'full',
              border: '1px solid',
              borderColor: 'accent',
              fontSize: 'xs',
              fontWeight: 'bold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'text',
              transition: 'background 0.25s ease, color 0.25s ease',
              _hover: { background: 'accent', color: 'surfaceQuiet' },
            })}
          >
            {l.label}
          </a>
        ))}
      </Flex>
    </Flex>
  )
}