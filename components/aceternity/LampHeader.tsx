'use client'

import { ReactNode } from 'react'

export default function LampHeader({ title, subtitle }: { title: ReactNode, subtitle?: ReactNode }) {
  return (
    <div className="relative py-16 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_120px_at_50%_0,rgba(139,115,85,0.18),transparent)]" />
      <h2 className="text-3xl md:text-5xl font-heading text-coffee-800 mb-3">{title}</h2>
      {subtitle && <p className="text-coffee-700 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

