import { css } from '../../../styled-system/css'

type Education = { school: string; degree: string; concentration: string; years: string }

export function EducationBlock({ education }: { education: Education }) {
  return (
    <div
      className={css({
        mt: { base: '7', lg: '9' },
        borderTop: '2px solid',
        borderColor: 'borderStrong',
        pt: '4',
      })}
    >
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
        Education
      </p>
      <p className={css({ textStyle: 'lg', fontWeight: 500, color: 'text' })}>{education.school}</p>
      <p className={css({ textStyle: 'sm', color: 'textMuted', mt: '1' })}>
        {education.degree} · {education.concentration}
      </p>
      <p
        className={css({
          textStyle: 'xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textFaint',
          mt: '1',
        })}
      >
        {education.years}
      </p>
    </div>
  )
}
