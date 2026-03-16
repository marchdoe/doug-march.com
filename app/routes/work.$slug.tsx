import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { projects } from '../content/projects'

// ─── Styles ───────────────────────────────────────────────────────────────────

const projectHeader = css({
  mb: '8',
  borderBottom: '1px solid',
  borderColor: 'border.DEFAULT',
  pb: '8',
})

const projectLabel = css({
  fontFamily: 'mono',
  fontSize: '2xs',
  fontWeight: 'bold',
  letterSpacing: 'ruled',
  textTransform: 'uppercase',
  color: 'text.dim',
  mb: '4',
  display: 'flex',
  gap: '4',
  flexWrap: 'wrap',
  alignItems: 'center',
})

const labelDot = css({
  color: 'border.mid',
  fontFamily: 'mono',
})

const projectTitle = css({
  fontFamily: 'serif',
  fontSize: 'xl',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  lineHeight: 'tight',
  color: 'text.DEFAULT',
  mb: '5',
})

const projectProblem = css({
  fontFamily: 'serif',
  fontSize: 'md',
  lineHeight: 'normal',
  color: 'text.mid',
  maxWidth: '62ch',
  mb: '6',
})

const projectMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.dim',
  letterSpacing: 'wide',
})

const metaItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
})

const metaKey = css({
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  fontSize: '2xs',
  color: 'text.dim',
})

const metaVal = css({
  color: 'text.mid',
  fontFamily: 'mono',
  fontSize: 'sm',
})

const externalLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'accent.DEFAULT',
  borderBottom: '1px solid',
  borderColor: 'accent.dim',
  pb: '1',
  textDecoration: 'none',
  transition: 'color 0.12s ease, border-color 0.12s ease',
  _hover: {
    color: 'text.DEFAULT',
    borderColor: 'border.mid',
  },
  mt: '5',
  alignSelf: 'flex-start',
})

const notFoundStyles = css({
  fontFamily: 'serif',
  fontSize: 'md',
  color: 'text.mid',
  py: '10',
})

const backLink = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'text.dim',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  mb: '8',
  _hover: { color: 'accent.DEFAULT' },
  transition: 'color 0.12s ease',
})

const projectBody = css({
  fontFamily: 'serif',
  fontSize: 'base',
  lineHeight: 'normal',
  color: 'text.DEFAULT',
  maxWidth: '65ch',
})

// ─── Page component ───────────────────────────────────────────────────────────

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Layout>
        <a href="/" className={backLink}>← All Work</a>
        <div className={notFoundStyles}>
          Project not found.
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* ── Navigation back ──────────────────────── */}
      <a href="/" className={backLink}>← All Work</a>

      {/* ── Project header ───────────────────────── */}
      <header className={projectHeader}>
        <div className={projectLabel}>
          <span>{project.type}</span>
          {project.year && (
            <>
              <span className={labelDot}>·</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h1 className={projectTitle}>{project.title}</h1>

        {project.problem && (
          <p className={projectProblem}>{project.problem}</p>
        )}

        {/* Meta grid: role, year, type */}
        <div className={projectMeta}>
          {project.year && (
            <div className={metaItem}>
              <span className={metaKey}>Year</span>
              <span className={metaVal}>{project.year}</span>
            </div>
          )}
          {project.type && (
            <div className={metaItem}>
              <span className={metaKey}>Type</span>
              <span className={metaVal}>{project.type}</span>
            </div>
          )}
        </div>

        {/* External link */}
        {project.url && (
          <a
            href={project.url}
            className={externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project ↗
          </a>
        )}
      </header>

      {/* ── Project body ─────────────────────────── */}
      {project.description && (
        <div className={projectBody}>
          <p>{project.description}</p>
        </div>
      )}
    </Layout>
  )
}

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
})