import { css } from '../../../styled-system/css'

type Step = { phase: string; does: string; produces: string }

export function ProcessList({ steps }: { steps: Step[] }) {
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
        Process
      </p>
      <ol
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
          pl: '0',
          listStyle: 'none',
        })}
      >
        {steps.map((s, i) => (
          <li
            key={s.phase}
            className={css({
              display: 'flex',
              gap: '4',
              py: '2',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <span
              className={css({
                textStyle: 'sm',
                color: 'accentAlt',
                fontWeight: 500,
                minW: '28px',
              })}
            >
              {i + 1}
            </span>
            <div>
              <p className={css({ textStyle: 'md', fontWeight: 500, color: 'text' })}>{s.phase}</p>
              <p className={css({ textStyle: 'sm', color: 'textMuted', mt: '1' })}>
                {s.does} → {s.produces}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
