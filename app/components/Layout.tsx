import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        background: 'bg',
        color: 'text',
        fontFamily: 'body',
        lineHeight: 'loose',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingInline: { base: '6', md: '5vw' },
        paddingTop: '6',
        paddingBottom: '5',
      })}
    >
      <Sidebar />

      <Box className={css({ flex: '1' })}>{children}</Box>

      <Box
        as="footer"
        className={css({
          marginTop: '2',
          paddingTop: '4',
          borderTop: '1px solid',
          borderColor: 'border',
          fontSize: 'xs',
          letterSpacing: 'normal',
          color: 'pine.400',
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          flexWrap: 'wrap',
        })}
      >
        <span className={css({ color: 'pine.500' })}># </span>
        <span>
          — rebuilt 2026-07-26 · exit <span className={css({ color: 'accent' })}>0</span>
        </span>
      </Box>
    </Box>
  )
}