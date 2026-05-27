import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        minHeight: '100vh',
        width: '100vw',
        maxWidth: 'none',
        overflowX: 'hidden',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      {children}
    </div>
  )
}