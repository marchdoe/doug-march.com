import logoSvg from '../assets/logo.svg'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      padding="24 48"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(250, 246, 243, 0.8)',
      }}
      className={css({
        '@media (prefers-reduced-motion: reduce)': {
          backdropFilter: 'none',
        },
      })}
    >
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img src={logoSvg} alt="Doug March logo" style={{ width: '28px', height: '28px' }} />
      </a>
      <Flex
        gap="32"
        alignItems="center"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
        }}
      >
        <a
          href="/"
          className={css({
            color: 'text-muted',
            textDecoration: 'none',
            padding: '8',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'tight' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            color: 'text-muted',
            textDecoration: 'none',
            padding: '8',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'tight' },
          })}
        >
          About
        </a>
      </Flex>
    </Box>
  )
}