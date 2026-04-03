import type { ReactNode } from 'react'
import { Box, Flex } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600&display=swap"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap"
      />
      <Box
        minHeight="100vh"
        background="bg"
        display="flex"
        flexDirection="column"
        fontFamily="body"
      >
        <Sidebar />
        <Box as="main" flex="1">
          {children}
        </Box>
        <Box
          as="footer"
          borderTop="1px solid"
          borderColor="border"
          display="flex"
          alignItems="center"
          style={{ height: '48px' }}
        >
          <Flex
            justify="space-between"
            align="center"
            width="full"
            style={{ maxWidth: '1296px', margin: '0 auto', padding: '0 48px' }}
          >
            <span
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '12px',
                color: '#636B56',
                letterSpacing: '0.08em',
              }}
            >
              doug-march.com · 2026
            </span>
            <a
              href="/archive"
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '12px',
                color: '#636B56',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}
            >
              archive
            </a>
          </Flex>
        </Box>
      </Box>
    </>
  )
}