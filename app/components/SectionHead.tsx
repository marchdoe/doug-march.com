interface SectionHeadProps {
  label: string
}

export function SectionHead({ label }: SectionHeadProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: '0.74rem',
          fontWeight: '500',
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          color: 'var(--colors-accent-default, var(--colors-accent))',
          whiteSpace: 'nowrap' as const,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          backgroundColor: 'var(--colors-border-default, var(--colors-border))',
        }}
      />
    </div>
  )
}