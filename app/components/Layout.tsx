import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <Sidebar />
      {children}
    </div>
  )
}