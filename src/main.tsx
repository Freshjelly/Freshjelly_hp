import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Lightweight interactive tilt for cards
document.addEventListener('pointermove', (event) => {
  const cards = document.querySelectorAll<HTMLElement>('.tilt')
  cards.forEach((el) => {
    const r = el.getBoundingClientRect()
    const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom
    if (!inside) {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--tilt-active', '0')
      return
    }
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (event.clientX - cx) / (r.width / 2)
    const dy = (event.clientY - cy) / (r.height / 2)
    const ry = Math.max(-1, Math.min(1, dx)) * 6
    const rx = Math.max(-1, Math.min(1, -dy)) * 6
    el.style.setProperty('--rx', `${rx}deg`)
    el.style.setProperty('--ry', `${ry}deg`)
    el.style.setProperty('--tilt-active', '1')
  })
})

const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
