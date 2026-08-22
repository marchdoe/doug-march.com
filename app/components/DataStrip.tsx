import { css } from '../../styled-system/css'
import { Grid, Flex } from '../../styled-system/jsx'

// The bottom data strip — decorative signal annotation, constant across all pages.
// --strip (#22143d) has no exact token match; nearest semantic token is `bg`
// (violet.900 #1a1030), used here for the strip background.
export function DataStrip() {
  return (
    <Grid
      as="footer"
      bg="bg"
      borderTop="1px solid"
      borderColor="border"
      columns={{ base: 1, md: 3 }}
      gap="6"
      px={{ base: '6', md: '12', lg: '24' }}
      py="6"
      alignItems={{ md: 'center' }}
      minH={{ md: '120px' }}
    >
      <Flex direction="column" gap="1.5" lineHeight="snug">
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
          })}
        >
          Scottish Open · In Progress
        </span>
        <span
          className={css({
            fontFamily: 'display',
            fontSize: 'lg',
            letterSpacing: 'wide',
            color: 'text',
          })}
        >
          Tom Kim{' '}
          <span className={css({ color: 'accentGlow' })} style={undefined}>
            −14
          </span>
        </span>
        <span className={css({ fontSize: 'xs', color: 'textSecondary' })}>
          Min Woo Lee −13 · Fitzpatrick −13 · McIlroy −12
        </span>
      </Flex>

      <Flex direction="column" align={{ base: 'flex-start', md: 'center' }} justify="center">
        <span
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 'full',
            px: '4',
            py: '2',
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'accentGlow',
            whiteSpace: 'nowrap',
            minH: '38px',
          })}
        >
          <span className={css({ color: 'accent', fontSize: 'sm' })}>◐</span> New Moon · 2% Lit ·
          Day 28
        </span>
      </Flex>

      <Flex
        direction="column"
        align={{ base: 'flex-start', md: 'flex-end' }}
        textAlign={{ md: 'right' }}
      >
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            mb: '0.5',
          })}
        >
          On Repeat
        </span>
        <span className={css({ fontSize: 'xs', color: 'textSecondary' })}>
          Guided by Voices{' '}
          <span className={css({ fontStyle: 'italic', color: 'text' })}>· Tobin Sprout</span>
        </span>
      </Flex>
    </Grid>
  )
}
