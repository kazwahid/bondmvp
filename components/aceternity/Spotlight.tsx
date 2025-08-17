'use client'

import { useEffect, useRef } from 'react'

export default function Spotlight({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -inset-40 bg-[radial-gradient(200px_200px_at_var(--x,_50%)_var(--y,_50%),rgba(209,72,54,0.18),transparent_60%)] transition-[background] duration-200" />
    </div>
  )
}

