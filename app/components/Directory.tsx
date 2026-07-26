import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'

export const rowStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '22px 1fr', md: '26px 1fr auto' },
  alignItems: 'baseline',
  gap: '12px',
  padding: '11px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 120ms ease',
  _hover: { background: 'surface' },
})

export const numStyle = css({
  fontSize: '2xs',
  color: 'pine.400',
  letterSpacing: '0.04em',
  fontVariantNumeric: 'tabular-nums',
})

export const rtitleStyle = css({
  fontSize: 'base',
  color: 'text',
  letterSpacing: '0.01em',
  lineHeight: '1.35',
  fontFamily: 'body',
})

export const rmetaStyle = css({
  gridColumn: { base: '2', md: 'auto' },
  textAlign: { base: 'left', md: 'right' },
  fontSize: '2xs',
  letterSpacing: '0.08em',
  color: 'pine.300',
  textTransform: 'uppercase',
  lineHeight: '1.35',
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
})

export const monoLine = css({
  fontSize: '2xs',
  color: 'pine.300',
  letterSpacing: '0.02em',
  padding: '3px 0',
  fontVariantNumeric: 'tabular-nums',
  fontFamily: 'body',
})

export function ColHead({ title, count }: { title: string; count: string }) {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingBottom: '14px',
        marginBottom: '8px',
        borderBottom: '1px solid',
        borderColor: 'pine.600',
      })}
    >
      <h2
        className={css({
          fontFamily: 'display',
          fontSize: '26px',
          lineHeight: '0.95',
          letterSpacing: '0.04em',
          color: 'text',
        })}
      >
        {title}
      </h2>
      <span className={css({ fontSize: '2xs', letterSpacing: '0.14em', color: 'pine.400', textTransform: 'uppercase' })}>
        {count}
      </span>
    </div>
  )
}

export function Col({ first, children }: { first?: boolean; children: ReactNode }) {
  return (
    <section
      className={css({
        paddingLeft: first ? '0' : { base: '0', md: '40px' },
        paddingRight: { base: '0', md: '40px' },
        borderLeft: first ? 'none' : { base: 'none', md: '1px solid' },
        borderLeftColor: 'border',
        borderTop: first ? 'none' : { base: '1px solid', md: 'none' },
        borderTopColor: 'border',
        marginTop: first ? '0' : { base: '28px', md: '0' },
        paddingTop: first ? '0' : { base: '28px', md: '0' },
      })}
    >
      {children}
    </section>
  )
}