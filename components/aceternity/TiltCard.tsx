'use client'

import { ReactNode, useRef } from 'react'

export default function TiltCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `perspective(900px) rotateX(${(-y / 40).toFixed(2)}deg) rotateY(${(x / 40).toFixed(2)}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onLeave} className={`transition-transform duration-300 will-change-transform ${className}`}>
      {children}
    </div>
  )
}

