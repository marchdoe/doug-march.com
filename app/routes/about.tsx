import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const subhead = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'md',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  margin: '6 0 3',
  paddingTop: '4',
  borderTop: '2px solid',
  borderColor: 'border',
})

function AboutPage() {
  return (
    <>
      {/* BANNER */}
      <Box
        bg="bg"
        minH="30vh"
        display="flex"
        alignItems="center"
        px={{ base: '5', md: '12' }}
        py={{ base: '5', md: '8' }}
        borderBottom="2px solid"
        borderColor="border"
      >
        <Box
          as="h1"
          fontFamily="display"
          fontWeight="bold"
          textTransform="uppercase"
          color="knockout"
          margin="0"
          lineHeight="tight"
          letterSpacing="tight"
          style={{ fontSize: 'clamp(64px, 11vw, 168px)' }}
        >
          The Record.
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '2.6fr 1fr' }} minH="52vh">
        {/* LEFT: identity + timeline + capabilities */}
        <Box padding={{ base: '5', md: '6' }} borderColor="border">
          <Box
            fontFamily="display"
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '2xl' }}
            lineHeight="tight"
            textTransform="uppercase"
            letterSpacing="tight"
            marginBottom="6"
          >
            {identity.statement}
          </Box>

          <Box as="h3" className={subhead}>
            Timeline — The Standings
          </Box>
          <Box as="ol" listStyle="none" margin="0" padding="0">
            {timeline.map((t, i) => (
              <Box
                key={`${t.year}-${i}`}
                display="flex"
                gap="4"
                alignItems="baseline"
                padding="3 0"
                borderBottom="1px solid"
                borderColor="border"
                borderTop={i === 0 ? '1px solid' : undefined}
              >
                <Box flex="0 0 120px" minWidth="120px" fontWeight="bold" fontSize="sm" color="accent">
                  {t.year}
                </Box>
                <Box flex="1">
                  <Box fontFamily="display" fontWeight="bold" fontSize="md" textTransform="uppercase" letterSpacing="tight">
                    {t.role} — {t.company}
                  </Box>
                  <Box as="p" fontSize="sm" lineHeight="normal" color="text" marginTop="1">
                    {t.description}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Box as="h3" className={subhead}>
            The Craft — On the Record
          </Box>
          <Box fontSize="sm" lineHeight="normal" color="text">
            {capabilities.map((cap, i) => (
              <span key={cap}>
                <b className={css({ fontWeight: 'bold', color: 'text' })}>{cap}</b>
                {i < capabilities.length - 1 ? ' · ' : '.'}
              </span>
            ))}
          </Box>
        </Box>

        {/* RIGHT: education + off the clock */}
        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderLeft={{ base: 'none', md: '2px solid' }}
          borderColor="border"
        >
          <Box as="h3" className={subhead} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            Education
          </Box>
          <Box bg="panel" color="knockout" padding="5" marginBottom="6">
            <Box fontFamily="display" fontWeight="bold" fontSize="lg" textTransform="uppercase" lineHeight="tight">
              {education.school}
            </Box>
            <Box fontSize="sm" marginTop="2" color="knockout">
              {education.degree}
            </Box>
            <Box fontSize="sm" color="bg" marginTop="1">
              {education.concentration}
            </Box>
            <Box fontSize="2xs" letterSpacing="wide" textTransform="uppercase" color="knockout" marginTop="3">
              {education.years}
            </Box>
          </Box>

          <Box as="h3" className={subhead}>
            Off the Clock — Almanac
          </Box>
          <Box fontSize="sm" lineHeight="normal" color="text">
            Holes in one: <b className={css({ color: 'text', fontWeight: 'bold' })}>{personal.holesInOne}</b>
            <br />
            Sport: <b className={css({ color: 'text', fontWeight: 'bold' })}>{personal.sport}</b>
            <br />
            Teams: <b className={css({ color: 'text', fontWeight: 'bold' })}>{personal.teams.join(', ')}</b>
            <br />
            Current focus:{' '}
            <b className={css({ color: 'text', fontWeight: 'bold' })}>{personal.currentFocus}</b>
          </Box>
        </Box>
      </Box>
    </>
  )
}