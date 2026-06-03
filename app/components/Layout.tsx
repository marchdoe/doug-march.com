import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const main = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={main}>
      <Sidebar />
      {children}
    </div>
  )
}