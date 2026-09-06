import { css } from '../../../styled-system/css'

export function PageFooter({ email }: { email: string }) {
  return (
    <footer
      className={css({
        gridArea: 'footer',
        mt: 'auto',
        pt: '5',
        px: { base: '6', lg: '9' },
        pb: { base: '6', lg: '7' },
        borderTop: '1px solid',
        borderColor: 'borderStrong',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3',
        textStyle: '2xs',
        fontWeight: 500,
        letterSpacing: 'wide',
        textTransform: 'uppercase',
        color: 'textFaint',
      })}
    >
      <span>Build 2026.09.06</span>
      <span>Tigers · 2026</span>
      <span>Waning Crescent 21%</span>
      <span>SPY 770.19</span>
      <a
        href={`mailto:${email}`}
        className={css({
          textDecoration: 'none',
          color: 'textFaint',
          borderBottom: '1px solid',
          borderColor: 'accentAlt',
        })}
      >
        {email}
      </a>
    </footer>
  )
}
