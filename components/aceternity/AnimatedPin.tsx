'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedPin({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t = 0
    let raf = 0 as any
    const loop = () => {
      t += 0.02
      const y = Math.sin(t) * 2
      el.style.transform = `translateY(${y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <svg ref={ref} className={className} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
      <path d="M12 2c3.314 0 6 2.686 6 6 0 4.5-6 12-6 12S6 12.5 6 8c0-3.314 2.686-6 6-6z" />
      <circle cx="12" cy="8.5" r="2" />
    </svg>
  )
}

