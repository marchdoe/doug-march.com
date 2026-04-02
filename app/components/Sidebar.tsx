import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLinkClass = css({
  color: 'text.muted',
  fontSize: 'xs',
  fontFamily: 'body',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 120ms ease',
  _hover: { color: 'accent' },
})

export function Sidebar() {
  return (
    <Box
      as="header"
      background="bg"
      borderBottom="1px solid"
      borderColor="border"
      position="sticky"
      top="0"
      style={{ zIndex: 50, height: '56px' }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', padding: '0 24px' }}
      >
        <a href="/" style={{ textDecoration: 'none' }}>
          <Box
            as="span"
            fontFamily="heading"
            fontSize="xl"
            fontWeight="700"
            color="text"
            letterSpacing="tight"
            lineHeight="tight"
          >
            Doug March
          </Box>
        </a>

        <Flex align="center" gap="6">
          <Flex align="center" gap="6">
            <a href="/" className={navLinkClass}>Work</a>
            <a href="/about" className={navLinkClass}>About</a>
          </Flex>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="500"
            color="secondary"
            letterSpacing="widest"
            style={{ textTransform: 'uppercase' }}
          >
            April 2 — 12.5 Hrs Daylight
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}