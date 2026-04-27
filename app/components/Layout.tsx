import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' })}>
      {children}
    </div>
  )
}

export { Sidebar }