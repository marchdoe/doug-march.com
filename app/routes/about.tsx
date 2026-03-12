import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { timeline, capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/about')({
  component: About,
})

const Intro = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '10',
  },
})

const IntroLabel = styled('div', {
  base: {
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '3',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: { content: '"//"', color: 'accent' },
  },
})

const IntroText = styled('p', {
  base: {
    fontSize: '0.75rem',
    color: 'text.mid',
    lineHeight: '2',
    fontStyle: 'italic',
    maxWidth: '560px',
    '& strong': { color: 'text', fontStyle: 'normal' },
  },
})

const TlItem = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '80px 1px 1fr',
    gap: '0 6',
  },
})

const TlYear = styled('div', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    paddingTop: '4',
    paddingBottom: '4',
    textAlign: 'right',
  },
})

const TlLineWrap = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const TlDot = styled('div', {
  base: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'logo.blueDim',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blue',
    marginTop: '1.1rem',
    flexShrink: '0',
  },
  variants: {
    current: {
      true: {
        background: 'logo.green',
        borderColor: 'logo.green',
        boxShadow: '0 0 8px var(--colors-logo-green)',
      },
    },
  },
})

const TlRule = styled('div', {
  base: {
    flex: '1',
    width: '1px',
    background: 'logo.blueDim',
  },
})

const TlContent = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const TlRole = styled('div', {
  base: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    marginBottom: '0.2rem',
  },
})

const TlCompany = styled('div', {
  base: {
    fontSize: 'sm',
    color: 'accent.dim',
    marginBottom: '0.4rem',
  },
  variants: {
    current: {
      true: { color: 'logo.green' },
    },
  },
})

const TlDesc = styled('div', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    lineHeight: '1.7',
    fontStyle: 'italic',
  },
})

const SkillsGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2',
    marginTop: '10',
  },
})

const Skill = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    textTransform: 'uppercase',
  },
})

function About() {
  return (
    <Layout>
      <Intro>
        <IntroLabel>ABOUT</IntroLabel>
        <IntroText>
          I'm a <strong>designer and developer</strong> who builds products from first
          principles — from idea through design, engineering, and launch. Currently
          focused on <strong>Spaceman</strong>, building tools for aerospace teams.
          <br /><br />
          I care about craft, clarity, and products that actually get used.
        </IntroText>
      </Intro>

      <SectionHead label="BACKGROUND" />

      <div>
        {timeline.map((entry) => (
          <TlItem key={entry.year}>
            <TlYear>{entry.year}</TlYear>
            <TlLineWrap>
              <TlDot current={entry.current ? true : undefined} />
              <TlRule />
            </TlLineWrap>
            <TlContent>
              <TlRole>{entry.role}</TlRole>
              <TlCompany current={entry.current ? true : undefined}>{entry.company}</TlCompany>
              <TlDesc>{entry.description}</TlDesc>
            </TlContent>
          </TlItem>
        ))}
      </div>

      <SectionHead label="CAPABILITIES" />
      <SkillsGrid>
        {capabilities.map((skill) => (
          <Skill key={skill}>{skill}</Skill>
        ))}
      </SkillsGrid>
    </Layout>
  )
}
