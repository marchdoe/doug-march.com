import { css } from '../../../styled-system/css'

type Entry = { year: string; role: string; company: string; description: string }

export function TimelineSection({ entries }: { entries: Entry[] }) {
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
        Record
      </p>
      {entries.map((e) => (
        <div
          key={`${e.year}-${e.role}`}
          className={css({
            display: 'flex',
            gap: '4',
            py: '3',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <span
            className={css({
              textStyle: 'sm',
              fontWeight: 500,
              color: 'accentAlt',
              minW: '120px',
              flexShrink: 0,
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            {e.year}
          </span>
          <div>
            <p className={css({ textStyle: 'md', fontWeight: 500, color: 'text' })}>
              {e.role} · {e.company}
            </p>
            <p className={css({ textStyle: 'sm', color: 'textMuted', maxW: '60ch', mt: '1' })}>
              {e.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
