import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { FeaturedProject } from '../components/FeaturedProject'
import { SelectedWork } from '../components/SelectedWork'
import { Experiments } from '../components/Experiments'
import { SectionHead } from '../components/SectionHead'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({ component: Home })

// ─── Page grid: main content left, signals panel right ───────────────────────

const PageGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 252px',
    columnGap: '10',
    alignItems: 'start',
    _mobile: {
      display: 'block',
    },
  },
})

const MainCol = styled('div', {
  base: {},
})

const SignalsCol = styled('aside', {
  base: {
    position: 'sticky',
    top: '3.5rem',
    alignSelf: 'start',
    _mobile: {
      position: 'static',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'border',
      paddingTop: '8',
      marginTop: '8',
    },
  },
})

const Gap = styled('div', { base: { marginTop: '10' } })

const ContactLine = styled('div', {
  base: {
    marginTop: '10',
    paddingTop: '5',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
  },
})

const ContactLink = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'accent',
    letterSpacing: 'widest',
    opacity: '0.4',
    transitionProperty: 'opacity',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { opacity: '1' },
  },
})

// ─── Signals panel styles ────────────────────────────────────────────────────

const SignalsHeader = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '4',
    paddingBottom: '3',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const SignalsLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    opacity: '0.3',
  },
})

const SignalsDate = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.2',
    letterSpacing: 'wide',
  },
})

const MarketNote = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.22',
    letterSpacing: 'wide',
    marginBottom: '5',
    paddingBottom: '4',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

// Players Championship

const PlayersBlock = styled('div', {
  base: {
    marginBottom: '5',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const PlayersLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent',
    opacity: '0.55',
    marginBottom: '2',
  },
})

const PlayersHeadline = styled('div', {
  base: {
    fontSize: 'md',
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontWeight: 'regular',
    color: 'text',
    lineHeight: 'tight',
    letterSpacing: 'tight',
    marginBottom: '4',
  },
})

const Leaderboard = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const LeaderRow = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1rem 1fr auto',
    alignItems: 'baseline',
    gap: '2',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
  },
})

const LeaderPos = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.25',
    textAlign: 'right',
  },
})

const LeaderName = styled('span', {
  base: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 'sm',
    color: 'text.dim',
    opacity: '0.45',
  },
  variants: {
    leader: { true: { color: 'text', opacity: '1' } },
  },
})

const LeaderRight = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2',
  },
})

const LeaderScore = styled('span', {
  base: {
    fontFamily: 'mono',
    fontWeight: 'bold',
    fontSize: 'xs',
    color: 'text.dim',
    opacity: '0.3',
  },
  variants: {
    leader: { true: { color: 'accent', opacity: '1' } },
  },
})

const WinBadge = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'accent',
    opacity: '0.6',
  },
})

// Sports scores

const SportBlock = styled('div', {
  base: {
    marginBottom: '3',
  },
})

const SportLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    letterSpacing: 'widest',
    color: 'text.dim',
    opacity: '0.22',
    marginBottom: '2',
  },
})

const ScoreLine = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2',
    marginBottom: '1',
  },
})

const ScoreTeam = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text.dim',
    opacity: '0.4',
  },
})

const ScoreNum = styled('span', {
  base: {
    fontFamily: 'mono',
    fontWeight: 'bold',
    fontSize: 'base',
    color: 'text.dim',
    opacity: '0.22',
  },
  variants: {
    winner: { true: { fontSize: 'lg', color: 'text.mid', opacity: '0.8' } },
  },
})

const ScoreSep = styled('span', {
  base: {
    fontSize: 'xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.15',
  },
})

const ScoreNote = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.22',
    letterSpacing: 'wide',
    fontStyle: 'italic',
    marginBottom: '4',
  },
})

const PistonsLine = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.16',
    letterSpacing: 'wide',
    marginBottom: '5',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const PatricksBlock = styled('div', {
  base: {
    marginBottom: '5',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const PatricksText = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.5',
    letterSpacing: 'wide',
    lineHeight: 'snug',
  },
})

const PatricksEmph = styled('span', {
  base: {
    color: '{colors.sage.shamrock}',
    opacity: '0.9',
  },
})

const PatricksIcon = styled('span', {
  base: {
    color: '{colors.sage.shamrock}',
    marginRight: '2',
  },
})

const QuoteBlock = styled('blockquote', {
  base: {
    paddingLeft: '3',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'accent',
    opacity: '0.4',
  },
})

const QuoteText = styled('p', {
  base: {
    fontSize: 'xs',
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: 'text.mid',
    lineHeight: 'snug',
    marginBottom: '2',
  },
})

const QuoteAttrib = styled('cite', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    letterSpacing: 'wider',
    fontStyle: 'normal',
    opacity: '0.55',
  },
})

// ─── Component ───────────────────────────────────────────────────────────────

function Home() {
  return (
    <Layout>
      <PageGrid>
        <MainCol>
          <FeaturedProject />
          <SectionHead label="SELECTED WORK" />
          <SelectedWork />
          <Gap />
          <SectionHead label="EXPERIMENTS" />
          <Experiments />
          <ContactLine>
            <ContactLink href="mailto:doug@doug-march.com">GET IN TOUCH →</ContactLink>
          </ContactLine>
        </MainCol>

        <SignalsCol>
          <SignalsHeader>
            <SignalsLabel>SIGNALS</SignalsLabel>
            <SignalsDate>MON · MAR 16</SignalsDate>
          </SignalsHeader>

          <MarketNote>SPX −0.57% · market dragging</MarketNote>

          <PlayersBlock>
            <PlayersLabel>THE PLAYERS CHAMPIONSHIP · FINAL</PlayersLabel>
            <PlayersHeadline>Cameron Young wins at −13</PlayersHeadline>
            <Leaderboard>
              <LeaderRow>
                <LeaderPos>1</LeaderPos>
                <LeaderName leader={true}>C. Young</LeaderName>
                <LeaderRight>
                  <WinBadge>W</WinBadge>
                  <LeaderScore leader={true}>−13</LeaderScore>
                </LeaderRight>
              </LeaderRow>
              <LeaderRow>
                <LeaderPos>2</LeaderPos>
                <LeaderName>M. Fitzpatrick</LeaderName>
                <LeaderRight>
                  <LeaderScore>−12</LeaderScore>
                </LeaderRight>
              </LeaderRow>
              <LeaderRow>
                <LeaderPos>3</LeaderPos>
                <LeaderName>X. Schauffele</LeaderName>
                <LeaderRight>
                  <LeaderScore>−11</LeaderScore>
                </LeaderRight>
              </LeaderRow>
            </Leaderboard>
          </PlayersBlock>

          <SportBlock>
            <SportLabel>BASEBALL · SPRING TRAINING</SportLabel>
            <ScoreLine>
              <ScoreTeam>DET</ScoreTeam>
              <ScoreNum winner={true}>12</ScoreNum>
              <ScoreSep>—</ScoreSep>
              <ScoreNum>1</ScoreNum>
              <ScoreTeam>ATL</ScoreTeam>
            </ScoreLine>
            <ScoreNote>not close. not even a little.</ScoreNote>
          </SportBlock>

          <PistonsLine>PIS 108 · 119 — L. moving on.</PistonsLine>

          <PatricksBlock>
            <PatricksText>
              <PatricksIcon>☘</PatricksIcon>
              <PatricksEmph>ST. PATRICK&apos;S DAY</PatricksEmph>
              {' '}TOMORROW · MAR 17
            </PatricksText>
          </PatricksBlock>

          <QuoteBlock>
            <QuoteText>
              &ldquo;I will love the light for it shows me the way, yet I will endure the darkness because it shows me the stars.&rdquo;
            </QuoteText>
            <QuoteAttrib>— Og Mandino</QuoteAttrib>
          </QuoteBlock>
        </SignalsCol>
      </PageGrid>
    </Layout>
  )
}
