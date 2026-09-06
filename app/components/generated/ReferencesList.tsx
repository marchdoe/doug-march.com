import { css } from '../../../styled-system/css'

type Reference = { title: string; url: string; note?: string }

export function ReferencesList({ items }: { items: Reference[] }) {
  return (
    <div className={css({ mt: { base: '7', lg: '9' } })}>
      <p
        className={css({
          textStyle: 'xs',
          fontWeight: 700,
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          mb: '3',
        })}
      >
        References
      </p>
      {items.map((r) => (
        <a
          key={r.url}
          href={r.url}
          className={css({
            textDecoration: 'none',
            display: 'block',
            py: '3',
            borderBottom: '1px solid',
            borderColor: 'border',
            color: 'text',
          })}
        >
          <span
            className={css({
              textStyle: 'md',
              fontWeight: 500,
              borderBottom: '1px solid',
              borderColor: 'accentAlt',
            })}
          >
            {r.title}
          </span>
          {r.note && (
            <span
              className={css({ display: 'block', textStyle: 'sm', color: 'textMuted', mt: '1' })}
            >
              {r.note}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
