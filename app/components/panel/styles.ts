import { css, cva } from '../../../styled-system/css'

// The panel's permanent mini design system. Raw values only — the site's
// theme tokens are redesigned daily by the pipeline and must never leak in.

const focusRing = {
  outline: '2px solid #18181b',
  outlineOffset: '2px',
} as const

export const page = css({
  minHeight: '100vh',
  backgroundColor: '#fafafa',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#18181b',
  padding: '24px 16px',
})

export const sheet = css({
  maxWidth: '640px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: '1px solid #e4e4e7',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,.06)',
})

export const pageTitle = css({
  fontSize: '17px',
  fontWeight: '650',
  marginBottom: '16px',
})

export const sectionTitle = css({
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '12px',
})

export const segTabs = css({
  display: 'flex',
  gap: '4px',
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  padding: '3px',
  marginBottom: '20px',
})

export const segTab = css({
  flex: '1',
  minHeight: '44px',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '6px',
  fontSize: '13px',
  fontFamily: 'inherit',
  color: '#71717a',
  cursor: 'pointer',
  '&[data-active]': {
    backgroundColor: '#ffffff',
    color: '#18181b',
    fontWeight: '600',
    boxShadow: '0 1px 2px rgba(0,0,0,.08)',
  },
  '&:focus-visible': focusRing,
})

export const fieldLabel = css({
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#71717a',
  marginBottom: '5px',
})

export const field = css({ marginBottom: '14px' })

export const textArea = css({
  display: 'block',
  width: '100%',
  border: '1px solid #d4d4d8',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  fontFamily: 'inherit',
  lineHeight: '1.5',
  color: '#18181b',
  backgroundColor: '#ffffff',
  resize: 'vertical',
  '&:focus-visible': focusRing,
})

export const button = cva({
  base: {
    minHeight: '44px',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'inherit',
    border: '1px solid transparent',
    cursor: 'pointer',
    '&:disabled': { opacity: '0.5', cursor: 'default' },
    '&:focus-visible': focusRing,
  },
  variants: {
    kind: {
      primary: { backgroundColor: '#18181b', color: '#ffffff' },
      secondary: {
        backgroundColor: '#ffffff',
        color: '#3f3f46',
        borderColor: '#d4d4d8',
      },
    },
  },
  defaultVariants: { kind: 'primary' },
})

export const gradeButton = css({
  width: '44px',
  height: '44px',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'inherit',
  lineHeight: '1',
  border: '1px solid #d4d4d8',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  color: '#3f3f46',
  cursor: 'pointer',
  '&[aria-pressed="true"]': {
    backgroundColor: '#18181b',
    borderColor: '#18181b',
    color: '#ffffff',
  },
  '&:focus-visible': focusRing,
})

export const badge = cva({
  base: {
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '5px',
    padding: '1px 6px',
    border: '1px solid',
  },
  variants: {
    kind: {
      graded: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        borderColor: '#bbf7d0',
      },
      none: {
        backgroundColor: '#f4f4f5',
        color: '#71717a',
        borderColor: '#e4e4e7',
      },
    },
  },
})

export const statusDot = cva({
  base: {
    width: '8px',
    height: '8px',
    borderRadius: '9999px',
    display: 'inline-block',
    flexShrink: '0',
  },
  variants: {
    tone: {
      success: { backgroundColor: '#16a34a' },
      failure: { backgroundColor: '#dc2626' },
      pending: { backgroundColor: '#f59e0b' },
    },
  },
})

export const mutedText = css({ fontSize: '12px', color: '#71717a' })

export const dateMuted = css({ fontWeight: '400', color: '#71717a' })

export const secondaryText = css({ fontSize: '13px', color: '#3f3f46' })

export const errorText = css({ fontSize: '13px', color: '#dc2626' })

export const successText = css({ fontSize: '13px', color: '#16a34a' })

export const inlineLink = css({
  color: '#18181b',
  fontWeight: '600',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  '&:focus-visible': focusRing,
})

export const runBox = css({
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '14px',
})

export const checkboxRow = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  fontSize: '13px',
  color: '#3f3f46',
  marginBottom: '14px',
  cursor: 'pointer',
})

export const checkboxBox = css({
  width: '16px',
  height: '16px',
  accentColor: '#18181b',
  '&:focus-visible': focusRing,
})

export const sliderRow = css({ marginBottom: '18px' })

export const sliderLabelRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  fontWeight: '600',
  color: '#18181b',
  marginBottom: '2px',
  '& span': { fontVariantNumeric: 'tabular-nums', color: '#3f3f46' },
})

export const sliderControl = css({
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  width: '100%',
  cursor: 'pointer',
})

export const sliderTrack = css({
  height: '4px',
  width: '100%',
  backgroundColor: '#e4e4e7',
  borderRadius: '9999px',
  position: 'relative',
})

export const sliderIndicator = css({
  backgroundColor: '#18181b',
  borderRadius: '9999px',
})

export const sliderThumb = css({
  width: '16px',
  height: '16px',
  borderRadius: '9999px',
  backgroundColor: '#ffffff',
  border: '1px solid #d4d4d8',
  boxShadow: '0 1px 3px rgba(0,0,0,.15)',
  '&:focus-visible': focusRing,
})

export const archiveLink = css({
  fontSize: '13px',
  color: '#18181b',
  fontWeight: '600',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
  '&:focus-visible': focusRing,
})

export const ratingNotes = css({ fontSize: '12px', color: '#3f3f46', marginTop: '2px' })
