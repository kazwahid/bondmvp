'use client'

import { ReactNode, useEffect, useRef } from 'react'

export default function CometCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const comet = document.createElement('div')
    comet.className = 'pointer-events-none absolute -inset-1 rounded-2xl'
    comet.style.background = 'radial-gradient(120px 60px at 10% -10%, rgba(139,115,85,.18), transparent)'
    el.appendChild(comet)
    return () => { el.removeChild(comet) }
  }, [])
  return (
    <div ref={ref} className={`relative rounded-2xl border border-coffee-200 bg-white/70 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  )
}

