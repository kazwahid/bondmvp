'use client'

export default function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(1, ...data)
  const pts = data.map((v, i) => `${(i/(data.length-1))*100},${100 - (v/max)*100}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" className="w-full h-16">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={pts} className="text-coffee-800" />
    </svg>
  )
}

