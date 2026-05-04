import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css({
        display: 'grid',
        gridTemplateColumns: '38% 1fr',
        minHeight: '100vh',
        background: 'bg',
        '@media (max-width: 767px)': {
          gridTemplateColumns: '1fr',
          display: 'flex',
          flexDirection: 'column',
        },
        '@media (min-width: 768px) and (max-width: 1023px)': {
          gridTemplateColumns: '36% 1fr',
        },
      })}
    >
      <Sidebar />
      <Box
        className={css({
          marginLeft: '38%',
          minHeight: '100vh',
          overflowY: 'auto',
          padding: '80px 64px 96px',
          '@media (max-width: 767px)': {
            marginLeft: '0',
            padding: '32px 24px 64px',
          },
          '@media (min-width: 768px) and (max-width: 1023px)': {
            marginLeft: '36%',
            padding: '48px 40px 64px',
          },
        })}
      >
        <Box
          className={css({
            maxWidth: '680px',
          })}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}