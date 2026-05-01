import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'bg',
      })}
    >
      <Sidebar />
      <main className={css({ flex: 1 })}>
        {children}
      </main>
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          py: '24',
          px: { base: '16', md: '32', lg: '48' },
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <Box
          fontFamily="body"
          fontSize="11px"
          letterSpacing="wider"
          color="{colors.neutral.400}"
        >
          © 2026 Doug March
        </Box>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'wider',
            color: '{colors.neutral.400}',
            textDecoration: 'none',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: { color: '{colors.neutral.600}' },
            _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </Box>
  )
}