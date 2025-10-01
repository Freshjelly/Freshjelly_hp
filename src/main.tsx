import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Lightweight interactive tilt for cards
document.addEventListener('pointermove', (e) => {
  const cards = document.querySelectorAll<HTMLElement>('.tilt')
  cards.forEach((el) => {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    const ry = Math.max(-1, Math.min(1, dx)) * 6
    const rx = Math.max(-1, Math.min(1, -dy)) * 6
    el.style.setProperty('--rx', rx + 'deg')
    el.style.setProperty('--ry', ry + 'deg')
  })
})

const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
