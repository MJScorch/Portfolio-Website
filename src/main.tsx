import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Marlin } from './pages/Marlin.tsx'

// Two pages is not worth a router dependency; the path is read once at boot.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = path === '/marlin' ? Marlin : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
