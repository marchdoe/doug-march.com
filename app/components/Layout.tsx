import React from 'react'
import { Box, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

/**
 * Layout Architecture: Ruled-Ledger Split
 *
 * A narrow identity strip (220px) holds identity + nav on the left,
 * separated from the main content by a fern-green border — the green
 * creeping in at the margin before St. Patrick's Day arrives.
 *
 * The sidebar is sticky on desktop (like a page margin on a ruled notebook),
 * the main content scrolls freely. On mobile, the sidebar collapses —
 * the Sidebar component handles its own mobile presentation.
 *
 * The deep fog.800 background on main and fog.900 on side creates the
 * near-new-moon darkness the brief calls for. Structure is tight and
 * purposeful (Monday workweek grid energy) but not cold — there's
 * breathing room in the padding and the max-width keeps body text
 * comfortably under 75 characters.
 */

interface LayoutProps {
  children: React.ReactNode
}

const sidebarWrapStyles = css({
  position: { base: 'static', lg: 'sticky' },
  top: '0',
  height: { base: 'auto', lg: '100vh' },
  overflow: { lg: 'hidden' },
  bg: 'bg.side',
  // The fern accent border — St. Patrick's eve green arriving at the left edge
  borderBottomWidth: { base: '1px', lg: '0' },
  borderRightWidth: { base: '0', lg: '1px' },
  borderStyle: 'solid',
  borderColor: 'border.accent',
  zIndex: '10',
  flexShrink: '0',
})

const mainStyles = css({
  minHeight: '100vh',
  px: { base: '5', md: '8', lg: '10' },
  pt: { base: '6', md: '8', lg: '10' },
  pb: { base: '10', lg: '12' },
  // Keep line length readable — max ~75ch for body text
  maxWidth: '860px',
  width: '100%',
})

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      minHeight="100vh"
      bg="bg"
      className={css({
        display: 'flex',
        flexDirection: { base: 'column', lg: 'row' },
        alignItems: 'flex-start',
      })}
    >
      {/* Sidebar: identity strip + nav, sticky on desktop */}
      <Box
        className={sidebarWrapStyles}
        width={{ base: '100%', lg: '220px' }}
        minWidth={{ lg: '220px' }}
      >
        <Sidebar />
      </Box>

      {/* Main content: scrollable, ruled breathing room */}
      <Box
        as="main"
        className={mainStyles}
        flex="1"
      >
        {children}
      </Box>
    </Box>
  )
}