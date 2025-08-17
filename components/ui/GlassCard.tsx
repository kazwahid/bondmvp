'use client'

import { ReactNode } from 'react'

export default function GlassCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`rounded-2xl border border-coffee-200 bg-white/70 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  )
}

