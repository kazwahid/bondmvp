'use client'

import { useEffect } from 'react'

export default function Confetti({ show }: { show: boolean }) {
  useEffect(() => {
    if (!show) return
    // Simple confetti using CSS particles (no dep) – ephemeral for MVP
    const root = document.createElement('div')
    root.style.position = 'fixed'
    root.style.inset = '0'
    root.style.pointerEvents = 'none'
    root.style.zIndex = '50'

    const count = 80
    const colors = ['#16a34a', '#f59e0b', '#ef4444', '#3b82f6']
    const pieces: HTMLElement[] = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.style.position = 'absolute'
      el.style.width = '8px'
      el.style.height = '8px'
      el.style.background = colors[i % colors.length]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.top = '-10px'
      el.style.opacity = '0.9'
      el.style.transform = `rotate(${Math.random() * 360}deg)`
      el.style.borderRadius = '2px'
      el.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${100 + Math.random() * 50}vh) rotate(${Math.random() * 360}deg)`, opacity: 0.8 }
      ], { duration: 1800 + Math.random() * 1000, easing: 'ease-out', fill: 'forwards' })
      pieces.push(el)
      root.appendChild(el)
    }

    document.body.appendChild(root)
    const t = setTimeout(() => {
      root.remove()
    }, 2200)
    return () => { clearTimeout(t); root.remove() }
  }, [show])

  return null
}

