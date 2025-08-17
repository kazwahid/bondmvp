'use client'

import { useEffect, useRef } from 'react'

export default function LogoLoader({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.animate([
      { strokeDashoffset: 200 },
      { strokeDashoffset: 0 }
    ], { duration: 1200, easing: 'ease-out' })
  }, [])
  return (
    <svg ref={ref} className={className} viewBox="0 0 64 64" fill="none" stroke="#8B7355" strokeWidth="2" strokeDasharray="200">
      <path d="M20 32c0-12 8-22 18-22 4.5 0 9 2.5 12.5 6" />
      <path d="M20 32c0 12 8 22 18 22 4.5 0 9-2.5 12.5-6" />
      <path d="M26 22l12 10-12 10" />
    </svg>
  )
}

