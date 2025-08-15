'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getBusinessByUserId, updateBusiness, uploadLogoForUser } from '@/lib/supabase'

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
        setBusinessName(biz.business_name)
        setBrandColor(biz.brand_color)
        setVisits(biz.loyalty_visits_required)
        setLogoUrl(biz.logo_url)
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
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-heading text-coffee-800 mb-6">Settings</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <label className="block text-sm mb-2">Business Name</label>
          <input className="w-full border rounded-lg px-3 py-2 mb-4" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          <label className="block text-sm mb-2">Brand Color</label>
          <div className="flex items-center gap-4">
            <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-16 p-0 border rounded" />
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: brandColor }} />
          </div>
          <label className="block text-sm mb-2 mt-4">Visits required</label>
          <input type="number" min={1} value={visits} onChange={(e) => setVisits(parseInt(e.target.value || '1', 10))} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="card flex flex-col items-center">
          <div className="w-32 h-32 rounded-lg border bg-white flex items-center justify-center overflow-hidden">
            {logoUrl ? (<img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />) : (<span className="text-coffee-600 text-sm">No logo</span>)}
          </div>
          <input type="file" accept="image/*" className="mt-4" onChange={(e) => e.target.files && handleLogo(e.target.files[0])} />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="btn-primary disabled:opacity-60" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
      </div>
    </div>
  )
}

