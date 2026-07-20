import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      <Box
        className={css({
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: { base: '24', md: '28' },
        })}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}