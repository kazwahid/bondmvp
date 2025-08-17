'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { getBusinessByUserId } from '@/lib/supabase'
import SignupForm from '@/components/aceternity/SignupForm'
import AuroraBackground from '@/components/aceternity/AuroraBackground'

function AuthInner() {
  const router = useRouter()
  const search = useSearchParams()
  const initialView = useMemo(() => (search?.get('view') === 'sign_up' ? 'sign_up' : 'sign_in'), [search])
  const { user, loading } = useAuth()
  const [redirecting, setRedirecting] = useState(false)
  const [currentView, setCurrentView] = useState<'sign_in' | 'sign_up'>(initialView)

  useEffect(() => {
    if (loading) return
    const go = async () => {
      if (!user) return
      setRedirecting(true)
      try {
        const biz = await getBusinessByUserId(user.id)
        router.replace(biz ? '/dashboard' : '/onboarding')
      } catch {
        router.replace('/onboarding')
      }
    }
    go()
  }, [user, loading, router])

  if (loading || (user && redirecting)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="text-coffee-700">Loading…</div>
      </div>
    )
  }

  return (
    <AuroraBackground variant="auth">
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-coffee-200 bg-white/70 backdrop-blur p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/brand/bond-logo.svg" className="h-8 w-8" />
          <img src="/brand/bond-wordmark.svg" className="h-7" />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading text-coffee-800 mb-2">
            {currentView === 'sign_up' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-coffee-700 text-sm">
            {currentView === 'sign_up' ? 'Start building customer loyalty today' : 'Sign in to your Bond dashboard'}
          </p>
        </div>
        <SignupForm
          view={currentView}
          onToggle={() => setCurrentView(currentView === 'sign_up' ? 'sign_in' : 'sign_up')}
        />
        </div>
      </div>
    </AuroraBackground>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-coffee-100 to-coffee-200"><div className="text-coffee-700">Loading…</div></div>}>
      <AuthInner />
    </Suspense>
  )
}
