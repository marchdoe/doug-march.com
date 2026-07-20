import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logo from '../assets/logo.svg'

const navLinkClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'text',
  paddingY: '1.5',
  paddingX: '2',
  marginLeft: '-2',
  display: 'inline-block',
  transition: 'background .18s ease, color .18s ease',
  _hover: { background: 'surface', color: 'surfaceText' },
})

export function Sidebar() {
  return (
    <Box
      as="header"
      position="fixed"
      top={{ base: '3', md: '5' }}
      left={{ base: '4', md: '6' }}
      zIndex="50"
    >
      <Flex direction="column" gap="3.5">
        <a
          href="/"
          aria-label="Doug March — home"
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2',
            color: 'text',
          })}
        >
          <img
            src={logo}
            alt="Doug March"
            className={css({ height: { base: '40px', md: '48px' }, width: 'auto', display: 'block' })}
          />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'sm',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              lineHeight: 'tight',
              color: 'text',
            })}
          >
            Doug March
          </span>
        </a>
        <Flex direction="column" gap="0.5">
          <a href="/work" className={navLinkClass}>Work</a>
          <a href="/about" className={navLinkClass}>About</a>
          <a href="/" className={navLinkClass}>Log</a>
        </Flex>
      </Flex>
    </Box>
  )
}