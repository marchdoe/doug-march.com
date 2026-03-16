import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Layout } from '../components/Layout'
import { Bio } from '../components/Bio'
import { Timeline } from '../components/Timeline'
import { Capabilities } from '../components/Capabilities'
import { Personal } from '../components/Personal'
import { SectionHead } from '../components/SectionHead'
import { timeline, capabilities } from '../content/timeline'
import { identity, personal } from '../content/about'

// ─── Page styles ──────────────────────────────────────────────────────────────

const pageStack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10',
})

const sectionDivider = css({
  borderTop: '1px solid',
  borderColor: 'border.DEFAULT',
  pt: '8',
})

// ─── Page component ───────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <Layout>
      <div className={pageStack}>

        {/* ── Bio — the identity statement ──────────── */}
        <section>
          <Bio identity={identity} />
        </section>

        {/* ── Capabilities — the craft inventory ─────── */}
        <section className={sectionDivider}>
          <SectionHead label="Capabilities" />
          <Capabilities items={capabilities} />
        </section>

        {/* ── Timeline — the record of work ─────────── */}
        <section className={sectionDivider}>
          <SectionHead label="Timeline" />
          <Timeline items={timeline} />
        </section>

        {/* ── Personal — what exists outside work ─────── */}
        <section className={sectionDivider}>
          <SectionHead label="Beyond Work" />
          <Personal data={personal} />
        </section>

      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})