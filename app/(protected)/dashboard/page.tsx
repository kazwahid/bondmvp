'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'

export default function DashboardPage() {
  return (
    <ProtectedPage>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-heading text-coffee-800 mb-6">Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Total Visits</h2>
            <p className="text-coffee-700">Coming soon</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-heading text-coffee-800 mb-2">Loyal Customers</h2>
            <p className="text-coffee-700">Coming soon</p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}

