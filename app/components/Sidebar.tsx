import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.identity}>
        <div className={styles.logoWrap}>
          <img src={logoUrl} alt="Doug March logo" />
        </div>
        <div>
          <div className={styles.idName}>DOUG MARCH</div>
          <div className={styles.idRole}>DESIGNER &amp; DEVELOPER</div>
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.statusDot} />
        <div className={styles.statusText}>AVAILABLE FOR PROJECTS</div>
      </div>

      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
        >
          work
        </Link>
        <Link
          to="/about"
          className={`${styles.navLink} ${location.pathname === '/about' ? styles.navLinkActive : ''}`}
        >
          about
        </Link>
        <a
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navLink} ${styles.navLinkExt}`}
        >
          spaceman.llc
        </a>
      </nav>

      <div className={styles.social}>
        <a href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub ↗</a>
        <a href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter / X ↗</a>
        <a href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn ↗</a>
        <a href="mailto:doug@doug-march.com" className={styles.socialLink}>Email →</a>
      </div>
    </aside>
  )
}
