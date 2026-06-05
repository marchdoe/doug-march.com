import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const root = css({
  width: '100%',
  minHeight: '100vh',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={root}>
      <Sidebar />
      {children}
    </div>
  )
}