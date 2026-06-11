import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapper = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'bg',
  color: 'text',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapper}>
      {children}
      <Sidebar />
    </div>
  )
}