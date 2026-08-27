// Hand-written declarations for site-origin.js so TS test files can import the
// origins without allowJs. Keep in sync with the JS exports.

/** Origins a URL in our own bytes may carry. Longest first. */
export const RECOGNISED_ORIGINS: string[]

/** The origin serving the site today. Changes on cutover day. */
export const CANONICAL_ORIGIN: string

/** Host portion of every recognised origin. */
export const RECOGNISED_HOSTS: string[]

/** The recognised origin `value` begins with, or null. */
export function matchOrigin(value: string): string | null
