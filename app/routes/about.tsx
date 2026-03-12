import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { timeline, capabilities } from '../content/timeline'
import styles from './about.module.css'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <div className={styles.intro}>
        <div className={styles.introLabel}>ABOUT</div>
        <p className={styles.introText}>
          I'm a <strong>designer and developer</strong> who builds products from first
          principles — from idea through design, engineering, and launch. Currently
          focused on <strong>Spaceman</strong>, building tools for aerospace teams.
          <br /><br />
          I care about craft, clarity, and products that actually get used.
        </p>
      </div>

      <SectionHead label="BACKGROUND" />

      <div>
        {timeline.map((entry) => (
          <div key={entry.year} className={styles.tlItem}>
            <div className={styles.tlYear}>{entry.year}</div>
            <div className={styles.tlLineWrap}>
              <div className={`${styles.tlDot} ${entry.current ? styles.tlDotCurrent : ''}`} />
              <div className={styles.tlRule} />
            </div>
            <div className={styles.tlContent}>
              <div className={styles.tlRole}>{entry.role}</div>
              <div className={`${styles.tlCompany} ${entry.current ? styles.tlCompanyCurrent : ''}`}>
                {entry.company}
              </div>
              <div className={styles.tlDesc}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead label="CAPABILITIES" />
      <div className={styles.skillsGrid}>
        {capabilities.map((skill) => (
          <div key={skill} className={styles.skill}>{skill}</div>
        ))}
      </div>
    </Layout>
  )
}
