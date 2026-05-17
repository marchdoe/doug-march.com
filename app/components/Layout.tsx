import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutClass = css({
  display: 'grid',
  gridTemplateRows: '64px 1fr 72px',
  gridTemplateColumns: '1fr',
  minHeight: '100vh',
  maxWidth: 'none',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutClass}>
      <Sidebar />
      {children}
    </div>
  )
}