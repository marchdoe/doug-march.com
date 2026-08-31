import { lastDistinct, readRecentArtifacts } from './recency.js'

/**
 * A variance mandate that reads one field, per date, and discourages what it
 * has seen lately.
 *
 * hero-source-mandate and palette-formula-mandate were written as copies of
 * each other (#225): both walked recent builds for one JSON field, decided a
 * soft-forbidden set, built a `Last N …: date: value | …` rationale, and
 * rendered a markdown block that collapses to '' when there is no history.
 * The only real differences were the strings and how the forbidden set is
 * decided — three of a kind minus one, since shell-mandate reads five keys
 * across two artifacts and carries a nudge of its own, and putting it through
 * here would cost more config than it saves.
 *
 * The walk itself is recency.js. This is the decision and the prose.
 */

/** How many recent distinct values a mandate discourages by default. */
export const FORBID_WINDOW = 3

/**
 * @typedef {object} RecencyMandateConfig
 * @property {string} artifact JSON file in the build dir, e.g. 'shell.json'
 * @property {string} field key to read out of it, e.g. 'ground_strategy'
 * @property {string} valueKey name the value takes on each history entry,
 *   e.g. 'groundStrategy'
 * @property {string} historyKey name the history array takes on the computed
 *   mandate, e.g. 'recentGroundStrategies'. Both key names are public shape,
 *   so they stay whatever callers already read rather than being normalised
 * @property {(history: object[]) => string[]} [forbid] decide the discouraged
 *   set. Defaults to the last {@link FORBID_WINDOW} distinct values; the
 *   hero-source rule is a streak instead, which is why this is pluggable
 * @property {string} title markdown heading
 * @property {string} intro sentence under the heading, usually the audit that
 *   motivated the mandate
 * @property {string} rationaleLabel reads as `Last 5 <label>: …`
 * @property {string} emptyRationale rationale when nothing was found
 * @property {(forbidden: string[]) => string} forbiddenBullet
 * @property {string} emptyBullet bullet when nothing is discouraged
 * @property {string} closing the "fit > novelty" escape hatch
 */

/**
 * Build the three functions a mandate module exports.
 *
 * @param {RecencyMandateConfig} config
 * @returns {{ extract: Function, compute: Function, format: Function }}
 */
export function recencyMandate(config) {
  const {
    artifact,
    field,
    valueKey,
    historyKey,
    forbid = (history) =>
      lastDistinct(
        history.map((h) => h[valueKey]),
        FORBID_WINDOW
      ),
    title,
    intro,
    rationaleLabel,
    emptyRationale,
    forbiddenBullet,
    emptyBullet,
    closing,
  } = config

  /**
   * @param {string} archiveDir
   * @param {number} lookbackDays
   * @returns {object[]} newest first; dates whose build never declared the
   *   field are omitted, so an archive that predates it degrades to no
   *   history rather than to a history of nulls
   */
  function extract(archiveDir, lookbackDays) {
    return readRecentArtifacts(archiveDir, lookbackDays, ({ date, read }) => {
      const value = read(artifact)?.[field]
      return value ? { date, [valueKey]: value } : null
    })
  }

  /**
   * @param {{ archiveDir: string, lookbackDays?: number }} opts
   * @returns {{ [historyKey]: object[], softForbidden: string[], rationale: string }}
   */
  function compute({ archiveDir, lookbackDays = 7 }) {
    const history = extract(archiveDir, lookbackDays)
    const rationale = history.length
      ? `Last ${history.length} ${rationaleLabel}: ${history
          .map((h) => `${h.date}: ${h[valueKey]}`)
          .join(' | ')}`
      : emptyRationale
    return { [historyKey]: history, softForbidden: forbid(history), rationale }
  }

  /**
   * @param {object} mandate as returned by compute
   * @returns {string} markdown block, or '' when there is no history to react
   *   to — an empty section is worse than no section
   */
  function format(mandate) {
    if (!mandate[historyKey]?.length) return ''
    return [
      `## ${title}`,
      ``,
      intro,
      ``,
      mandate.softForbidden.length ? forbiddenBullet(mandate.softForbidden) : emptyBullet,
      ``,
      `- **Rationale:** ${mandate.rationale}`,
      ``,
      closing,
    ].join('\n')
  }

  return { extract, compute, format }
}
