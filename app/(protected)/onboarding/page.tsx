'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'

export default function OnboardingPage() {
  const { user } = useAuth()

  return (
    <ProtectedPage>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-heading text-coffee-800 mb-4">Onboarding</h1>
        <p className="text-coffee-700">Welcome, {user?.email}. The onboarding flow will go here.</p>
      </div>
    </ProtectedPage>
  )
}

