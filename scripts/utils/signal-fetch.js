/**
 * One way for a signal collector to reach the network.
 *
 * Every collector hand-rolled its own `fetch` + `if (!res.ok) throw` +
 * `await res.json()`, and the copies disagreed in ways that mattered:
 *
 * - **Cancellation was decorative.** `collect-signals.js` builds an
 *   AbortController, passes `{ signal }` as the collector's second argument and
 *   aborts it in `finally`, but no collector declared or forwarded that
 *   argument. Ten of twelve network collectors called bare `fetch(url)` with no
 *   signal at all. `Promise.race` returned on time, so the run looked bounded,
 *   while the sockets underneath stayed open until the OS gave up.
 * - **User-Agent** was a Chrome spoof in one file, `dougmar-ch-signals/1.0` in
 *   another, `doug-march-signals/1.0` in a third, and Node's default everywhere
 *   else.
 * - **Nothing checked the body.** `json.data.posts.edges` and
 *   `const [{ q, a }] = await res.json()` both dereference straight into an
 *   unvalidated response, so a GraphQL error object (HTTP 200 with `errors`)
 *   or an empty array surfaced as a TypeError, and the reason recorded in
 *   today.meta.yml read "Cannot read properties of undefined" rather than
 *   naming the API.
 */

/** One identity for every outbound signal request. */
export const USER_AGENT = 'dougmar-ch-signals/1.0 (+https://dougmar.ch)'

/**
 * Fetch with a real deadline and a forwarded abort signal.
 *
 * @param {string} url
 * @param {object} [options]
 * @param {AbortSignal} [options.signal] the orchestrator's signal
 * @param {number} [options.timeoutMs] own deadline, defaults to 10s
 * @param {Record<string,string>} [options.headers]
 * @param {string} [options.method]
 * @param {string} [options.body]
 * @returns {Promise<Response>}
 */
export async function signalFetch(url, { signal, timeoutMs = 10000, headers, ...init } = {}) {
  // Both deadlines apply: the collector's own, and the orchestrator's, which
  // fires when the whole run is being torn down.
  const timeout = AbortSignal.timeout(timeoutMs)
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout

  return await fetch(url, {
    ...init,
    signal: combined,
    headers: { 'user-agent': USER_AGENT, ...headers },
  })
}

/**
 * Fetch JSON, failing with a message that names the source.
 *
 * @param {string} url
 * @param {object} [options] as signalFetch, plus:
 * @param {string} [options.source] host name for error messages
 * @param {(value: unknown) => boolean} [options.expect] shape check; a body
 *   that fails it is an error naming the API, not a TypeError three lines later
 * @returns {Promise<unknown>}
 */
export async function fetchJson(url, { source, expect, ...options } = {}) {
  const label = source ?? new URL(url).host
  const res = await signalFetch(url, options)
  if (!res.ok) throw new Error(`${label} responded with ${res.status}`)

  let body
  try {
    body = await res.json()
  } catch {
    throw new Error(`${label} returned a body that is not JSON`)
  }

  if (expect && !expect(body)) {
    throw new Error(`${label} returned an unexpected shape`)
  }
  return body
}

/**
 * Fetch text (the HTML scrapers), failing with a message that names the source.
 *
 * @param {string} url
 * @param {object} [options] as signalFetch, plus `source`
 * @returns {Promise<string>}
 */
export async function fetchText(url, { source, ...options } = {}) {
  const label = source ?? new URL(url).host
  const res = await signalFetch(url, options)
  if (!res.ok) throw new Error(`${label} responded with ${res.status}`)
  return await res.text()
}
