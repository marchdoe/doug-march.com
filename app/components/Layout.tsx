import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const shell = css({
  minHeight: '100vh',
  background: 'bg',
  color: 'text',
  padding: '0 5vw',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={shell}>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}