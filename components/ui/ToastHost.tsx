'use client'

import { useEffect, useState } from 'react'
import { subscribeToasts, type Toast } from '@/hooks/useToast'

export default function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsub = subscribeToasts((t) => {
      setToasts((prev) => [...prev, t])
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id))
      }, t.durationMs ?? 2500)
    })
    return unsub
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center z-50 pointer-events-none">
      <div className="space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`pointer-events-auto rounded-lg px-4 py-2 shadow text-white ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-coffee-800'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}

