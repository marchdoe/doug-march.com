import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Badge } from '../components/Badge'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const rowClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'minmax(120px, 120px) minmax(0, 2fr) minmax(0, 3fr)' },
  gap: '3',
  alignItems: 'baseline',
  paddingY: '3',
  borderBottom: '1px solid rgba(255,196,0,0.18)',
})

const yearClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'sm',
  color: 'primary.300',
  fontVariantNumeric: 'tabular-nums',
  minWidth: { base: 'auto', md: '120px' },
})

const roleClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'sm',
  color: 'surfaceText',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
})

const descClass = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'sm',
  color: 'neutral.300',
  lineHeight: 'normal',
})

const sectionTitleClass = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'surfaceText',
  borderBottom: '2px solid',
  borderColor: 'accent',
  paddingBottom: '3',
  marginBottom: '2',
  marginTop: '10',
})

function AboutPage() {
  return (
    <>
      <Badge
        href="/"
        ariaLabel="Back to poster"
        kicker="Doug March · Spec Sheet"
        lead="Back to poster"
        sub="Return to the daily build"
      />

      <Box as="main" className={css({ padding: { base: '0 6vw', md: '0 6vw' } })}>
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: { base: 'xs', md: 'sm' },
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textSecondary',
            marginBottom: '4',
          })}
        >
          {identity.role}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: 'tight',
            lineHeight: 'tight',
            fontSize: 'clamp(40px, 7vw, 96px)',
            color: 'text',
            marginBottom: '6',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: { base: 'base', md: 'md' },
            color: 'textSecondary',
            maxWidth: '65ch',
            lineHeight: 'normal',
            marginBottom: '12',
          })}
        >
          {identity.statement}
        </p>

        <Box background="surface" color="surfaceText" padding={{ base: '6', md: '8' }} borderTop="3px solid" borderColor="border">
          <div className={sectionTitleClass}>Timeline</div>
          {timeline.map((entry) => (
            <div className={rowClass} key={`${entry.year}-${entry.company}`}>
              <span className={yearClass}>{entry.year}</span>
              <span className={roleClass}>
                {entry.role} · {entry.company}
                {entry.current ? ' — current' : ''}
              </span>
              <span className={descClass}>{entry.description}</span>
            </div>
          ))}

          <div className={sectionTitleClass}>Capabilities</div>
          <Flex wrap="wrap" gap="2" paddingBottom="4">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'bold',
                  fontSize: '2xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'surfaceText',
                  border: '1px solid',
                  borderColor: 'accent',
                  padding: '1.5 3',
                })}
              >
                {cap}
              </span>
            ))}
          </Flex>

          <div className={sectionTitleClass}>Education</div>
          <div className={rowClass} style={undefined}>
            <span className={yearClass}>{education.years}</span>
            <span className={roleClass}>
              {education.school} · {education.degree}
            </span>
            <span className={descClass}>{education.concentration}</span>
          </div>

          <div className={sectionTitleClass}>Personal</div>
          <div className={rowClass}>
            <span className={yearClass}>Holes-in-one</span>
            <span className={roleClass}>{personal.holesInOne}</span>
            <span className={descClass}>Sport: {personal.sport}</span>
          </div>
          <div className={rowClass}>
            <span className={yearClass}>Teams</span>
            <span className={roleClass}>{personal.teams.join(' · ')}</span>
            <span className={descClass}>Current focus: {personal.currentFocus}</span>
          </div>
        </Box>
      </Box>
    </>
  )
}