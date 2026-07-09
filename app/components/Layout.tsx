import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const shell = css({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: '1fr 48px',
  background: 'bg',
  color: 'text',
  position: 'relative',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={shell}>
      <Sidebar />
      {children}
    </div>
  )
}