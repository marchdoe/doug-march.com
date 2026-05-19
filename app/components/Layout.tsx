import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 'none',
        overflowX: 'hidden',
        background: '{colors.stone.50}',
        color: '{colors.stone.900}',
        minHeight: '100vh',
      })}
    >
      {children}
    </div>
  )
}