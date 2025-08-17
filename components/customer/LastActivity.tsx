'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { timeAgo } from '@/utils/time'

export default function LastActivity({ businessId, customerId }: { businessId: string, customerId?: string }) {
  const [ts, setTs] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const go = async () => {
      try {
        const { data, error } = await supabase
          .from('visit_events')
          .select('created_at')
          .eq('business_id', businessId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        if (error) throw error
        setTs((data as any)?.created_at || null)
      } catch (e) {
        setError('')
      }
    }
    go()
  }, [businessId, customerId])

  if (!ts) return <p className="text-xs text-coffee-600">No activity yet</p>
  return <p className="text-xs text-coffee-600">{`Updated ${timeAgo(ts)}`}</p>
}

