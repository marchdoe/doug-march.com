import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  minHeight: '100vh',
  background: '{colors.neutral.950}',
  color: '{colors.cream.100}',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      {children}
    </div>
  )
}

export { Sidebar }