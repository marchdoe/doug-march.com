import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Education = { school: string; degree: string; concentration: string; years: string }

export function EducationBlock({ education }: { education: Education }) {
  return (
    <Box
      mx={{ base: '5', md: '7', lg: '9' }}
      mb={{ base: '9', lg: '9' }}
      bg="field"
      borderTop="1px solid"
      borderColor="fieldBorder"
      p={{ base: '5', lg: '7' }}
      color="fieldInk"
    >
      <p
        className={css({
          fontSize: '2xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'fieldInkMuted',
          mb: '2',
        })}
      >
        Education
      </p>
      <p
        className={css({
          fontSize: { base: 'xl', lg: '2xl' },
          fontWeight: '600',
          color: 'fieldInk',
          mb: '1',
        })}
      >
        {education.school}
      </p>
      <p className={css({ fontSize: 'base', color: 'fieldInkMuted' })}>
        {education.degree} · {education.concentration} · {education.years}
      </p>
    </Box>
  )
}
