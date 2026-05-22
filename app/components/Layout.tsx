import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'bg',
  color: 'text',
})

const mainContent = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <Sidebar />
      <main className={mainContent}>
        {children}
      </main>
    </div>
  )
}