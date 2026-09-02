import { createRoot } from 'react-dom/client'
import { DevResponsivePage } from './dev-responsive-page'

const devResponsiveRoot = document.getElementById('dev-responsive-root')
if (!devResponsiveRoot) throw new Error('missing #dev-responsive-root mount element')

createRoot(devResponsiveRoot).render(<DevResponsivePage />)
