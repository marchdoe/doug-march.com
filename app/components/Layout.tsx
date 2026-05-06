import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'bg',
        color: 'text',
      })}
    >
      <Sidebar />
      <main className={css({ flex: '1 1 auto', display: 'flex', flexDirection: 'column' })}>
        {children}
      </main>
    </div>
  )
}