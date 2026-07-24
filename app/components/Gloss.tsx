import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'

// Marginalia unit — reused for home-page signals, about-page personal facts,
// and work-page metadata. `tone` swaps the palette for use on the drenched
// (vermillion) featured band.
export function Gloss({
  label,
  children,
  note = false,
  tone = 'default',
}: {
  label: string
  children: ReactNode
  note?: boolean
  tone?: 'default' | 'inverse'
}) {
  return (
    <div
      className={css({
        paddingBottom: '3',
        marginBottom: '3',
        borderBottom: '1px solid',
        borderColor: tone === 'inverse' ? 'ink.400' : 'border',
        _last: { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 },
      })}
    >
      <span
        className={css({
          display: 'block',
          fontFamily: 'body',
          fontSize: 'xs',
          fontWeight: 'semibold',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: tone === 'inverse' ? 'paper.200' : 'accent',
          marginBottom: '1',
        })}
      >
        {label}
      </span>
      <span
        className={css({
          display: 'block',
          fontFamily: note ? 'heading' : 'body',
          fontStyle: note ? 'italic' : 'normal',
          fontSize: note ? 'sm' : 'sm',
          color: tone === 'inverse' ? 'paper.50' : note ? 'textMuted' : 'paper.800',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        {children}
      </span>
    </div>
  )
}