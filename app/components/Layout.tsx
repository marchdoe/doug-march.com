import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import { SignalStrip } from './SignalStrip'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="bg"
      color="text"
      overflow="hidden"
      className={css({
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        _before: {
          content: '""',
          position: 'absolute',
          inset: '0',
          background:
            'radial-gradient(120% 90% at 88% 8%, rgba(34,160,79,0.28) 0%, rgba(14,74,38,0) 55%), radial-gradient(90% 80% at 12% 100%, rgba(10,46,24,0.55) 0%, rgba(14,74,38,0) 60%)',
          pointerEvents: 'none',
        },
      })}
    >
      <Sidebar />
      <Box position="relative" zIndex="1">
        {children}
      </Box>
      <SignalStrip />
    </Box>
  )
}