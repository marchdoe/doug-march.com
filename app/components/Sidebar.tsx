import logoSvg from '../assets/logo.svg'
import { Flex, Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navStyle = css({
  position: 'sticky',
  top: '0',
  zIndex: 100,
  height: '56px',
  background: 'rgba(244, 245, 238, 0.92)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 48px',
  '@media (max-width: 768px)': {
    padding: '0 16px',
  },
})

const linkStyle = css({
  fontSize: '12px',
  fontFamily: 'Outfit, sans-serif',
  letterSpacing: '0.08em',
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  padding: '12px 16px',
  display: 'inline-block',
  transition: 'color 200ms ease-out',
  _hover: {
    color: '{colors.neutral.700}',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: '4px',
  },
})

const activeLinkStyle = css({
  color: '{colors.accent.DEFAULT}',
})

export function Sidebar() {
  return (
    <nav className={navStyle}>
      <Flex align="center" gap="12px">
        <a href="/" aria-label="Home" className={css({ display: 'flex', alignItems: 'center', padding: '6px', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: '4px' } })}>
          <img src={logoSvg} alt="Doug March logo" width="28" height="28" />
        </a>
        <Box
          fontSize="13px"
          fontFamily="Outfit, sans-serif"
          letterSpacing="0.08em"
          color="{colors.neutral.400}"
          display={{ base: 'none', md: 'block' }}
        >
          Doug March
        </Box>
      </Flex>
      <Flex align="center" gap="0">
        <a href="/" className={linkStyle}>Work</a>
        <a href="/about" className={linkStyle}>About</a>
      </Flex>
    </nav>
  )
}