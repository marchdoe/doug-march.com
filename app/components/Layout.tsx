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
        display: 'grid',
        gridTemplateRows: '60px 1fr 80px',
        gridTemplateColumns: '1fr',
        background: 'bg',
        color: 'text',
        overflow: 'hidden',
      })}
    >
      <Sidebar />
      <main
        className={css({
          gridRow: '2',
          display: 'flex',
          alignItems: 'center',
          minHeight: 'calc(100vh - 140px)',
          paddingTop: '60px',
        })}
      >
        {children}
      </main>
    </div>
  )
}