import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="grid"
      minHeight="100vh"
      background="bg"
      className={css({
        gridTemplateColumns: '38% 1fr',
        '@media (max-width: 767px)': {
          gridTemplateColumns: '1fr',
        },
      })}
    >
      <Sidebar />
      <Box
        overflowY="auto"
        padding="64px 56px 96px 64px"
        background="bgPanel"
        className={css({
          '@media (max-width: 767px)': {
            padding: '32px 24px 64px',
          },
          '@media (min-width: 768px)': {
            height: '100vh',
          },
        })}
      >
        <Box maxWidth="760px">
          {children}
        </Box>
      </Box>
    </Box>
  )
}