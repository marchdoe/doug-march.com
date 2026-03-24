import { createRoot } from 'react-dom/client'
import { DevPanel } from './dev-panel'

createRoot(document.getElementById('dev-root')!).render(<DevPanel />)
