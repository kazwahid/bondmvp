'use client'

import { useState } from 'react'
import { Menu, X, LayoutDashboard, QrCode, Settings } from 'lucide-react'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const Nav = () => (
    <nav className="flex flex-col gap-2 text-sm">
      <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cream-100">
        <LayoutDashboard className="h-4 w-4" /> Dashboard
      </a>
      <a href="/qr" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cream-100">
        <QrCode className="h-4 w-4" /> QR Code
      </a>
      <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cream-100">
        <Settings className="h-4 w-4" /> Settings
      </a>
    </nav>
  )
  return (
    <aside className="border-r border-coffee-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto sm:hidden px-4 py-3 flex items-center justify-between">
        <button onClick={()=>setOpen(true)} className="p-2"><Menu className="h-5 w-5" /></button>
      </div>
      <div className="hidden sm:block w-64 p-4">
        <Nav />
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={()=>setOpen(false)} />
      )}
      <div className={`fixed z-50 top-0 left-0 h-full w-72 bg-white border-r border-coffee-200 p-4 transition-transform ${open? 'translate-x-0':'-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src="/brand/bond-logo.svg" className="h-7 w-7" />
            <span className="font-semibold text-coffee-800">Bond</span>
          </div>
          <button onClick={()=>setOpen(false)} className="p-2"><X className="h-5 w-5" /></button>
        </div>
        <Nav />
      </div>
    </aside>
  )
}

