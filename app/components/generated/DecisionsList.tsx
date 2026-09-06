import { css } from '../../../styled-system/css'

type Decision = { decision: string; why: string }

export function DecisionsList({ items }: { items: Decision[] }) {
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
        Decisions
      </p>
      {items.map((d) => (
        <div
          key={d.decision}
          className={css({ py: '3', borderBottom: '1px solid', borderColor: 'border' })}
        >
          <p className={css({ textStyle: 'md', fontWeight: 500, color: 'text' })}>{d.decision}</p>
          <p className={css({ textStyle: 'sm', color: 'textMuted', mt: '1' })}>{d.why}</p>
        </div>
      ))}
    </div>
  )
}
