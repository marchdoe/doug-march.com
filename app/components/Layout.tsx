import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        minHeight: '100vh',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      <Box>{children}</Box>
    </Box>
  )
}