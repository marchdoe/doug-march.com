import { css } from '../../../styled-system/css'

type Project = { slug: string; title: string; type: string; year: number }

export function ProjectList({
  label,
  items,
  hrefFor,
}: {
  label: string
  items: Project[]
  hrefFor: (p: Project) => string
}) {
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
        {label}
      </p>
      {items.map((p) => (
        <a
          key={p.slug}
          href={hrefFor(p)}
          className={css({
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '3',
            py: '3',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <span className={css({ textStyle: 'md', fontWeight: 500, color: 'text' })}>
            {p.title}
          </span>
          <span
            className={css({
              textStyle: 'xs',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textFaint',
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            {p.type} · {p.year}
          </span>
        </a>
      ))}
    </div>
  )
}
