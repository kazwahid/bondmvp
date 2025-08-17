'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getBusinessByUserId, updateBusiness, uploadLogoForUser } from '@/lib/supabase'

import AuroraBackground from '@/components/aceternity/AuroraBackground'
import FeatureCard from '@/components/aceternity/FeatureCard'
export default function SettingsPage() {
  return (
    <ProtectedPage>
      <SettingsInner />
    </ProtectedPage>
  )
}

function SettingsInner() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [brandColor, setBrandColor] = useState('#6F4E37')
  const [visits, setVisits] = useState(7)

  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const go = async () => {
      try {
        if (!user) return
        const biz = await getBusinessByUserId(user.id)
        if (biz) {
          setBusinessName(biz.business_name)
          setBrandColor(biz.brand_color)
          setVisits(biz.loyalty_visits_required)
          setLogoUrl(biz.logo_url)
        }
      } catch (e) {
        setError('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    go()
  }, [user])

  const handleLogo = async (file: File) => {
    if (!user) return
    const url = await uploadLogoForUser(file, user.id)
    setLogoUrl(url)
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      const biz = await getBusinessByUserId(user.id)
      if (!biz) throw new Error('Business not found')
      await updateBusiness(biz.id, {
        business_name: businessName,
        brand_color: brandColor,
        loyalty_visits_required: visits,
        logo_url: logoUrl,
      })
      alert('Saved!')
    } catch (e) {
      alert('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center text-coffee-700">Loading…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <AuroraBackground variant="settings">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_120px_at_50%_0,rgba(139,115,85,0.15),transparent)]" />
          <h1 className="text-3xl font-heading text-coffee-800 mb-2">Settings</h1>
          <p className="text-coffee-700 mb-6">Fine-tune your brand and program.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard variant="highlight" title="Business Configuration" description="Core settings for your loyalty program">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Business Name</label>
                <input className="w-full border rounded-lg px-3 py-2" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">Brand Color</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-16 p-0 border rounded" />
                  <div className="flex-1 h-10 rounded" style={{ backgroundColor: brandColor }} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">Visits required</label>
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
              </div>
            </div>
          </FeatureCard>

          <FeatureCard variant="glow" title="Brand Assets" description="Upload your logo and customize appearance">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                {logoUrl ? (<img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />) : (<span className="text-coffee-600 text-sm">No logo</span>)}
              </div>
              <input type="file" accept="image/*" className="text-sm" onChange={(e) => e.target.files && handleLogo(e.target.files[0])} />
            </div>
          </FeatureCard>
        </div>

        <FeatureCard variant="minimal" className="mt-6" title="Advanced Settings" description="Anti-fraud and security controls">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 font-medium">Velocity (minutes)</label>
              <input type="number" min={0} className="w-full border rounded-lg px-3 py-2" disabled placeholder="Coming soon" />
            </div>
            <div>
              <label className="block text-sm mb-2 font-medium">Manager PIN</label>
              <input type="password" className="w-full border rounded-lg px-3 py-2" disabled placeholder="Coming soon" />
            </div>
          </div>
        </FeatureCard>

        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} className="btn-primary disabled:opacity-60" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>
    </AuroraBackground>
  )
}

