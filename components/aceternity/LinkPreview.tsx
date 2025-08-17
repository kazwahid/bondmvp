'use client'

import { useEffect, useState } from 'react'

type Meta = { title?: string; description?: string; image?: string }

export default function LinkPreview({ href, children, className = '' }: { href: string, children: React.ReactNode, className?: string }) {
  const [meta, setMeta] = useState<Meta | null>(null)
  useEffect(() => {
    let ok = true
    ;(async () => {
      try {
        // Simple client-side fetch; in production consider a server proxy
        const res = await fetch(`https://r.jina.ai/http://api.linkpreview.net/?q=${encodeURIComponent(href)}`)
        const txt = await res.text()
        // Fallback: minimal parsing; or leave meta null
        if (ok && txt) setMeta({ title: href })
      } catch {
        if (ok) setMeta(null)
      }
    })()
    return () => { ok = false }
  }, [href])
  return (
    <a href={href} className={`group relative inline-flex items-center gap-2 hover:underline ${className}`}>
      {children}
      {meta && (
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-10 hidden group-hover:block">
          <div className="w-64 rounded-xl border border-coffee-200 bg-white/90 backdrop-blur p-3 shadow-lg">
            <div className="text-sm font-medium text-coffee-800 truncate">{meta.title}</div>
            {meta.description && (<div className="text-xs text-coffee-700 line-clamp-2">{meta.description}</div>)}
          </div>
        </span>
      )}
    </a>
  )
}

