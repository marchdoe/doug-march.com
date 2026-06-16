import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: '0 6vw',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={pageStyle}>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}