'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import ProtectedPage from '@/components/auth/ProtectedPage'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth'
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen">
        <header className="px-6 py-4 border-b border-coffee-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/dashboard" className="logo-bond">Bond</a>
              <nav className="hidden sm:flex items-center gap-4 text-sm">
                <a href="/dashboard" className="text-coffee-700 hover:underline">Dashboard</a>
                <a href="/qr" className="text-coffee-700 hover:underline">QR Code</a>
                <a href="/settings" className="text-coffee-700 hover:underline">Settings</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-coffee-700 text-sm hidden sm:inline">{user?.email}</span>
              <button className="btn-secondary" onClick={handleSignOut}>Sign out</button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </ProtectedPage>
  )
}

