'use client'

// Customer UX polish and gamification pass


export const dynamic = 'force-dynamic'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Business, createRedemption, getBusiness, getOrCreateCustomer, updateCustomerVisits } from '@/lib/supabase'

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
  const params = useParams<{ businessId: string }>()
  const businessId = params.businessId
  const [biz, setBiz] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [visits, setVisits] = useState(0)

  const progress = useMemo(() => {
    if (!biz) return 0
    return Math.min(100, Math.round((visits / biz.loyalty_visits_required) * 100))
  }, [visits, biz])

  useEffect(() => {
    const go = async () => {
      try {
        const b = await getBusiness(businessId)
        if (!b) throw new Error('Business not found')
        setBiz(b)
        const deviceId = getOrSetDeviceId(businessId)
        const customer = await getOrCreateCustomer(businessId, deviceId)
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
  }, [businessId])

  const [cooldown, setCooldown] = useState(false)
  const addVisit = async () => {
    if (!biz || !customerId || cooldown) return
    setCooldown(true)
    const next = Math.min(biz.loyalty_visits_required, visits + 1)
    const updated = await updateCustomerVisits(customerId, next)
    setVisits(updated.current_visits)
    setTimeout(() => setCooldown(false), 4000)
  }

  const redeem = async () => {
    if (!biz || !customerId) return
    if (visits < biz.loyalty_visits_required) return
    await createRedemption(biz.id, customerId)
    const updated = await updateCustomerVisits(customerId, 0)
    setVisits(updated.current_visits)
    alert('Reward redeemed!')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-coffee-700">Loading…</div>
  if (error || !biz) return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Not found'}</div>

  const nearGoal = biz && visits >= biz.loyalty_visits_required - 1 && visits < biz.loyalty_visits_required

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="w-full max-w-md mt-10 text-center">
        {biz.logo_url && (
          <img src={biz.logo_url} alt="Logo" className="mx-auto mb-4 h-16 object-contain" />
        )}
        <h1 className="font-heading text-2xl mb-2" style={{ color: biz.brand_color }}>Welcome back!</h1>
        <div className="w-full bg-white border border-coffee-200 rounded-xl p-4">
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
          <div className="mt-6 flex gap-3 justify-center">
            <button className="btn-secondary disabled:opacity-60" onClick={addVisit} disabled={cooldown}>Add visit</button>
            <button className="btn-primary disabled:opacity-60" style={{ backgroundColor: biz.brand_color }} onClick={redeem} disabled={visits < biz.loyalty_visits_required}>Redeem</button>
          </div>
        </div>
      </div>
    </div>
  )
}

