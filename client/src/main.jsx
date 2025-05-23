import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Main } from './Pages';

import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)