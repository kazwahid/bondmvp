'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getStatsForUser } from '@/lib/supabase'
import VisitsArea from '@/components/charts/VisitsArea'
import RedemptionsBar from '@/components/charts/RedemptionsBar'
import ConversionRadial from '@/components/charts/ConversionRadial'
import AuroraBackground from '@/components/aceternity/AuroraBackground'


export default function DashboardPage() {
  return (
    <ProtectedPage>
      <DashboardInner />
    </ProtectedPage>
  )
}

function DashboardInner() {
  const { user } = useAuth()
  const [stats, setStats] = useState<{ totalVisits: number, totalRedemptions: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const go = async () => {
      try {
        if (!user) return
        const s = await getStatsForUser(user.id)
        setStats(s)
      } catch (e) {
        setError('Unable to load stats')
      }
    }
    go()
  }, [user])

  const [series, setSeries] = useState<{ visits: { d: string, c: number }[], reds: { d: string, c: number }[] }>({ visits: [], reds: [] })
  useEffect(() => {
    const load = async () => {
      if (!user) return
      try {
        const s = await getStatsForUser(user.id)
        setStats(s)
        const { getDailyVisitsForUser } = await import('@/lib/supabase')
        const visits = await getDailyVisitsForUser(user.id, 14)
        // Placeholder: use visits series for reds too until we add daily grouping
        setSeries({ visits, reds: visits })
      } catch (e) { setError('Unable to load stats') }
    }
    load()
  }, [user])

  return (
    <AuroraBackground variant="dashboard">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-heading text-coffee-800 mb-6">Dashboard</h1>
        {error && (<p className="text-red-600">{error}</p>)}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Total Visits</h2>
            <p className="text-4xl font-heading text-coffee-800">{stats ? stats.totalVisits : '—'}</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Total Redemptions</h2>
            <p className="text-4xl font-heading text-coffee-800">{stats ? stats.totalRedemptions : '—'}</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Visits (last 14)</h2>
            <VisitsArea data={series.visits} />
          </div>
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Redemptions</h2>
            <RedemptionsBar data={series.reds} />
          </div>
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Conversion</h2>
            <ConversionRadial value={stats ? Math.min(100, Math.round((stats.totalRedemptions / Math.max(1, stats.totalVisits)) * 100)) : 0} />
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}

      {/* Recent activity */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <RecentActivityCard />
      </div>



function RecentActivityCard() {
  const { user } = useAuth()
  const [rows, setRows] = useState<Array<{ type: 'visit'|'redeem', ts: string, who?: string }>>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const go = async () => {
      try {
        if (!user) return
        const { getRecentActivity } = await import('@/lib/supabase')
        const { visits, redemptions } = await getRecentActivity(user.id, 10)
        const vs = visits.map(v => ({ type: 'visit' as const, ts: v.created_at, who: v.local_storage_id?.slice(-4) }))
        const rs = redemptions.map(r => ({ type: 'redeem' as const, ts: r.redeemed_at }))
        const merged = [...vs, ...rs].sort((a,b) => +new Date(b.ts) - +new Date(a.ts)).slice(0, 10)
        setRows(merged)
      } catch (e) {
        setError('Unable to load activity')
      }
    }
    go()
  }, [user])
  const { timeAgo } = require('@/utils/time')
  return (
    <div className="card">
      <h2 className="text-xl font-heading text-coffee-800 mb-2">Recent activity</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="divide-y">
        {rows.length === 0 && (<li className="py-3 text-coffee-600 text-sm">No activity yet</li>)}
        {rows.map((r, i) => (
          <li key={i} className="py-3 flex items-center justify-between">
            <span className="text-sm text-coffee-800">{r.type === 'visit' ? 'Visit' : 'Redeemed'}</span>
            <span className="text-sm text-coffee-600">{timeAgo(r.ts)}{r.who ? ` · #${r.who}` : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
