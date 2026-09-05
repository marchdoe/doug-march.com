import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'
import { ContactColophon } from './ContactColophon'

type Personal = { holesInOne: number; sport: string; teams: string[]; currentFocus: string }

export function PersonalColophon({
  personal,
  email,
  name,
  role,
}: {
  personal: Personal
  email: string
  name: string
  role: string
}) {
  return (
    <Box
      as="footer"
      borderTop="2px solid"
      borderColor="borderStrong"
      bg="bg"
      px={{ base: '5', md: '7', lg: '9' }}
      py={{ base: '9', lg: '9' }}
      display="flex"
      flexDirection="column"
      gap="4"
    >
      <Box display="flex" flexWrap="wrap" gap="2" alignItems="baseline">
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'textFaint',
          })}
        >
          Holes in one
        </span>
        <span className={css({ fontSize: 'sm', color: 'text' })}>
          {personal.holesInOne} · {personal.sport}
        </span>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="2" alignItems="baseline">
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'textFaint',
          })}
        >
          Teams
        </span>
        <span className={css({ fontSize: 'sm', color: 'textMuted' })}>
          {personal.teams.join(' · ')}
        </span>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="2" alignItems="baseline">
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'textFaint',
          })}
        >
          Current focus
        </span>
        <span className={css({ fontSize: 'sm', color: 'text' })}>{personal.currentFocus}</span>
      </Box>
      <Box mt="4" pt="4" borderTop="1px solid" borderColor="border">
        <ContactColophon email={email} name={name} role={role} />
      </Box>
    </Box>
  )
}
