import type { ReactNode } from 'react'
import { Box, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Grid
      className={css({
        gridTemplateColumns: '340px 1fr',
        minHeight: '100vh',
        background: 'bg',
        '@media (max-width: 767px)': {
          gridTemplateColumns: '1fr',
        },
      })}
    >
      <Sidebar />
      <Box
        overflowY="auto"
        className={css({
          maxWidth: '720px',
          padding: '64px 56px',
          '@media (max-width: 767px)': {
            padding: '32px 20px',
            maxWidth: '100%',
          },
        })}
      >
        {children}
      </Box>
    </Grid>
  )
}