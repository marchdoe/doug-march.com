import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapper}>
      <Sidebar />
      {children}
    </div>
  )
}