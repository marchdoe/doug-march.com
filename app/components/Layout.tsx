import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapper = css({
  minHeight: '100vh',
  background: '{colors.neutral.900}',
  color: '{colors.neutral.50}',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapper}>
      <Sidebar />
      {children}
    </div>
  )
}