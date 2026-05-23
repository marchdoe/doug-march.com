import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        padding: '6vh 5vw',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      {children}
    </div>
  )
}