import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'
import { SignalMargin } from './SignalMargin'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '72px 1fr', lg: '72px 1fr 260px' },
        gridTemplateRows: { base: 'auto 1fr auto', lg: '1fr' },
        minHeight: '100vh',
        background: 'bg',
      })}
    >
      <Sidebar />
      <Box
        as="main"
        className={css({
          gridColumn: '2',
          gridRow: '1',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
        })}
      >
        {children}
      </Box>
      <SignalMargin />
    </Box>
  )
}