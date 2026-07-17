import { Box, Grid, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Chip } from './Chip'

const label = css({
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'bold',
})

// Specimen-caption footer — persists verbatim across every page per shell declaration.
export function CaptionBand() {
  return (
    <Box
      as="footer"
      bg="bandBg"
      borderTop="1px solid"
      borderColor="border"
      paddingX="6vw"
      paddingY="6"
      minHeight="120px"
    >
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '1.4fr 1fr', lg: '1.6fr 0.9fr 0.9fr' }}
        columnGap="8"
        rowGap="4"
        alignItems="start"
      >
        <Box display="flex" flexDirection="column" gap="2" minWidth="0">
          <span className={label}>The line, in full</span>
          <p
            className={css({
              fontSize: 'base',
              lineHeight: 'normal',
              color: 'textSecondary',
              fontStyle: 'italic',
              maxWidth: '56ch',
            })}
          >
            "Every second you have on this planet is very precious, and it's your responsibility
            that you're happy."
            <cite
              className={css({
                fontStyle: 'normal',
                display: 'block',
                marginTop: '1',
                fontSize: '2xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                fontWeight: 'bold',
              })}
            >
              Naval Ravikant
            </cite>
          </p>
        </Box>

        <Box display="flex" flexDirection="column" gap="2" minWidth="0">
          <span className={label}>The Open · In progress</span>
          <Flex
            wrap="wrap"
            gap="2"
            className={css({ fontVariantNumeric: 'tabular-nums', fontSize: 'base', lineHeight: 'normal' })}
          >
            <span className={css({ display: 'inline-flex', gap: '2', alignItems: 'baseline', color: 'accent' })}>
              Lucas Herbert <b className={css({ fontWeight: 'bold', color: 'accent' })}>−6</b>
            </span>
            <span className={css({ display: 'inline-flex', gap: '2', alignItems: 'baseline', color: 'textSecondary' })}>
              Suber <b className={css({ fontWeight: 'bold' })}>−5</b>
            </span>
            <span className={css({ display: 'inline-flex', gap: '2', alignItems: 'baseline', color: 'textSecondary' })}>
              Wallace <b className={css({ fontWeight: 'bold' })}>−4</b>
            </span>
          </Flex>
        </Box>

        <Box display="flex" flexDirection="column" gap="2" minWidth="0">
          <span className={label}>On air · Overhead</span>
          <Flex wrap="wrap" gap="2">
            <Chip>◗ Waxing crescent · 13%</Chip>
            <Chip>The War on Drugs</Chip>
            <Chip>My Morning Jacket</Chip>
            <Chip>Radiohead</Chip>
          </Flex>
        </Box>

        <Flex
          gridColumn="1 / -1"
          wrap="wrap"
          justify="space-between"
          gap="2"
          paddingTop="4"
          borderTop="1px solid"
          borderColor="border"
          className={label}
        >
          <span>Doug March · Product &amp; Design</span>
          <span>14.4 hrs daylight · Friday</span>
          <span>Specimen № 07·17·26</span>
        </Flex>
      </Grid>
    </Box>
  )
}