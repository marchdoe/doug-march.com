/**
 * Sanitize third-party signal data before it's injected into LLM prompts.
 *
 * Signal providers pull text from public APIs (HN titles, news headlines,
 * Dribbble descriptions, etc.) where anyone can submit content. Without
 * sanitization, a crafted submission can inject instructions into the
 * design pipeline's prompt and steer the AI output — the classic indirect
 * prompt injection attack.
 *
 * This module strips HTML, length-limits strings, and removes known
 * jailbreak patterns. It's a defense-in-depth layer; the build validator's
 * output content scanner is the second line of defense if this is bypassed.
 */

const MAX_STRING_LENGTH = 280

// Patterns that indicate an attempted prompt injection
const INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+|previous\s+|prior\s+|the\s+)?(?:instructions|rules|prompts|directives)/i,
  /disregard\s+(?:all\s+|previous\s+|prior\s+|the\s+)?(?:instructions|rules|prompts|directives)/i,
  /(?:new|updated)\s+(?:instructions|rules|system\s+prompt)/i,
  /you\s+(?:are|will|must)\s+now\s+(?:be|act|behave|pretend)/i,
  /from\s+now\s+on,?\s+you/i,
  /\{\{[^}]*\}\}/,  // template injection attempts
  /\[INST\]|\[\/INST\]/i,  // Llama-style prompt markers
  /<\|.*?\|>/,  // ChatML-style markers
  /###\s*(?:system|instruction|user|assistant)/i,
]

// HTML/script patterns that should never appear in signal text
const HTML_PATTERNS = [
  /<script/i,
  /<\/script/i,
  /<img[^>]*onerror/i,
  /<iframe/i,
  /javascript:/i,
  /data:(?!image\/)/i,  // allow data:image but not data:text/html
  /\bon\w+\s*=/i,  // onclick=, onerror=, etc
]

/**
 * Sanitize a single string value from a signal provider.
 *
 * @param {unknown} value
 * @returns {string} Sanitized string, safe to include in a prompt
 */
export function sanitizeString(value) {
  if (value === null || value === undefined) return ''
  const str = String(value)

  // Check for HTML/script attack patterns FIRST, before stripping tags.
  // If we strip first, "<script>alert(1)</script>" becomes "alert(1)"
  // which wouldn't match the script pattern.
  for (const pattern of HTML_PATTERNS) {
    if (pattern.test(str)) {
      return '[filtered: potential HTML injection]'
    }
  }

  // Check for prompt injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(str)) {
      return '[filtered: potential prompt injection]'
    }
  }

  // Now strip any remaining HTML tags (benign formatting like <b>, <em>)
  let clean = str.replace(/<[^>]*>/g, ' ')

  // Collapse whitespace and trim
  clean = clean.replace(/\s+/g, ' ').trim()

  // Length limit
  if (clean.length > MAX_STRING_LENGTH) {
    clean = clean.slice(0, MAX_STRING_LENGTH) + '...'
  }

  return clean
}

/**
 * Recursively sanitize all string values in a signal object.
 *
 * Preserves the structure of the signals object but replaces every
 * string leaf with its sanitized version. Numbers, booleans, nulls,
 * and dates pass through unchanged.
 *
 * @param {unknown} value
 * @returns {unknown} Sanitized value
 */
export function sanitizeSignals(value) {
  if (value === null || value === undefined) return value
  if (typeof value === 'string') return sanitizeString(value)
  if (typeof value === 'number' || typeof value === 'boolean') return value
  if (value instanceof Date) return value
  if (Array.isArray(value)) return value.map(sanitizeSignals)
  if (typeof value === 'object') {
    const result = {}
    for (const [k, v] of Object.entries(value)) {
      result[k] = sanitizeSignals(v)
    }
    return result
  }
  return value
}
