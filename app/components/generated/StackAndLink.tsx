import { css } from '../../../styled-system/css'

export function StackAndLink({ stack, liveUrl }: { stack?: string[]; liveUrl?: string }) {
  return (
    <div className={css({ mt: { base: '7', lg: '9' } })}>
      {stack && (
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', mb: '4' })}>
          {stack.map((s) => (
            <span
              key={s}
              className={css({
                textStyle: '2xs',
                fontWeight: 500,
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
                border: '1px solid',
                borderColor: 'border',
                px: '2',
                py: '1',
              })}
            >
              {s}
            </span>
          ))}
        </div>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          className={css({
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            textStyle: 'sm',
            fontWeight: 500,
            color: 'text',
            borderBottom: '1px solid',
            borderColor: 'accentAlt',
            pb: '1',
          })}
        >
          Visit live →
        </a>
      )}
    </div>
  )
}
