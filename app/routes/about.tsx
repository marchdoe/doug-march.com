import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '2xs',
  fontWeight: 'bold',
  letterSpacing: 'widest',
  color: 'textMuted',
  textTransform: 'uppercase',
})

function AboutPage() {
  return (
    <>
      {/* ── NAME SPECIMEN ──────────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 64px 0 64px',
          position: 'relative',
        }}
      >
        <h1
          className={css({
            fontFamily: 'heading',
            fontWeight: 'black',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            textTransform: 'uppercase',
            margin: '0',
          })}
          style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
        >
          {identity.name.split(' ')[0]}
          <br />
          {identity.name.split(' ').slice(1).join(' ')}
        </h1>

        {/* Rule + role + statement */}
        <Box
          style={{
            borderTop: '1px solid #CBD1D8',
            marginTop: '32px',
            paddingTop: '24px',
            display: 'flex',
            gap: '64px',
            alignItems: 'flex-start',
          }}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'regular',
              letterSpacing: 'widest',
              color: 'textMuted',
              textTransform: 'uppercase',
            })}
            style={{ minWidth: '160px', paddingTop: '3px' }}
          >
            {identity.role}
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: 'md',
              fontWeight: 'light',
              color: 'textSecondary',
              lineHeight: 'normal',
            })}
            style={{ maxWidth: '600px' }}
          >
            {identity.statement}
          </Box>
        </Box>
      </Box>

      {/* ── EXPERIENCE TIMELINE ────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 64px 0 64px',
          borderTop: '1px solid #CBD1D8',
          marginTop: '64px',
        }}
      >
        <Box className={sectionLabel} style={{ marginBottom: '8px' }}>
          Experience
        </Box>

        {timeline.map((entry, i) => (
          <Flex
            key={`${entry.year}-${entry.company}-${i}`}
            style={{
              borderBottom: '1px solid #CBD1D8',
              padding: '20px 8px',
              gap: '32px',
              alignItems: 'flex-start',
            }}
          >
            {/* Year */}
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'xs',
                fontWeight: 'light',
                color: 'textMuted',
                letterSpacing: 'wide',
              })}
              style={{ minWidth: '48px', paddingTop: '3px' }}
            >
              {entry.year}
            </Box>

            {/* Content */}
            <Box style={{ flex: '1' }}>
              <Flex justifyContent="space-between" alignItems="baseline" style={{ marginBottom: '4px' }}>
                <Box
                  className={css({
                    fontFamily: 'heading',
                    fontSize: 'base',
                    fontWeight: 'bold',
                    color: 'text',
                    textTransform: 'uppercase',
                    letterSpacing: 'tight',
                  })}
                >
                  {entry.role}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: 'xs',
                    fontWeight: 'light',
                    color: 'textMuted',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                  })}
                >
                  {entry.company}
                  {entry.current && (
                    <Box
                      as="span"
                      className={css({
                        fontFamily: 'body',
                        fontSize: '2xs',
                        fontWeight: 'bold',
                        letterSpacing: 'widest',
                        color: 'accent',
                        textTransform: 'uppercase',
                      })}
                      style={{ marginLeft: '12px' }}
                    >
                      Now
                    </Box>
                  )}
                </Box>
              </Flex>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: 'sm',
                  fontWeight: 'light',
                  color: 'textSecondary',
                  lineHeight: 'normal',
                })}
                style={{ maxWidth: '520px' }}
              >
                {entry.description}
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* ── CAPABILITIES ───────────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 64px 0 64px',
        }}
      >
        <Box className={sectionLabel} style={{ marginBottom: '24px' }}>
          Capabilities
        </Box>
        <Flex gap="2" style={{ flexWrap: 'wrap' }}>
          {capabilities.map((cap) => (
            <Box
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: 'xs',
                fontWeight: 'light',
                color: 'textSecondary',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                border: '1px solid',
                borderColor: 'border',
              })}
              style={{ padding: '6px 12px' }}
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* ── EDUCATION ──────────────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 64px 0 64px',
        }}
      >
        <Box className={sectionLabel} style={{ marginBottom: '24px' }}>
          Education
        </Box>
        <Flex
          style={{
            borderTop: '1px solid #CBD1D8',
            paddingTop: '20px',
            gap: '32px',
            alignItems: 'flex-start',
          }}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'light',
              color: 'textMuted',
              letterSpacing: 'wide',
            })}
            style={{ minWidth: '48px', paddingTop: '3px' }}
          >
            {education.years}
          </Box>
          <Box>
            <Box
              className={css({
                fontFamily: 'heading',
                fontSize: 'base',
                fontWeight: 'bold',
                color: 'text',
                textTransform: 'uppercase',
                letterSpacing: 'tight',
              })}
            >
              {education.school}
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'sm',
                fontWeight: 'light',
                color: 'textSecondary',
                lineHeight: 'normal',
              })}
              style={{ marginTop: '4px' }}
            >
              {education.degree}
              {education.concentration && ` · ${education.concentration}`}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* ── PERSONAL ───────────────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 64px 96px 64px',
        }}
      >
        <Box className={sectionLabel} style={{ marginBottom: '24px' }}>
          Off the Clock
        </Box>
        <Box
          style={{
            borderTop: '1px solid #CBD1D8',
            paddingTop: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '32px',
          }}
        >
          <Box>
            <Box className={css({ fontFamily: 'body', fontSize: '2xs', fontWeight: 'bold', letterSpacing: 'widest', color: 'textMuted', textTransform: 'uppercase' })} style={{ marginBottom: '8px' }}>
              Sport
            </Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary' })}>
              {personal.sport}
            </Box>
          </Box>
          <Box>
            <Box className={css({ fontFamily: 'body', fontSize: '2xs', fontWeight: 'bold', letterSpacing: 'widest', color: 'textMuted', textTransform: 'uppercase' })} style={{ marginBottom: '8px' }}>
              Holes in One
            </Box>
            <Box
              className={css({ fontFamily: 'heading', fontWeight: 'bold', color: 'text', lineHeight: 'snug', textTransform: 'uppercase' })}
              style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
            >
              {personal.holesInOne}
            </Box>
          </Box>
          <Box>
            <Box className={css({ fontFamily: 'body', fontSize: '2xs', fontWeight: 'bold', letterSpacing: 'widest', color: 'textMuted', textTransform: 'uppercase' })} style={{ marginBottom: '8px' }}>
              Teams
            </Box>
            {personal.teams.map((team) => (
              <Box key={team} className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary', lineHeight: 'loose' })}>
                {team}
              </Box>
            ))}
          </Box>
          <Box>
            <Box className={css({ fontFamily: 'body', fontSize: '2xs', fontWeight: 'bold', letterSpacing: 'widest', color: 'textMuted', textTransform: 'uppercase' })} style={{ marginBottom: '8px' }}>
              Current Focus
            </Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary', lineHeight: 'normal' })}>
              {personal.currentFocus}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}