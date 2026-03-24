import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLink = css({
  fontFamily: 'body',
  fontSize: 'xs',
  fontWeight: 'light',
  letterSpacing: 'wider',
  color: 'textSecondary',
  textDecoration: 'none',
  textTransform: 'uppercase',
  _hover: { color: 'text', textDecoration: 'underline' },
})

export function Sidebar() {
  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      style={{ height: '40px', padding: '0 64px', borderBottom: '1px solid rgba(203,209,216,0.4)' }}
    >
      {/* Left: Identity */}
      <Flex gap="3" align="center">
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: 'xs',
          fontWeight: 'regular',
          letterSpacing: 'widest',
          color: 'textSecondary',
          textDecoration: 'none',
          textTransform: 'uppercase',
          _hover: { color: 'text' },
        })}>
          Doug March
        </a>
        <Box
          className={css({ fontFamily: 'body', fontSize: 'xs', color: 'textMuted', fontWeight: 'light' })}
        >
          ·
        </Box>
        <Box
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            fontWeight: 'light',
            letterSpacing: 'wider',
            color: 'textMuted',
            textTransform: 'uppercase',
          })}
        >
          Designer &amp; Developer
        </Box>
      </Flex>

      {/* Center: Signals */}
      <Box
        className={css({
          fontFamily: 'body',
          fontSize: 'xs',
          fontWeight: 'light',
          letterSpacing: 'wider',
          color: 'textMuted',
          textTransform: 'uppercase',
        })}
      >
        ◐ 41.9%&nbsp;&nbsp;·&nbsp;&nbsp;33°F&nbsp;·&nbsp;Sunny&nbsp;·&nbsp;Feels&nbsp;26°F
      </Box>

      {/* Right: Nav */}
      <Flex gap="6" align="center">
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </Flex>
    </Box>
  )
}