'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import ProtectedPage from '@/components/auth/ProtectedPage'
import ToastHost from '@/components/ui/ToastHost'
import ExpandableSidebar from '@/components/aceternity/ExpandableSidebar'
import AuroraBackground from '@/components/aceternity/AuroraBackground'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth'
  }

  return (
    <ProtectedPage>
      <div className="relative">
        <ExpandableSidebar />
        <div className="sm:ml-16">
          <header className="px-6 py-4 border-b border-coffee-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-100 border border-coffee-200">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-coffee-700 text-sm font-medium">{user?.email}</span>
                </div>
                <button
                  className="group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-coffee-800 transition duration-300 ease-out border border-coffee-300 rounded-full shadow-sm hover:shadow-md"
                  onClick={handleSignOut}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-coffee-800 transition-all duration-300 transform group-hover:translate-x-full ease">Sign out</span>
                  <span className="relative invisible">Sign out</span>
                </button>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <ToastHost />
        </div>
      </div>
    </ProtectedPage>
  )
}

