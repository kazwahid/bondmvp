'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupForm({ view, onToggle }: { view: 'sign_in' | 'sign_up', onToggle: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      if (view === 'sign_up') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-coffee-300 transition-all"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-coffee-300 transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-coffee-800 text-white rounded-xl font-medium hover:bg-coffee-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : view === 'sign_up' ? 'Create Account' : 'Sign In'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded-xl text-sm ${message.includes('Check') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={onToggle}
          className="text-coffee-700 hover:text-coffee-800 text-sm transition-colors"
        >
          {view === 'sign_up' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
