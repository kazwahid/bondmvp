'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { getBusinessByUserId } from '@/lib/supabase'

export default function QRPage() {
  return (
    <ProtectedPage>
      <QRInner />
    </ProtectedPage>
  )
}

function tintHex(hex: string) {
  // ensure valid hex #RRGGBB
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return '#000000'
  const clean = hex.startsWith('#') ? hex.slice(1) : hex
  return `#${clean}`
}

function QRInner() {
  const { user } = useAuth()
  const [svg, setSvg] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [link, setLink] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const go = async () => {
      try {
        if (!user) return
        const biz = await getBusinessByUserId(user.id)
        const url = `${window.location.origin}/c/${biz.id}`
        setLink(url)
        const dark = tintHex(biz.brand_color || '#000000')
        const svgString = await QRCode.toString(url, { type: 'svg', margin: 1, scale: 8, color: { dark, light: '#ffffff' } })
        // If there's a logo, overlay it in the center (simple SVG group)
        if (biz.logo_url) {
          const overlay = `<image href="${biz.logo_url}" x="40%" y="40%" width="20%" height="20%" preserveAspectRatio="xMidYMid meet"/>`
          const injected = svgString.replace('</svg>', `${overlay}</svg>`)
          setSvg(injected)
        } else {
          setSvg(svgString)
        }
      } catch (e) {
        setError('Failed to generate QR code')
      } finally {
        setLoading(false)
      }
    }
    go()
  }, [user])

  const download = (type: 'svg' | 'png') => {
    if (type === 'svg') {
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'bond-qr.svg'
      a.click()
      URL.revokeObjectURL(url)
    } else {
      // Convert SVG to PNG via canvas
      const img = new Image()
      const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (!blob) return
          const a = document.createElement('a')
          const pngUrl = URL.createObjectURL(blob)
          a.href = pngUrl
          a.download = 'bond-qr.png'
          a.click()
          URL.revokeObjectURL(pngUrl)
          URL.revokeObjectURL(url)
        })
      }
      img.src = url
    }
  }

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-coffee-700">Generating…</div>
  }
  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-heading text-coffee-800 mb-6">Your QR Code</h1>
      <div className="bg-white border border-coffee-200 rounded-xl p-6 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg border" dangerouslySetInnerHTML={{ __html: svg }} />
        <p className="text-coffee-700 mt-4">This QR links to your customer page.</p>
        <div className="mt-6 flex gap-3">
          <button className="btn-secondary" onClick={() => download('svg')}>Download SVG</button>
          <button className="btn-primary" onClick={() => download('png')}>Download PNG</button>
        </div>
        <div className="mt-4 flex flex-col items-center gap-2 w-full">
          <div className="text-sm text-coffee-700 break-all">{link}</div>
          <button className="btn-secondary" onClick={async () => { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? 'Copied!' : 'Copy link'}</button>
        </div>
      </div>
    </div>
  )
}


