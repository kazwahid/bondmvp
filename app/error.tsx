'use client'

import React from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-fg px-6">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        {error?.message ? (
          <p className="text-muted mb-6 break-words">{error.message}</p>
        ) : (
          <p className="text-muted mb-6">An unexpected error occurred.</p>
        )}
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-dark-900 font-semibold hover:shadow-lg transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
} 