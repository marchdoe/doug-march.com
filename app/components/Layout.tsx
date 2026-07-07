import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
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