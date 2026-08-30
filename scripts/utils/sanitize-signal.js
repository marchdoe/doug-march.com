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
 *
 * Precision matters as much as coverage here. A filtered string is not a
 * safe no-op: it replaces a real headline with a placeholder, so the Art
 * Director designs against a signal that has been blanked. Every pattern
 * below is anchored to the context that makes it dangerous — a URI scheme
 * at a value boundary, an event handler inside a tag — rather than to a
 * substring that ordinary prose contains. The two corpora in
 * tests/fixtures/signal-text/ are what hold that line.
 */

const MAX_STRING_LENGTH = 280

// A string that is nothing but an http(s) URL. Its query and fragment are
// attacker-controlled free text carrying no design signal, so they are
// dropped rather than filtered — the link stays useful, the payload goes.
const URL_SHAPED = /^https?:\/\/\S+$/i

// Patterns that indicate an attempted prompt injection
const INJECTION_PATTERNS = [
  // "ignore the above", "forget your previous instructions", "bypass all rules".
  // The qualifier stack repeats, and the object may be a noun (instructions,
  // rules) or a position (above, previous) — "ignore the above" names no noun.
  /(?:ignore|disregard|forget|override|bypass)\s+(?:(?:all|any|the|your|our|my|these|those|previous|prior|earlier|preceding|everything|above)\s+)*(?:instructions?|rules?|prompts?|directives?|guidelines?|constraints?|context|above|below|previous|prior|earlier|preceding)/i,
  /(?:new|updated)\s+(?:instructions|rules|system\s+prompt)/i,
  /you\s+(?:are|will|must)\s+now\s+(?:be|act|behave|pretend)/i,
  /from\s+now\s+on,?\s+you/i,
  // "print your system prompt", "reveal the instructions"
  /(?:reveal|print|repeat|output|show|display)\s+(?:me\s+)?(?:your|the)\s+(?:system\s+|initial\s+|original\s+)*(?:prompt|instructions)/i,
  // A role label at the start of a line is how a conversation turn is forged.
  // "ai" is deliberately absent: "AI: The Next Frontier" is a real headline.
  /^[\s>*-]*(?:system|assistant|user|human)\s*:/im,
  // Named jailbreak personas. DAN is matched case-sensitively so the given
  // name "Dan" passes.
  /\b(?:do\s+anything\s+now)\b/i,
  /\bDAN\b/,
  // "jailbreak" alone is a normal tech-news word — "tricks for your jailbroken
  // Kindle" is a real HN headline this filter blanked. It only reads as an
  // attack next to something to jailbreak, so require an AI term either side.
  /\b(?:jailbreak|jailbroken)\b[\s\S]{0,60}\b(?:prompt|model|assistant|llm|ai|gpt|claude|guardrails?|restrictions?)\b/i,
  /\b(?:prompt|model|assistant|llm|ai|gpt|claude|guardrails?|restrictions?)\b[\s\S]{0,60}\b(?:jailbreak|jailbroken)\b/i,
  /\{\{[^}]*\}\}/, // template injection attempts
  /\[INST\]|\[\/INST\]/i, // Llama-style prompt markers
  /<\|.*?\|>/, // ChatML-style markers
  /###\s*(?:system|instruction|user|assistant)/i,
]

// HTML/script patterns that should never appear in signal text.
//
// The scheme patterns require a value boundary before the scheme and a URI
// body after it. Without both, `/data:(?!image\/)/` filters "Big data: the
// next wave of AI" and `/javascript:/` filters "JavaScript: The Good Parts".
const HTML_PATTERNS = [
  /<script/i,
  /<\/script/i,
  /<iframe/i,
  /<object[\s>]/i,
  /<embed[\s>]/i,
  // An event handler only executes as a tag attribute. Requiring the tag is
  // what keeps "Season one = a masterpiece" out of the filtered bucket.
  /<[a-z][^>]*\son\w+\s*=/i,
  // javascript:alert(1) — code follows the colon with no space.
  /(?:^|[\s"'(<=[])javascript:\S/i,
  /(?:^|[\s"'(<=[])vbscript:\S/i,
  // data:text/html;base64,... — a MIME type or an empty one, then ; or ,
  // Every real data URI has one; "Metadata: why it matters" has neither.
  /(?:^|[\s"'(<=[])data:(?!image\/)[a-z0-9.+-]*(?:\/[a-z0-9.+-]+)?[;,]/i,
]

/**
 * Sanitize a single string value from a signal provider.
 *
 * @param {unknown} value
 * @param {{ maxLength?: number }} [opts] maxLength overrides the 280-char cap
 *   for trusted-author text (e.g. owner ratings) where clipping loses signal
 * @returns {string} Sanitized string, safe to include in a prompt
 */
export function sanitizeString(value, { maxLength = MAX_STRING_LENGTH } = {}) {
  if (value === null || value === undefined) return ''
  let str = String(value)

  // Check for HTML/script attack patterns FIRST, before stripping tags.
  // If we strip first, "<script>alert(1)</script>" becomes "alert(1)"
  // which wouldn't match the script pattern.
  for (const pattern of HTML_PATTERNS) {
    if (pattern.test(str)) {
      return '[filtered: potential HTML injection]'
    }
  }

  // Drop the query/fragment of a bare URL before the injection scan, so a
  // payload parked in ?q=... removes itself instead of filtering the link.
  const trimmed = str.trim()
  if (URL_SHAPED.test(trimmed)) {
    str = trimmed.replace(/[?#].*$/, '')
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
  if (clean.length > maxLength) {
    clean = `${clean.slice(0, maxLength)}...`
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
