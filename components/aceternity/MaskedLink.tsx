'use client'

import { useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'

export default function MaskedLink({ url, title, className = '' }: { url: string, title?: string, className?: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return 'link'
    }
  }

  return (
    <div className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-coffee-200 bg-white/70 backdrop-blur hover:bg-white/90 transition-all ${className}`}>
      <div className="flex items-center gap-2 flex-1">
        <div className="w-2 h-2 rounded-full bg-coffee-600" />
        <span className="text-sm text-coffee-800 font-medium">
          {title || getDomain(url)}
        </span>
        <ExternalLink className="h-3 w-3 text-coffee-600" />
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-coffee-100 transition-colors"
          title="Copy link"
        >
          <Copy className="h-3 w-3 text-coffee-600" />
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded hover:bg-coffee-100 transition-colors"
          title="Open link"
        >
          <ExternalLink className="h-3 w-3 text-coffee-600" />
        </a>
      </div>
      
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-coffee-800 text-white text-xs rounded">
          Copied!
        </div>
      )}
    </div>
  )
}
