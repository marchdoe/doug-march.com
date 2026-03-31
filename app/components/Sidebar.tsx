import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLink = css({
  fontSize: 'xs',
  fontFamily: 'heading',
  fontWeight: '500',
  letterSpacing: 'wider',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.2s',
  _hover: { color: 'text' },
})

const siteName = css({
  fontSize: 'xs',
  fontFamily: 'heading',
  fontWeight: '500',
  letterSpacing: 'wider',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s',
  _hover: { color: 'text' },
})

export function Sidebar() {
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      height="12"
      style={{
        background: 'rgba(10, 21, 32, 0.94)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 1px 0 rgba(7, 15, 22, 0.8)',
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px' }}
      >
        <a href="/" className={siteName}>Doug March</a>
        <Flex gap="6" align="center">
          <a href="/about" className={navLink}>about</a>
          <a href="/#work" className={navLink}>work</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={navLink}
          >
            github
          </a>
          <a href="mailto:hello@doug-march.com" className={navLink}>email</a>
        </Flex>
      </Flex>
    </Box>
  )
}