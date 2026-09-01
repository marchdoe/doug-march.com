import { describe, expect, it } from 'vitest'
import {
  REQUIRED_FILES,
  findEngineerOutputProblem,
  findMissingRequiredFiles,
} from '../../scripts/utils/engineer-output-check.js'

const file = (path, content = 'export {}') => ({ path, content })
const complete = () => REQUIRED_FILES.map((p) => file(p))

describe('findMissingRequiredFiles', () => {
  it('returns nothing for a complete response', () => {
    expect(findMissingRequiredFiles(complete())).toEqual([])
  })

  it('lists every omitted required file, in the canonical order', () => {
    const files = complete().filter(
      (f) => f.path !== 'app/components/Sidebar.tsx' && f.path !== 'app/routes/og.tsx'
    )
    expect(findMissingRequiredFiles(files)).toEqual([
      'app/components/Sidebar.tsx',
      'app/routes/og.tsx',
    ])
  })

  it('ignores extra files the engineer chose to write', () => {
    expect(findMissingRequiredFiles([...complete(), file('app/components/Ledger.tsx')])).toEqual([])
  })

  it('treats no files as everything missing', () => {
    expect(findMissingRequiredFiles(undefined)).toEqual(REQUIRED_FILES)
  })
})

describe('findEngineerOutputProblem', () => {
  it('is null for a complete, posture-respecting response', () => {
    expect(findEngineerOutputProblem(complete(), 'none')).toBeNull()
    expect(findEngineerOutputProblem(complete(), 'standard')).toBeNull()
  })

  it('reports missing files with a reminder that names them', () => {
    const files = complete().filter((f) => f.path !== 'app/components/Sidebar.tsx')
    const problem = findEngineerOutputProblem(files, 'standard')
    expect(problem.kind).toBe('missing-files')
    expect(problem.message).toMatch(/app\/components\/Sidebar\.tsx/)
    expect(problem.reminder).toMatch(/REQUIRED FILES MISSING/)
    expect(problem.reminder).toMatch(/- app\/components\/Sidebar\.tsx/)
  })

  it('reports a posture violation once the files are complete', () => {
    const files = complete().map((f) =>
      f.path === 'app/components/Sidebar.tsx' ? file(f.path, '<nav>links</nav>') : f
    )
    const problem = findEngineerOutputProblem(files, 'none')
    expect(problem.kind).toBe('shell-posture')
    expect(problem.message).toMatch(/app\/components\/Sidebar\.tsx/)
    expect(problem.reminder).toMatch(/SHELL POSTURE VIOLATION/)
  })

  it('reports missing files before posture, since an absent file cannot be judged', () => {
    // #298: the posture retry used to be accepted for removing the nav even
    // when it dropped Sidebar.tsx again. Both must hold at once.
    const files = complete()
      .filter((f) => f.path !== 'app/components/Sidebar.tsx')
      .map((f) => (f.path === 'app/components/Layout.tsx' ? file(f.path, '<nav>') : f))
    expect(findEngineerOutputProblem(files, 'none').kind).toBe('missing-files')
  })

  it('does not treat a nav as a problem for any posture other than none', () => {
    const files = complete().map((f) =>
      f.path === 'app/components/Sidebar.tsx' ? file(f.path, '<nav>links</nav>') : f
    )
    expect(findEngineerOutputProblem(files, 'marginal')).toBeNull()
  })
})
