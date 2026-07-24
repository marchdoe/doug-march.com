import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'

export function Fold({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className={css({
        borderTop: '1px solid',
        borderColor: 'border',
        paddingTop: { base: '7', md: '9' },
        paddingBottom: { base: '7', md: '9' },
      })}
    >
      {children}
    </section>
  )
}

export function FoldGrid({ main, rail }: { main: ReactNode; rail: ReactNode }) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: 'minmax(0,1fr) 240px' },
        columnGap: { base: '0', md: '10' },
        alignItems: 'start',
      })}
    >
      <div>{main}</div>
      <aside
        className={css({
          marginTop: { base: '6', md: '0' },
          position: { md: 'sticky' },
          top: { md: '5' },
          paddingLeft: { base: '0', md: '4' },
          borderLeft: { base: 'none', md: '1px solid' },
          borderColor: 'border',
        })}
      >
        {rail}
      </aside>
    </div>
  )
}

export function RailTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        fontFamily: 'body',
        fontSize: 'xs',
        fontWeight: 'semibold',
        letterSpacing: 'wider',
        textTransform: 'uppercase',
        color: 'textMuted',
        marginBottom: '4',
      })}
    >
      {children}
    </div>
  )
}