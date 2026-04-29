import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        minHeight: '100vh',
        bg: 'bg',
        color: 'text',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <Sidebar />
      <Box flex="1">{children}</Box>
    </Box>
  )
}