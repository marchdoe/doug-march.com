import type { ReactNode } from 'react'
import { Box, Flex } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=Outfit:wght@300;400;500&display=swap"
      />
      <Box background="bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Sidebar />
        <Box as="main" style={{ flex: 1 }}>
          {children}
        </Box>
        <Box as="footer" borderTop="1px solid" borderColor="border">
          <Flex
            justify="space-between"
            align="center"
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 24px' }}
          >
            <Box fontSize="xs" color="text.muted" fontFamily="body" letterSpacing="normal">
              Doug March · Product Designer &amp; Developer
            </Box>
            <Flex align="center" gap="4">
              <Box fontSize="xs" color="text.muted" fontFamily="body">
                2026
              </Box>
              <a href="/archive" style={{ textDecoration: 'none' }}>
                <Box as="span" fontSize="xs" color="text.muted" fontFamily="body">
                  Archive
                </Box>
              </a>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}