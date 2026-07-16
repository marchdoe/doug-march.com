import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const chip = css({
  display: 'inline-block',
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'text',
  background: 'bgCard',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: 'sm',
  padding: '2 3',
})

const factLabel = css({
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const factValue = css({
  fontSize: 'base',
  color: 'text',
})

function AboutPage() {
  return (
    <Box padding={{ base: '6 4', md: '8 6vw' }} display="flex" flexDirection="column" gap="8">
      <Box>
        <h1
          className={css({
            fontFamily: 'display',
            textTransform: 'uppercase',
            fontSize: 'clamp(40px, 8vw, 90px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '20ch',
          })}
        >
          {identity.role.split(' ').map((word, i) =>
            i === 1 ? (
              <span key={word} className={css({ color: 'accent' })}> {word}</span>
            ) : (
              <span key={word}>{i === 0 ? word : ` ${word}`}</span>
            )
          )}
        </h1>
        <p className={css({ marginTop: '4', fontSize: 'md', lineHeight: 'normal', color: 'textSecondary', maxWidth: '62ch' })}>
          {identity.statement}
        </p>
        <p className={css({ marginTop: '2', fontSize: 'sm', letterSpacing: 'wide', color: 'textMuted', textTransform: 'uppercase' })}>
          {identity.name}
        </p>
      </Box>

      <Box>
        <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
          Timeline
        </h2>
        <Flex direction="column" gap="0">
          {timeline.map((entry) => (
            <Flex
              key={`${entry.year}-${entry.role}`}
              gap="4"
              padding="3 4"
              bg="bgCard"
              borderBottom="1px solid"
              borderColor="border"
              align="baseline"
              wrap="wrap"
            >
              <Box
                minWidth="120px"
                flexShrink={0}
                fontVariantNumeric="tabular-nums"
                color="accent"
                fontWeight="bold"
                fontSize="sm"
                letterSpacing="wide"
              >
                {entry.year}
              </Box>
              <Box flex="1" minWidth="240px">
                <Box fontSize="base" color="text" fontWeight="medium">
                  {entry.role} <span className={css({ color: 'textSecondary' })}>· {entry.company}</span>
                </Box>
                <Box fontSize="sm" lineHeight="normal" color="textSecondary" marginTop="1">
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box>
        <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
          Capabilities
        </h2>
        <Flex wrap="wrap" gap="2">
          {capabilities.map((cap) => (
            <span key={cap} className={chip}>{cap}</span>
          ))}
        </Flex>
      </Box>

      <Grid columns={{ base: 1, md: 2 }} gap="6">
        <Box>
          <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
            Education
          </h2>
          <Flex direction="column" gap="2">
            <Flex justify="space-between"><span className={factLabel}>School</span><span className={factValue}>{education.school}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Degree</span><span className={factValue}>{education.degree}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Concentration</span><span className={factValue}>{education.concentration}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Years</span><span className={factValue}>{education.years}</span></Flex>
          </Flex>
        </Box>
        <Box>
          <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
            Personal
          </h2>
          <Flex direction="column" gap="2">
            <Flex justify="space-between"><span className={factLabel}>Holes in one</span><span className={factValue}>{personal.holesInOne}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Sport</span><span className={factValue}>{personal.sport}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Teams</span><span className={factValue}>{personal.teams.join(', ')}</span></Flex>
            <Flex justify="space-between"><span className={factLabel}>Current focus</span><span className={factValue}>{personal.currentFocus}</span></Flex>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}