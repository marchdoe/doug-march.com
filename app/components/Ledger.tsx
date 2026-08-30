import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'

export function SectionLabel({ label, count }: { label: string; count: string }) {
  return (
    <div
      className={css({
        fontFamily: 'body',
        fontWeight: 'bold',
        fontSize: 'xs',
        letterSpacing: 'widest',
        textTransform: 'uppercase',
        color: 'textMuted',
        paddingBottom: '3',
        borderBottom: '1px solid',
        borderColor: 'border',
        margin: { base: '7 0 0', md: '8 0 0' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '3',
      })}
    >
      <span>{label}</span>
      <span className={css({ color: 'textMuted', fontWeight: 'medium', letterSpacing: 'wide', whiteSpace: 'nowrap' })}>
        {count}
      </span>
    </div>
  )
}

export function Row({
  label,
  main,
  sub,
  value,
  muted,
}: {
  label?: string
  main: string
  sub?: string
  value: string
  muted?: boolean
}) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '1 4',
        alignItems: 'baseline',
        padding: '4 0',
        borderBottom: '1px solid',
        borderColor: 'border',
      })}
    >
      {label && (
        <span
          className={css({
            fontSize: '2xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textMuted',
            gridColumn: '1',
          })}
        >
          {label}
        </span>
      )}
      <span className={css({ gridColumn: '1', fontSize: 'md', color: 'text', fontWeight: 'medium' })}>{main}</span>
      {sub && (
        <span className={css({ gridColumn: '1', fontSize: 'sm', color: 'textMuted' })}>{sub}</span>
      )}
      <span
        className={css({
          gridColumn: '2',
          gridRow: '1 / -1',
          alignSelf: 'center',
          textAlign: 'right',
          fontWeight: 'bold',
          fontSize: 'lg',
          color: muted ? 'textMuted' : 'accent',
          whiteSpace: 'nowrap',
        })}
      >
        {value}
      </span>
    </div>
  )
}

export function WorkRow({
  title,
  type,
  year,
  href,
  external,
}: {
  title: string
  type: string
  year: number
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2 4',
        alignItems: 'baseline',
        padding: '4 0',
        borderBottom: '1px solid',
        borderColor: 'border',
        _hover: { borderColor: 'sand.600' },
      })}
    >
      <span
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'lg',
          letterSpacing: 'tight',
          textTransform: 'uppercase',
          color: 'text',
          _hover: { color: 'accent' },
        })}
      >
        {title}
      </span>
      <span
        className={css({
          gridColumn: '2',
          gridRow: '1 / -1',
          alignSelf: 'center',
          textAlign: 'right',
          fontSize: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}
      >
        {type}
        <b className={css({ display: 'block', color: 'textMuted', fontWeight: 'bold' })}>{year}</b>
      </span>
    </a>
  )
}

export function Featured({ children }: { children: ReactNode }) {
  return (
    <article
      className={css({
        bg: 'surface',
        border: '1px solid',
        borderColor: 'border',
        padding: { base: '5', md: '6' },
        marginTop: '4',
      })}
    >
      {children}
    </article>
  )
}