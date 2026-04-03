import { Box, Flex } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <Box
      as="header"
      background="bg"
      display="flex"
      alignItems="center"
      style={{ height: '56px' }}
    >
      <Flex
        justify="space-between"
        align="center"
        width="full"
        style={{ maxWidth: '1296px', margin: '0 auto', padding: '0 48px' }}
      >
        <a href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#484F3C',
              letterSpacing: '0.08em',
            }}
          >
            doug-march
          </span>
        </a>
        <nav
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '12px',
              color: '#636B56',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              transition: 'color 300ms ease',
            }}
          >
            work
          </a>
          <a
            href="/about"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '12px',
              color: '#636B56',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              transition: 'color 300ms ease',
            }}
          >
            about
          </a>
        </nav>
      </Flex>
    </Box>
  )
}