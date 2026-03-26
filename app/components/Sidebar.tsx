import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Sidebar() {
  const navLink = css({
    fontFamily: 'body',
    fontWeight: '400',
    fontSize: 'xs',
    color: 'textMuted',
    letterSpacing: 'wide',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 150ms ease, letter-spacing 150ms ease',
    _hover: {
      color: 'accent',
      letterSpacing: '0.065em',
    },
  })

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      style={{
        height: '56px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(241, 245, 239, 0.93)',
        borderBottom: '1px solid rgba(201, 213, 196, 0.4)',
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 48px',
          height: '100%',
        }}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'heading',
            fontWeight: '600',
            fontSize: 'xs',
            color: 'textSecondary',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 150ms ease',
            _hover: { color: 'text' },
          })}
        >
          Doug March
        </a>

        <Flex gap="8" align="center">
          <a href="/" className={navLink}>Work</a>
          <a href="/about" className={navLink}>About</a>
          <a href="/archive" className={navLink}>Archive</a>
        </Flex>
      </Flex>
    </Box>
  )
}