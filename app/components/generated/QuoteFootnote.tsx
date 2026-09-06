import { css } from '../../../styled-system/css'

export function QuoteFootnote() {
  return (
    <blockquote
      className={css({
        mt: { base: '7', lg: '9' },
        pt: '4',
        borderTop: '1px solid',
        borderColor: 'border',
        fontStyle: 'italic',
        textStyle: 'sm',
        color: 'textFaint',
        maxW: '58ch',
      })}
    >
      "Some people are old at 18 and some are young at 90."
      <cite
        className={css({
          display: 'block',
          fontStyle: 'normal',
          fontWeight: 500,
          textStyle: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textMuted',
          mt: '2',
        })}
      >
        — Yoko Ono
      </cite>
    </blockquote>
  )
}
