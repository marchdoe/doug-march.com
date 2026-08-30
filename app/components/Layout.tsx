import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import { identity } from '../content/about'

export function Layout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const variant = pathname === '/about' ? 'about' : pathname.startsWith('/work/') ? 'work' : 'home'
  const slug = pathname.startsWith('/work/') ? pathname.split('/')[2] : undefined

  return (
    <Box
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: '1.35fr 1fr' },
        minHeight: '100vh',
        alignItems: 'stretch',
        bg: 'bg',
      })}
    >
      <Sidebar variant={variant} slug={slug} />

      <Box
        as="section"
        className={css({
          bg: 'bg',
          padding: { base: '5', md: '8' },
          display: 'flex',
          flexDirection: 'column',
          minHeight: { base: 'auto', md: '100vh' },
        })}
      >
        <nav
          aria-label="Primary"
          className={css({
            display: 'flex',
            flexDirection: { base: 'row', md: 'column' },
            flexWrap: 'wrap',
            alignItems: { base: 'flex-start', md: 'flex-end' },
            gap: { base: '4 5', md: '2' },
            marginBottom: { base: '7', md: '8' },
          })}
        >
          <a
            href="/#work"
            className={css({
              fontWeight: 'medium',
              fontSize: 'md',
              color: 'textMuted',
              padding: '1',
              _hover: { color: 'accent' },
            })}
          >
            work
          </a>
          <a
            href="/about"
            className={css({
              fontWeight: 'medium',
              fontSize: 'md',
              color: 'textMuted',
              padding: '1',
              _hover: { color: 'accent' },
            })}
          >
            about
          </a>
          <a
            href="/"
            className={css({
              fontWeight: 'medium',
              fontSize: 'md',
              color: 'textMuted',
              padding: '1',
              _hover: { color: 'accent' },
            })}
          >
            index
          </a>
        </nav>

        <Box className={css({ flex: '1' })}>{children}</Box>

        <footer
          className={css({
            marginTop: '8',
            paddingTop: { base: '6', md: '7' },
            borderTop: '1px solid',
            borderColor: 'border',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3 7',
            alignItems: 'baseline',
            fontSize: 'xs',
            color: 'textMuted',
          })}
        >
          <div>
            <span
              className={css({
                fontWeight: 'bold',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
                fontSize: '2xs',
                marginRight: '2',
              })}
            >
              Contact
            </span>
            <a
              href={`mailto:${identity.email}`}
              className={css({
                color: 'textMuted',
                fontWeight: 'semibold',
                _hover: { color: 'accent' },
              })}
            >
              {identity.email}
            </a>
          </div>
          <div>
            <span
              className={css({
                fontWeight: 'bold',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
                fontSize: '2xs',
                marginRight: '2',
              })}
            >
              Now playing
            </span>
            <b className={css({ color: 'textMuted', fontWeight: 'semibold' })}>My Morning Jacket</b>
          </div>
          <div>
            <span
              className={css({
                fontWeight: 'bold',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
                fontSize: '2xs',
                marginRight: '2',
              })}
            >
              Season
            </span>
            Late summer
          </div>
          <div>
            <span
              className={css({
                fontWeight: 'bold',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
                fontSize: '2xs',
                marginRight: '2',
              })}
            >
              Build
            </span>
            #2026.08.30 · 04:12 EDT
          </div>
          <div className={css({ width: '100%', color: 'textFaint', fontStyle: 'italic' })}>
            Hacker News, overheard: &ldquo;No AI Fridays&rdquo; — so this shipped Saturday.
          </div>
        </footer>
      </Box>
    </Box>
  )
}
