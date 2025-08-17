'use client'

import { useState } from 'react'
import { LayoutDashboard, QrCode, Settings, Menu, X } from 'lucide-react'

export default function ExpandableSidebar() {
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/qr', icon: QrCode, label: 'QR Code' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ]

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : ''}`}>
      {mobile && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src="/brand/bond-logo.svg" className="h-7 w-7" />
            <span className="font-semibold text-coffee-800">Bond</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream-100 transition-all duration-200 group ${
              mobile ? 'text-base' : expanded ? 'justify-start' : 'justify-center'
            }`}
          >
            <item.icon className="h-5 w-5 text-coffee-700 group-hover:text-coffee-800" />
            <span className={`text-coffee-700 group-hover:text-coffee-800 transition-all duration-200 ${
              mobile ? 'block' : expanded ? 'block' : 'hidden'
            }`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden sm:block fixed left-0 top-0 h-full bg-white/70 backdrop-blur border-r border-coffee-200 transition-all duration-300 z-40 ${
          expanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="h-16 flex items-center justify-center border-b border-coffee-200">
          <img src="/brand/bond-logo.svg" className="h-7 w-7" />
          {expanded && <img src="/brand/bond-wordmark.svg" className="h-6 ml-2" />}
        </div>
        <div className="p-3">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/70 backdrop-blur border border-coffee-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 sm:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-72 bg-white border-r border-coffee-200 z-50 sm:hidden">
            <SidebarContent mobile />
          </div>
        </>
      )}
    </>
  )
}
