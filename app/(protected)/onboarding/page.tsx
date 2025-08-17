'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { createBusiness, updateBusiness, uploadLogoForUser } from '@/lib/supabase'
import { slugify, randomSuffix } from '@/utils/slug'

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
      // First create the business row (with slug), retry on slug conflicts
      const base = slugify(businessName || 'my-business')
      let newBiz: any = null
      let attempts = 0
      let lastErr: any = null
      while (!newBiz && attempts < 3) {
        const candidate = `${base}-${randomSuffix(4)}`
        try {
          const visitsNormalized = Math.max(1, Number.isFinite(visits as any) ? Math.round(visits as any) : 1)
          newBiz = await createBusiness({
            user_id: user.id,
            business_name: businessName || 'My Business',
            slug: candidate,
            logo_url: null,
            brand_color: brandColor,
            loyalty_visits_required: visitsNormalized,
          } as any)
        } catch (e: any) {
          lastErr = e
          // Unique violation on slug – try another
          if (e?.code === '23505' || (e?.message || '').toLowerCase().includes('duplicate key') ) {
            attempts++
            continue
          }
          throw e
        }
      }
      if (!newBiz) throw lastErr || new Error('Unable to create business')

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
            <input
              type="number"
              min={1}
              value={Number.isNaN(visits) ? '' : visits}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '') { setVisits(NaN as any); return }
                const n = parseInt(raw, 10)
                setVisits(Number.isNaN(n) ? (NaN as any) : n)
              }}
              onBlur={() => { if (Number.isNaN(visits) || visits < 1) setVisits(1) }}
              className="w-full border rounded-lg px-3 py-2"
            />
            <p className="text-sm text-coffee-700 mt-2">Customers earn a reward every <strong>{Math.max(1, Number.isNaN(visits) ? 1 : visits)}</strong> visits.</p>
            <div className="mt-6 flex justify-between"><button className="btn-secondary" onClick={prev}>Back</button><button className="btn-primary disabled:opacity-60" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Saving…' : 'Finish'}</button></div>
          </div>
        )}
      </div>
    </ProtectedPage>
  )
}

