import styles from './SectionHead.module.css'

export function SectionHead({ label }: { label: string }) {
  return <div className={styles.head}>// {label}</div>
}
