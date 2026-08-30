import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { BrandLockup } from './BrandLockup'
import { personal } from '../content/about'
import { capabilities, education } from '../content/timeline'
import { projects } from '../content/projects'

export type SidebarVariant = 'home' | 'about' | 'work'

function Brand() {
  // The lockup is BrandLockup's, not this file's. It was a hand-built mark +
  // wordmark here, and it kept going wrong: `width: '11'` meant a spacing token
  // that does not exist, so Panda shipped an 11px mark against a mockup that
  // had it at 44px. #252 patched that to a literal 44px, which fixes the
  // symptom and leaves the cause — a size typed by hand into a file a model
  // rewrites every night. Size, weight, tracking and cap-height alignment now
  // come from the component, derived from the day's chassis (#254). The colour
  // comes from the surrounding field.
  return <BrandLockup variant="horizontal-md" mode="single-color" roleLine className={brandTint} />
}

const brandTint = css({ color: 'fieldInk' })

function FootItem({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div
        className={css({
          fontSize: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'gold.800',
          fontWeight: 'semibold',
        })}
      >
        {k}
      </div>
      <div
        className={css({ fontSize: 'sm', color: 'fieldInk', fontWeight: 'medium', marginTop: '1' })}
      >
        {v}
      </div>
    </div>
  )
}

function HomeHero() {
  return (
    <div className={css({ margin: { base: '6 0', md: '7 0' } })}>
      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'gold.800',
          marginBottom: '4',
        })}
      >
        The busy man — rebuilt nightly
      </p>
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'hero',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'fieldInk',
          textTransform: 'uppercase',
        })}
      >
        <span className={css({ display: 'block' })}>Select</span>
        <span className={css({ display: 'block' })}>a busy</span>
        <span className={css({ display: 'block' })}>man.</span>
      </h1>
    </div>
  )
}

function HomeFoot() {
  return (
    <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '5 8', alignItems: 'baseline' })}>
      <FootItem k="Detroit" v="Sunny · 84°F" />
      <FootItem k="Moon" v="Waning gibbous · 88%" />
      <FootItem k="Today" v="Sat · Aug 30, 2026" />
    </div>
  )
}

function AboutField() {
  return (
    <div className={css({ margin: { base: '6 0', md: '7 0' }, flex: '1' })}>
      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'gold.800',
          marginBottom: '4',
        })}
      >
        Capabilities
      </p>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', marginBottom: '7' })}>
        {capabilities.map((c) => (
          <span
            key={c}
            className={css({
              fontSize: '2xs',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'fieldInk',
              border: '1px solid',
              borderColor: 'gold.600',
              padding: '1 2',
            })}
          >
            {c}
          </span>
        ))}
      </div>

      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'gold.800',
          marginBottom: '3',
        })}
      >
        Education
      </p>
      <div className={css({ borderTop: '1px solid', borderColor: 'gold.600' })}>
        <div
          className={css({
            padding: '3 0',
            borderBottom: '1px solid',
            borderColor: 'gold.600',
          })}
        >
          <div className={css({ fontWeight: 'bold', fontSize: 'sm', color: 'fieldInk' })}>
            {education.school}
          </div>
          <div className={css({ fontSize: 'xs', color: 'gold.800', marginTop: '1' })}>
            {education.degree} · {education.concentration}
          </div>
          <div
            className={css({
              fontSize: '2xs',
              letterSpacing: 'wide',
              color: 'gold.800',
              marginTop: '1',
            })}
          >
            {education.years}
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutFoot() {
  return (
    <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4 7', alignItems: 'baseline' })}>
      <FootItem k="Holes in one" v={String(personal.holesInOne)} />
      <FootItem k={personal.sport} v={personal.teams.join(' · ')} />
      <FootItem k="Focused on" v={personal.currentFocus} />
    </div>
  )
}

function WorkField({ slug }: { slug?: string }) {
  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    return (
      <div className={css({ margin: { base: '6 0', md: '7 0' } })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: { base: 'lg', md: 'xl' },
            color: 'fieldInk',
            textTransform: 'uppercase',
          })}
        >
          Not found
        </h1>
      </div>
    )
  }
  return (
    <>
      <div className={css({ margin: { base: '6 0', md: '7 0' } })}>
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'xs',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'gold.800',
            marginBottom: '4',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: { base: 'lg', md: 'xl', lg: 'clamp(2.75rem,6.5vw,6rem)' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'fieldInk',
            textTransform: 'uppercase',
          })}
        >
          {project.title}
        </h1>
        {project.problem && (
          <p
            className={css({
              marginTop: '5',
              fontSize: 'sm',
              color: 'gold.800',
              maxWidth: '42ch',
              lineHeight: 'normal',
              fontWeight: 'medium',
            })}
          >
            {project.problem}
          </p>
        )}
      </div>
      <div
        className={css({ display: 'flex', flexWrap: 'wrap', gap: '5 8', alignItems: 'baseline' })}
      >
        {project.role && <FootItem k="Role" v={project.role} />}
        <FootItem k="Timeline" v={String(project.year)} />
        <FootItem k="Status" v={project.liveUrl ? 'Live' : 'Shipped'} />
      </div>
    </>
  )
}

export function Sidebar({ variant = 'home', slug }: { variant?: SidebarVariant; slug?: string }) {
  return (
    <Box
      as="aside"
      className={css({
        bg: 'accent',
        color: 'fieldInk',
        padding: { base: '5', md: '8' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: { base: 'none', md: '2px solid' },
        borderBottom: { base: '2px solid', md: 'none' },
        borderColor: 'bg',
        position: { base: 'static', md: 'sticky' },
        top: '0',
        height: { base: 'auto', md: '100vh' },
        minHeight: { base: '78vh', md: '560px' },
      })}
    >
      <Brand />
      {variant === 'home' && <HomeHero />}
      {variant === 'about' && <AboutField />}
      {variant === 'work' && <WorkField slug={slug} />}
      {variant === 'home' && <HomeFoot />}
      {variant === 'about' && <AboutFoot />}
    </Box>
  )
}
