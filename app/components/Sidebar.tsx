import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoSvg from '../assets/logo.svg'

export default function Sidebar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="100"
      width="100%"
      backgroundColor="bg"
      style={{
        height: '56px',
        borderBottom: '1px solid #E5DFC8',
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          paddingLeft: '48px',
          paddingRight: '48px',
        }}
      >
        {/* Logo + Name */}
        <a
          href="/"
          style={{
            textDecoration: 'none',
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <img
            src={logoSvg}
            alt="Doug March"
            style={{ width: '24px', height: '24px', display: 'block' }}
          />
          <Box
            fontFamily="body"
            fontSize="xs"
            color="text"
            style={{ fontWeight: '600', letterSpacing: '0.06em' }}
          >
            Doug March
          </Box>
        </a>

        {/* Nav links + Easter waypoint */}
        <Flex align="center" style={{ gap: '28px' }}>
          <a
            href="/"
            style={{ textDecoration: 'none', borderBottom: 'none' }}
            className={css({ _hover: { '& > div': { color: 'text' } } })}
          >
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-muted"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 180ms ease' }}
            >
              Home
            </Box>
          </a>
          <a
            href="/about"
            style={{ textDecoration: 'none', borderBottom: 'none' }}
            className={css({ _hover: { '& > div': { color: 'text' } } })}
          >
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-muted"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 180ms ease' }}
            >
              About
            </Box>
          </a>

          {/* Vertical rule */}
          <Box
            style={{
              width: '1px',
              height: '16px',
              backgroundColor: '#E5DFC8',
              flexShrink: '0',
            }}
          />

          {/* Easter waypoint */}
          <Box
            fontFamily="body"
            fontSize="2xs"
            color="text-disabled"
            style={{ letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
          >
            Easter tomorrow
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}