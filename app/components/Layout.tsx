import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const shellStyle = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={shellStyle}>
      <Sidebar />
      {children}
    </div>
  )
}