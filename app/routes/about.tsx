import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <Box
        as="section"
        className={css({
          paddingY: { base: '8', md: '10' },
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <p
          className={css({
            fontSize: { base: 'sm', md: 'md' },
            fontVariantCaps: 'all-small-caps',
            textTransform: 'lowercase',
            letterSpacing: 'wider',
            color: 'accent',
            marginBottom: '4',
            fontWeight: 'medium',
          })}
        >
          {identity.role}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '4xl', md: '6xl', lg: '7xl' },
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
            maxWidth: '18ch',
          })}
        >
          {identity.statement}
        </h1>
      </Box>

      <Box
        as="main"
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1.6fr 1fr' },
          paddingY: '8',
        })}
      >
        {/* TIMELINE / CAPABILITIES / EDUCATION */}
        <Box
          className={css({
            paddingX: { base: 0, md: '8' },
            paddingLeft: 0,
          })}
        >
          <ColHead title="Timeline" count={`${String(timeline.length).padStart(2, '0')} entries`} />
          <Box>
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${i}`}
                gap="4"
                align="baseline"
                className={css({
                  paddingY: '3',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                })}
              >
                <span
                  className={css({
                    flex: '0 0 120px',
                    minWidth: '120px',
                    fontSize: 'xs',
                    color: 'accentBright',
                    letterSpacing: 'wide',
                  })}
                >
                  {entry.year}
                </span>
                <Box>
                  <p className={css({ fontSize: 'md', color: 'text', letterSpacing: 'normal' })}>
                    {entry.role} <span className={css({ color: 'textMuted' })}>·</span> {entry.company}
                  </p>
                  <p className={css({ fontSize: 'sm', lineHeight: 'normal', color: 'textSecondary', marginTop: '1' })}>
                    {entry.description}
                  </p>
                </Box>
              </Flex>
            ))}
          </Box>

          <Box marginTop="8">
            <ColHead title="Capabilities" count="log" />
            <Box className={css({ fontSize: 'sm', color: 'textSecondary', letterSpacing: 'normal' })}>
              <p className={css({ marginBottom: '2', fontSize: '2xs', letterSpacing: 'wider', color: 'pine.400', textTransform: 'uppercase' })}>
                capabilities ::
              </p>
              <Flex wrap="wrap" gap="3">
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    className={css({
                      fontSize: 'xs',
                      color: 'text',
                      border: '1px solid',
                      borderColor: 'border',
                      paddingX: '2',
                      paddingY: '1',
                    })}
                  >
                    {cap}
                  </span>
                ))}
              </Flex>
            </Box>
          </Box>

          <Box marginTop="8">
            <ColHead title="Education" count="01 dir" />
            <Flex
              justify="space-between"
              align="baseline"
              className={css({ paddingY: '3', borderBottom: '1px solid', borderColor: 'border' })}
            >
              <Box>
                <p className={css({ fontSize: 'md', color: 'text' })}>{education.school}</p>
                <p className={css({ fontSize: 'sm', color: 'textSecondary', marginTop: '1' })}>
                  {education.degree} · {education.concentration}
                </p>
              </Box>
              <span className={css({ fontSize: 'xs', color: 'pine.400', letterSpacing: 'wide', whiteSpace: 'nowrap' })}>
                {education.years}
              </span>
            </Flex>
          </Box>
        </Box>

        {/* SIGNAL LOG — personal */}
        <Box
          as="aside"
          className={css({
            paddingX: { base: 0, md: '8' },
            paddingTop: { base: '6', md: 0 },
            marginTop: { base: '6', md: 0 },
            borderTop: '1px solid',
            borderLeft: { base: 'none', md: '1px solid' },
            borderColor: 'border',
          })}
        >
          <ColHead title="Signal Log" count="live" />
          <Box>
            <LogGroup label="golf">
              <LogLine name="Holes in one" value={String(personal.holesInOne)} lit />
              <LogLine name="Sport" value={personal.sport} />
            </LogGroup>
            <LogGroup label="teams">
              {personal.teams.map((team) => (
                <LogLine key={team} name={team} value="↻" />
              ))}
            </LogGroup>
            <LogGroup label="now" last>
              <LogLine name="Current focus" value={personal.currentFocus} lit />
            </LogGroup>
          </Box>
        </Box>
      </Box>
    </>
  )
}

function ColHead({ title, count }: { title: string; count: string }) {
  return (
    <Flex
      align="baseline"
      justify="space-between"
      className={css({
        paddingBottom: '3',
        marginBottom: '2',
        borderBottom: '1px solid',
        borderColor: 'pine.600',
      })}
    >
      <h2
        className={css({
          fontFamily: 'display',
          fontSize: 'xl',
          lineHeight: 'snug',
          letterSpacing: 'wide',
          color: 'text',
        })}
      >
        {title}
      </h2>
      <span
        className={css({
          fontSize: '2xs',
          letterSpacing: 'wider',
          color: 'pine.400',
          textTransform: 'uppercase',
        })}
      >
        {count}
      </span>
    </Flex>
  )
}

function LogGroup({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <Box
      className={css({
        paddingY: '3',
        borderBottom: last ? 'none' : '1px solid',
        borderColor: 'border',
      })}
    >
      <p className={css({ fontSize: '2xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'pine.400', marginBottom: '2' })}>
        {label}
      </p>
      {children}
    </Box>
  )
}

function LogLine({ name, value, lit }: { name: string; value: string; lit?: boolean }) {
  return (
    <Flex
      align="baseline"
      justify="space-between"
      gap="3"
      className={css({
        fontSize: 'sm',
        lineHeight: 'normal',
        paddingY: '1',
        color: 'textSecondary',
      })}
    >
      <span className={css({ color: lit ? 'text' : undefined })}>{name}</span>
      <span className={css({ whiteSpace: 'nowrap', color: lit ? 'accent' : 'textMuted', fontWeight: lit ? 'medium' : 'normal' })}>
        {value}
      </span>
    </Flex>
  )
}