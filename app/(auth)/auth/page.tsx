'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { getBusinessByUserId } from '@/lib/supabase'

function AuthInner() {
  const router = useRouter()
  const search = useSearchParams()
  const initialView = useMemo(() => (search?.get('view') === 'sign_up' ? 'sign_up' : 'sign_in'), [search])
  const { user, loading } = useAuth()
  const [redirecting, setRedirecting] = useState(false)

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
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-coffee-100 to-coffee-200">
        <div className="text-coffee-700">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-coffee-100 to-coffee-200">
      <div className="w-full max-w-md bg-white border border-coffee-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-heading text-coffee-800 mb-4 text-center">Welcome to Bond</h1>
        <Auth
          supabaseClient={supabase}
          view={initialView as any}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'var(--color-coffee-800)',
                  brandAccent: 'var(--color-coffee-700)'
                }
              }
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-coffee-100 to-coffee-200"><div className="text-coffee-700">Loading…</div></div>}>
      <AuthInner />
    </Suspense>
  )
}
