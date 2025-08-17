'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import AuroraBackground from '@/components/aceternity/AuroraBackground'
import { Business, createRedemption, getBusiness, getBusinessBySlug, getOrCreateCustomer, updateCustomerVisits, logVisitEvent, createReferral, getOpenReferralForReferrer, markReferralCredited, incrementVisitWithToken } from '@/lib/supabase'

import OTPBind from '@/components/customer/OTPBind'

import LastActivity from '@/components/customer/LastActivity'

function getOrSetDeviceId(businessId: string) {
  const key = `bond_device_${businessId}`
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export default function CustomerPage() {
  const params = useParams<{ handle: string }>()
  const handle = decodeURIComponent(params.handle as string)
  const [biz, setBiz] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [visits, setVisits] = useState(0)

  const [refToken, setRefToken] = useState<string | null>(null)

  const progress = useMemo(() => {
    if (!biz) return 0
    return Math.min(100, Math.round((visits / biz.loyalty_visits_required) * 100))
  }, [visits, biz])

  useEffect(() => {
    const go = async () => {
      try {
        // Accept either UUID or slug
        let b: Business | null = null
        const isUuid = /^[0-9a-fA-F-]{36}$/.test(handle)
        b = isUuid ? await getBusiness(handle) : await getBusinessBySlug(handle)
        if (!b) throw new Error('Business not found')
        setBiz(b)
        const deviceId = getOrSetDeviceId(b.id)
        const customer = await getOrCreateCustomer(b.id, deviceId)
        // Ensure a reusable referral token exists for this referrer
        try {
          const existing = await getOpenReferralForReferrer(b.id, customer.id)
          if (existing && existing.token) setRefToken(existing.token)
          else {
            const token = crypto.randomUUID().slice(0, 8)
            await createReferral(b.id, customer.id, token)
            setRefToken(token)
          }
        } catch {}
        setCustomerId(customer.id)
        setVisits(customer.current_visits)
      } catch (e: any) {
        console.error('Customer page load error:', e?.message || e)
        setError('Unable to load loyalty page')
      } finally {
        setLoading(false)
      }
    }
    go()
  }, [handle])

  const [cooldown, setCooldown] = useState(false)
  const addVisit = async () => {
    if (!biz || !customerId || cooldown) return
    setCooldown(true)
    const device = getOrSetDeviceId(biz.id)
    // Require a valid short-lived token to increment
    const url = new URL(window.location.href)
    const token = url.searchParams.get('t')
    const ref = url.searchParams.get('ref')
    if (!token) { setCooldown(false); alert('Invalid or missing QR token. Please scan the merchant QR.'); return }
    try {
      const result = await incrementVisitWithToken(biz.id, customerId, device, token, ref)
      setVisits(result.current_visits)
    } catch (e: any) {
      const msg = (e?.message || '').toLowerCase()
      if (msg.includes('velocity_violation')) alert('Too soon since your last check-in. Please try again later.')
      else alert('This QR token is invalid or expired. Please rescan the merchant QR.')
    }
    // If landing with a referral token and this is the first visit, try to credit
    try {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('ref')
      if (token && visits === 0) {
        await markReferralCredited(token, customerId)
      }
    } catch {}
    setTimeout(() => setCooldown(false), 4000)
  }

  const redeem = async () => {
    if (!biz || !customerId) return
    if (visits < biz.loyalty_visits_required) return
    await createRedemption(biz.id, customerId)
    const updated = await updateCustomerVisits(customerId, 0)
    setVisits(updated.current_visits)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-coffee-700">Loading…</div>
  if (error || !biz) return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Not found'}</div>

  const nearGoal = biz && visits >= biz.loyalty_visits_required - 1 && visits < biz.loyalty_visits_required

  return (
    <AuroraBackground variant="customer">
      <div className="min-h-screen flex flex-col items-center justify-start p-6">
        <div className="w-full max-w-md mt-10 text-center">
        {biz.logo_url && (
          <img src={biz.logo_url} alt="Logo" className="mx-auto mb-4 h-16 object-contain" />
        )}
        <h1 className="font-heading text-2xl mb-2" style={{ color: biz.brand_color }}>Welcome back!</h1>
        <div className="rounded-2xl border border-coffee-200 bg-white/70 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-4">
          <div className="h-6 w-full bg-coffee-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: biz.brand_color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <p className="mt-3 text-coffee-700">{visits} / {biz.loyalty_visits_required} visits</p>
          <AnimatePresence>
            {nearGoal && (
              <motion.p
                className="text-coffee-700 text-sm"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {visits === biz.loyalty_visits_required - 1 ? 'One visit to go!' : 'Almost there!'}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="mt-6 flex gap-3 justify-center items-center">
            <button className="btn-secondary disabled:opacity-60" onClick={addVisit} disabled={cooldown}>Add visit</button>
            <button className={`btn-primary disabled:opacity-60 ${visits >= biz.loyalty_visits_required ? 'shine-effect' : ''}`} style={{ backgroundColor: biz.brand_color }} onClick={redeem} disabled={visits < biz.loyalty_visits_required}>Redeem</button>
          </div>
          <p className="mt-2 text-xs text-coffee-600">{cooldown ? 'Saved' : ' '}</p>
        </div>
          <div className="mt-6 text-sm text-coffee-700">
            <div className="p-3 border rounded-lg bg-white/80">
              <div className="font-heading text-coffee-800 mb-1">Save your progress</div>
              <div className="text-coffee-700">Add your phone to keep visits across devices.</div>
              <OTPBind customerId={customerId || undefined} />
            </div>
          </div>

          <div className="mt-4 text-sm text-coffee-700">
            <div className="p-3 border rounded-lg bg-white/80">
              <div className="font-heading text-coffee-800 mb-1">Last activity</div>
              <LastActivity businessId={biz.id} customerId={customerId || undefined} />
            </div>
          </div>


          <div className="mt-4 text-sm text-coffee-700">
            <div className="p-3 border rounded-lg bg-white/80">
              <div className="font-heading text-coffee-800 mb-1">Refer a friend</div>
              <div className="text-coffee-700">Share your link. When a friend checks in, you earn a free visit.</div>
              <div className="mt-2 flex gap-2">
                <a className="flex-1 text-sm text-coffee-700 break-all rounded border border-coffee-200 bg-white px-3 py-2 hover:underline" href={typeof window !== 'undefined' && refToken && biz ? `${window.location.origin}/c/${encodeURIComponent(biz.slug || biz.id)}?ref=${refToken}` : '#'} target="_blank" rel="noopener noreferrer">
                  {typeof window !== 'undefined' && refToken && biz ? `${window.location.origin}/c/${encodeURIComponent(biz.slug || biz.id)}?ref=${refToken}` : ''}
                </a>
                <button className="btn-secondary" onClick={async () => { if (biz && refToken) await navigator.clipboard.writeText(`${window.location.origin}/c/${encodeURIComponent(biz.slug || biz.id)}?ref=${refToken}`); }}>Copy</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AuroraBackground>
  )
}

