import { createFileRoute } from '@tanstack/react-router'
import { Grid, Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '1.6fr 1fr' }} minH="100vh">
      {/* LEFT: cobalt identity statement */}
      <Box
        position="relative"
        bg="bg"
        paddingX={{ base: '5', md: '9' }}
        paddingTop={{ base: '20', md: '20' }}
        paddingBottom={{ base: '12', md: '10' }}
        minH={{ base: 'auto', md: '100vh' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '2xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginBottom: { base: '5', md: '8' },
          })}
        >
          {identity.role}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '32px', md: '48px', lg: '80px' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            textTransform: 'uppercase',
            color: 'text',
            maxWidth: '16ch',
          })}
        >
          {identity.statement}
        </h1>
      </Box>

      {/* RIGHT: biographical ledger */}
      <Box bg="panel" color="text" paddingX={{ base: '5', md: '7' }} paddingY={{ base: '8', md: '9' }}>
        <Box marginBottom="10">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            Timeline
          </Box>
          {timeline.map((entry, i) => (
            <Flex key={i} gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
              <Box
                minWidth="120px"
                flexShrink={0}
                className={css({ fontFamily: 'display', fontSize: 'xl', color: 'textMuted', whiteSpace: 'nowrap' })}
              >
                {entry.year}
              </Box>
              <Box>
                <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: 'md', color: 'text' })}>
                  {entry.role} <span className={css({ color: 'textMuted', fontWeight: 'normal' })}>· {entry.company}</span>
                </Box>
                <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'textSecondary', marginTop: '1', lineHeight: 'loose' })}>
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </Box>

        <Box marginBottom="10">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '3',
            })}
          >
            Capabilities
          </Box>
          <Flex wrap="wrap" gap="2">
            {capabilities.map((cap) => (
              <Box
                key={cap}
                className={css({
                  background: 'surface',
                  borderRadius: 'sm',
                  paddingX: '3',
                  paddingY: '2',
                  fontFamily: 'body',
                  fontWeight: 'semibold',
                  fontSize: '2xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'text',
                })}
              >
                {cap}
              </Box>
            ))}
          </Flex>
        </Box>

        <Box marginBottom="10">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            Education
          </Box>
          <Flex justify="space-between" align="baseline" gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
            <Box>
              <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: 'md', color: 'text' })}>
                {education.school}
              </Box>
              <Box className={css({ fontFamily: 'body', fontSize: 'xs', color: 'textMuted', marginTop: '1' })}>
                {education.degree} · {education.concentration}
              </Box>
            </Box>
            <Box className={css({ fontFamily: 'display', fontSize: 'lg', color: 'textMuted', whiteSpace: 'nowrap' })}>
              {education.years}
            </Box>
          </Flex>
        </Box>

        <Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            Off the Clock
          </Box>
          <Flex justify="space-between" align="baseline" gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
            <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted' })}>
              Holes in one · {personal.sport}
            </Box>
            <Box className={css({ fontFamily: 'display', fontSize: 'xl', color: 'accent' })}>
              {personal.holesInOne}
            </Box>
          </Flex>
          <Flex justify="space-between" align="baseline" gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
            <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted' })}>
              Teams
            </Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'text', textAlign: 'right' })}>
              {personal.teams.join(' · ')}
            </Box>
          </Flex>
          <Flex justify="space-between" align="baseline" gap="4" paddingY="4">
            <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted' })}>
              Current focus
            </Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'text', textAlign: 'right', maxWidth: '60%' })}>
              {personal.currentFocus}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Grid>
  )
}