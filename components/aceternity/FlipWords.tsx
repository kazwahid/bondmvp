'use client'

import { useEffect, useState } from 'react'

export default function FlipWords({ words, interval = 1800, className = '' }: { words: string[], interval?: number, className?: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [interval, words.length])
  return (
    <span className={`inline-block [perspective:600px] ${className}`}>
      <span className="inline-block [transform-style:preserve-3d] will-change-transform transition-transform duration-500" style={{ transform: `rotateX(${i*180}deg)` }}>
        <span className="block [backface-visibility:hidden]">{words[i]}</span>
        <span className="block -mt-[1em] rotate-x-180 [backface-visibility:hidden] opacity-0">{words[(i+1)%words.length]}</span>
      </span>
    </span>
  )
}

