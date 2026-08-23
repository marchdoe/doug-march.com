import { createRoot } from 'react-dom/client'
import { DevPanel } from './dev-panel'

const devRoot = document.getElementById('dev-root')
if (!devRoot) throw new Error('missing #dev-root mount element')

createRoot(devRoot).render(<DevPanel />)
