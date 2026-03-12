export function useTheme() {
  const current = (): 'dark' | 'light' =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'

  const toggle = () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(next)
    localStorage.setItem('theme', next)
  }

  return { toggle, current }
}
