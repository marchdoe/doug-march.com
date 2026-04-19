import type { ResponsiveMetrics } from '../server/archive'

type HistoryItem = ResponsiveMetrics

const COLORS = { border: '#2a2f36', muted: '#8a8f97', text: '#dce0e6', cyan: '#00e5ff', fail: '#ff6b6b' }

function LineChart({ data, label }: { data: Array<{ x: number; y: number; labelX?: string }>; label: string }) {
  const W = 600, H = 120, pad = 24
  if (data.length === 0) return <div style={{ color: COLORS.muted }}>no data</div>
  const xs = data.map(d => d.x), ys = data.map(d => d.y)
  const xMin = Math.min(...xs), xMax = Math.max(...xs)
  const yMin = 1, yMax = 5
  const sx = (x: number) => pad + ((x - xMin) / Math.max(1, xMax - xMin)) * (W - pad * 2)
  const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - pad * 2)
  const poly = data.map(d => `${sx(d.x)},${sy(d.y)}`).join(' ')
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>{label}</div>
      <svg width={W} height={H} style={{ border: `1px solid ${COLORS.border}` }}>
        <polyline points={poly} fill="none" stroke={COLORS.cyan} strokeWidth={1.5} />
        {data.map((d, i) => (
          <circle key={i} cx={sx(d.x)} cy={sy(d.y)} r={2.5} fill={COLORS.cyan}>
            <title>{`${d.labelX || d.x}: ${d.y}/5`}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}

function BarChart({ rows }: { rows: Array<{ label: string; count: number }> }) {
  const max = Math.max(1, ...rows.map(r => r.count))
  return (
    <div style={{ marginBottom: 16 }}>
      {rows.map(r => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 2 }}>
          <span style={{ width: 180 }}>{r.label}</span>
          <div style={{ flex: 1, background: COLORS.border, height: 12, position: 'relative' }}>
            <div style={{ width: `${(r.count / max) * 100}%`, height: '100%', background: COLORS.fail }} />
          </div>
          <span style={{ width: 40, textAlign: 'right', color: COLORS.muted }}>{r.count}</span>
        </div>
      ))}
    </div>
  )
}

export function ResponsiveTrend({ history }: { history: HistoryItem[] }) {
  const asc = [...history].sort((a, b) => a.date.localeCompare(b.date))

  const overallData = asc.map((h, i) => ({ x: i, y: h.overallScore, labelX: h.date }))

  const perVp = ['mobile', 'tablet', 'laptop', 'desktop']
  const perVpSeries = perVp.map(name => ({
    name,
    data: asc.map((h, i) => ({ x: i, y: h.viewports?.[name]?.score ?? 0, labelX: h.date })),
  }))

  const failCounts: Record<string, number> = {}
  for (const h of history) {
    if (h.worstFailure?.check) failCounts[h.worstFailure.check] = (failCounts[h.worstFailure.check] || 0) + 1
  }
  const failRows = Object.entries(failCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([label, count]) => ({ label, count }))

  const byArchetype: Record<string, { total: number; n: number }> = {}
  for (const h of history) {
    const k = h.archetype || 'unknown'
    if (!byArchetype[k]) byArchetype[k] = { total: 0, n: 0 }
    byArchetype[k].total += h.overallScore
    byArchetype[k].n += 1
  }
  const archRows = Object.entries(byArchetype)
    .map(([k, { total, n }]) => ({ archetype: k, avg: (total / n).toFixed(1), n }))
    .sort((a, b) => parseFloat(a.avg) - parseFloat(b.avg))

  const worstBuilds = [...history]
    .filter(h => h.overallScore <= 3)
    .sort((a, b) => a.overallScore - b.overallScore)
    .slice(0, 10)

  return (
    <div>
      <LineChart data={overallData} label={`Overall score (last ${asc.length} builds)`} />
      {perVpSeries.map(s => (
        <LineChart key={s.name} data={s.data} label={`${s.name} score`} />
      ))}

      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, marginTop: 16 }}>Failure types</div>
      <BarChart rows={failRows} />

      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, marginTop: 16 }}>Worst by archetype</div>
      <table style={{ fontSize: 11, borderCollapse: 'collapse' }}>
        <thead><tr><th style={{ textAlign: 'left', padding: 4 }}>archetype</th><th style={{ padding: 4 }}>avg</th><th style={{ padding: 4 }}>n</th></tr></thead>
        <tbody>{archRows.map(r => (
          <tr key={r.archetype}><td style={{ padding: 4 }}>{r.archetype}</td><td style={{ padding: 4 }}>{r.avg}</td><td style={{ padding: 4 }}>{r.n}</td></tr>
        ))}</tbody>
      </table>

      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4, marginTop: 16 }}>Worst recent builds</div>
      <ul style={{ fontSize: 11, paddingLeft: 16 }}>
        {worstBuilds.map(b => (
          <li key={b.buildId}>
            <a href={`/archive/${b.date}`} style={{ color: COLORS.cyan }}>
              {b.date} · {b.archetype || '—'} · {b.overallScore}/5
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
