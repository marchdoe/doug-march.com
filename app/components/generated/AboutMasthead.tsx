import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function AboutMasthead({
  statement,
  name,
  role,
}: {
  statement: string
  name: string
  role: string
}) {
  return (
    <Box
      position="relative"
      minH={{ base: '340px', lg: '52vh' }}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={{ base: '160px', lg: '200px' }}
      pb={{ base: '9', lg: '9' }}
      px={{ base: '5', md: '7', lg: '9' }}
      className={css({
        background:
          'radial-gradient(circle at 50% 45%, token(colors.field) 0%, token(colors.accent) 30%, token(colors.accentAlt) 60%, token(colors.bg) 100%)',
      })}
    >
      <Box position="relative" zIndex={1} textAlign="center" maxWidth="720px">
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'fieldInkMuted',
            mb: '3',
          })}
        >
          {name} · {role}
        </p>
        <p
          className={css({
            fontSize: { base: '2xl', lg: '4xl' },
            fontWeight: '600',
            color: 'fieldInk',
            lineHeight: 'loose',
          })}
        >
          {statement}
        </p>
      </Box>
    </Box>
  )
}
