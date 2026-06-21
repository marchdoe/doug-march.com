import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const rightPanel = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: 'bg',
  padding: '48 5vw',
  '@media (min-width: 768px)': {
    padding: '64 5vw',
  },
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={rightPanel}>
      <Sidebar />
      <main className={css({ flex: '1', display: 'flex', flexDirection: 'column' })}>
        {children}
      </main>
    </div>
  )
}