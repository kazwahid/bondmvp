'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { createBusiness, updateBusiness, uploadLogoForUser } from '@/lib/supabase'

export default function OnboardingPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [businessName, setBusinessName] = useState('')
  const [brandColor, setBrandColor] = useState('#6F4E37')
  const [visits, setVisits] = useState(7)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleSubmit = async () => {
    if (!user) return
    setSubmitting(true)
    try {
      // First create the business row
      const newBiz = await createBusiness({
        user_id: user.id,
        business_name: businessName || 'My Business',
        logo_url: null,
        brand_color: brandColor,
        loyalty_visits_required: visits,
      } as any)

      // Upload logo if provided and patch business
      if (logoFile) {
        const publicUrl = await uploadLogoForUser(logoFile, user.id)
        await updateBusiness(newBiz.id, { logo_url: publicUrl })
      }

      window.location.href = '/dashboard'
    } catch (e) {
      alert('Failed to save onboarding. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ProtectedPage>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-heading text-coffee-800 mb-6">Setup your program</h1>

        {step === 1 && (
          <div className="card">
            <label className="block text-sm mb-2">Business Name</label>
            <input className="w-full border rounded-lg px-3 py-2 mb-4" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g., Bond Coffee" />
            {!businessName && (<p className="text-sm text-red-600">Please enter a business name.</p>)}
            <label className="block text-sm mb-2 mt-4">Logo (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} />
            <div className="mt-6 flex justify-end"><button className="btn-primary disabled:opacity-60" onClick={next} disabled={!businessName}>Next</button></div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <label className="block text-sm mb-2">Brand Color</label>
            <div className="flex items-center gap-4">
              <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-16 p-0 border rounded" />
              <div className="flex-1 h-10 rounded" style={{ backgroundColor: brandColor }} />
            </div>
            <div className="mt-6 flex justify-between"><button className="btn-secondary" onClick={prev}>Back</button><button className="btn-primary" onClick={next}>Next</button></div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <label className="block text-sm mb-2">Visits required</label>
            <input type="number" min={1} value={visits} onChange={(e) => setVisits(parseInt(e.target.value || '1', 10))} className="w-full border rounded-lg px-3 py-2" />
            <p className="text-sm text-coffee-700 mt-2">Customers earn a reward every <strong>{Math.max(1, visits)}</strong> visits.</p>
            <div className="mt-6 flex justify-between"><button className="btn-secondary" onClick={prev}>Back</button><button className="btn-primary disabled:opacity-60" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Saving…' : 'Finish'}</button></div>
          </div>
        )}
      </div>
    </ProtectedPage>
  )
}

