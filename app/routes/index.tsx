import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Grid, Flex } from '../../styled-system/jsx'
import { Layout } from '../components/Layout'
import { FeaturedProject } from '../components/FeaturedProject'
import { SelectedWork } from '../components/SelectedWork'
import { Experiments } from '../components/Experiments'
import { SectionHead } from '../components/SectionHead'
import { featuredProject, selectedWork, experiments } from '../content/projects'

// ─── Signal styles ────────────────────────────────────────────────────────────

const signalsGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
  gap: '3',
  my: '8',
})

const signalCard = css({
  bg: 'bg.card',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.DEFAULT',
  borderRadius: '2px',
  p: '4',
  position: 'relative',
  overflow: 'hidden',
})

const signalLabel = css({
  fontFamily: 'mono',
  fontSize: '2xs',
  fontWeight: 'bold',
  letterSpacing: 'ruled',
  textTransform: 'uppercase',
  color: 'text.dim',
  mb: '2',
})

const signalValue = css({
  fontFamily: 'serif',
  fontSize: 'lg',
  fontWeight: 'bold',
  lineHeight: 'tight',
  letterSpacing: 'tight',
})

const signalNote = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.mid',
  mt: '2',
  lineHeight: 'snug',
})

// Tigers: loud amber — circled with a Sharpie
const tigersCard = css({
  bg: 'signal.winDim',
  borderColor: 'signal.win',
})

const tigersScore = css({
  color: 'signal.win',
  fontSize: 'xl',
  fontFamily: 'mono',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  lineHeight: 'tight',
})

const tigersDetail = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'text.mid',
  mt: '1',
})

// Golf: understated prestige — clean leaderboard energy
const golfCard = css({
  borderColor: 'border.mid',
})

const golfLeader = css({
  fontFamily: 'serif',
  fontSize: 'md',
  fontWeight: 'bold',
  color: 'text.DEFAULT',
  lineHeight: 'snug',
})

const golfScore = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'signal.win',
  fontWeight: 'bold',
  mt: '1',
})

const golfEvent = css({
  fontFamily: 'mono',
  fontSize: '2xs',
  color: 'text.dim',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  mt: '2',
})

// Market: small green — check once and move on
const marketCard = css({
  bg: 'signal.greenDim',
  borderColor: 'accent.DEFAULT',
})

const marketValue = css({
  color: 'signal.green',
  fontFamily: 'mono',
  fontSize: 'lg',
  fontWeight: 'bold',
})

// St. Patrick's eve: tomorrow's green arriving today
const stPatrickCard = css({
  bg: 'accent.glow',
  borderColor: 'border.accent',
  borderWidth: '2px',
})

const stPatrickText = css({
  color: 'accent.DEFAULT',
  fontFamily: 'serif',
  fontSize: 'md',
  fontWeight: 'bold',
  lineHeight: 'snug',
})

// ─── Quote styles ─────────────────────────────────────────────────────────────

const quoteSection = css({
  my: '12',
  px: { base: '0', md: '6' },
  // New moon darkness: generous negative space around the quote
})

const quoteText = css({
  fontFamily: 'serif',
  fontSize: 'md',
  fontStyle: 'italic',
  lineHeight: 'loose',
  color: 'text.mid',
  maxWidth: '52ch',
  // Slight left border echo of the sidebar's fern accent
  borderLeft: '2px solid',
  borderColor: 'border.accent',
  paddingLeft: '5',
})

const quoteAttrib = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.dim',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  mt: '4',
  paddingLeft: '5',
})

// ─── Music signal ─────────────────────────────────────────────────────────────

const musicLine = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.dim',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  borderTop: '1px solid',
  borderColor: 'border.DEFAULT',
  pt: '4',
  mt: '8',
  mb: '8',
  display: 'flex',
  gap: '6',
  flexWrap: 'wrap',
})

const musicItem = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  _before: {
    content: '"♪"',
    color: 'text.dim',
    fontFamily: 'serif',
  },
})

// ─── Small web note ───────────────────────────────────────────────────────────

const smallWebNote = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.dim',
  borderTop: '1px solid',
  borderColor: 'border.DEFAULT',
  pt: '4',
  mt: '8',
  lineHeight: 'normal',
  maxWidth: '60ch',
})

const smallWebLink = css({
  color: 'accent.DEFAULT',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
})

// ─── Page component ───────────────────────────────────────────────────────────

function HomePage() {
  return (
    <Layout>
      {/* ── Featured Project ─────────────────────────── */}
      <FeaturedProject project={featuredProject} />

      {/* ── Today's Signals ──────────────────────────── */}
      {/* Integrated with the portfolio — this site redesigns itself daily.
          These signals are today's context, not decoration. */}
      <div className={signalsGrid}>

        {/* Tigers — loud, almost garish. 13 runs. */}
        <div className={`${signalCard} ${tigersCard}`}>
          <div className={signalLabel}>Tigers</div>
          <div className={tigersScore}>13–6</div>
          <div className={tigersDetail}>DET defeats OPP</div>
          <div className={signalNote}>13 runs. Someone circled this in the paper.</div>
        </div>

        {/* Cameron Young — understated prestige */}
        <div className={`${signalCard} ${golfCard}`}>
          <div className={signalLabel}>THE PLAYERS Championship</div>
          <div className={golfLeader}>Cameron Young</div>
          <div className={golfScore}>−13</div>
          <div className={golfEvent}>TPC Sawgrass · Winner</div>
        </div>

        {/* Market — small, genuine, move on */}
        <div className={`${signalCard} ${marketCard}`}>
          <div className={signalLabel}>Market</div>
          <div className={marketValue}>+1.0%</div>
          <div className={signalNote}>Genuine green. Check once and move on.</div>
        </div>

        {/* St. Patrick's eve — green arriving at the margin */}
        <div className={`${signalCard} ${stPatrickCard}`}>
          <div className={signalLabel}>Tomorrow</div>
          <div className={stPatrickText}>St. Patrick's Day</div>
          <div className={signalNote}>The green is arriving. Not here yet. Close.</div>
        </div>
      </div>

      {/* ── Selected Work ─────────────────────────────── */}
      <SelectedWork projects={selectedWork} />

      {/* ── Lao Tzu quote — alone in the new moon darkness ── */}
      <div className={quoteSection}>
        <blockquote className={quoteText}>
          "Do you have the patience to wait until your mud settles and the water is clear?"
        </blockquote>
        <div className={quoteAttrib}>— Lao Tzu &nbsp;·&nbsp; Mon 2026-03-16</div>
      </div>

      {/* ── Experiments ───────────────────────────────── */}
      <Experiments projects={experiments} />

      {/* ── Music thread — rough, warm, hand-touched ──── */}
      <div className={musicLine}>
        <span className={musicItem}>My Morning Jacket</span>
        <span className={musicItem}>Guided by Voices</span>
      </div>

      {/* ── Small web meta-note ───────────────────────── */}
      <div className={smallWebNote}>
        This portfolio redesigns itself daily from weather, sports, and signals.
        {' '}<a
          href="https://news.ycombinator.com/item?id=0"
          className={smallWebLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          The small web is bigger than you might think.
        </a>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})