'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'

interface AuthFormProps {
  initialView?: 'sign_in' | 'sign_up' | 'reset'
}

export default function AuthForm({ initialView = 'sign_in' }: AuthFormProps) {
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'reset'>(initialView)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Handle URL intent parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const intent = urlParams.get('intent')
    if (intent === 'signup') {
      setView('sign_up')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (view === 'sign_up') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else if (view === 'sign_in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        // Redirect will be handled by the auth state change
      } else if (view === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`
        })
        if (error) throw error
        setMessage('Check your email for the password reset link!')
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="flex items-center justify-center min-h-screen container-padding py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <Link href="/" className="inline-block mb-8">
              <Logo variant="light" size="md" />
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-fg">
              {view === 'sign_up' && 'Create Account'}
              {view === 'sign_in' && 'Welcome back'}
              {view === 'reset' && 'Reset Password'}
            </h1>

            <p className="text-lg leading-relaxed text-muted">
              {view === 'sign_up' && 'Start building meaningful customer connections today'}
              {view === 'sign_in' && 'Sign in to manage your loyalty program'}
              {view === 'reset' && 'Enter your email to receive a password reset link'}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border focus:border-fg focus:ring-2 focus:ring-fg/10 transition-all duration-200 text-fg placeholder-muted"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            {view !== 'reset' && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-muted">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-surface border border-border focus:border-fg focus:ring-2 focus:ring-fg/10 transition-all duration-200 text-fg placeholder-muted"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-fg transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-fg text-bg font-medium hover:bg-muted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-bg/20 border-t-bg rounded-full animate-spin mx-auto" />
              ) : (
                <>
                  {view === 'sign_up' && 'Create Account'}
                  {view === 'sign_in' && 'Sign In'}
                  {view === 'reset' && 'Send Reset Link'}
                </>
              )}
            </button>

            {/* Google OAuth */}
            {view !== 'reset' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="btn-secondary w-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
              </>
            )}
          </motion.form>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-4 rounded-lg text-sm border ${
                  message.includes('Check')
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center space-y-4"
          >
            {view === 'sign_in' && (
              <>
                <button
                  onClick={() => setView('sign_up')}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  New here? Create an account
                </button>
                <br />
                <button
                  onClick={() => setView('reset')}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Forgot your password?
                </button>
              </>
            )}

            {view === 'sign_up' && (
              <button
                onClick={() => setView('sign_in')}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Already have an account? Sign in
              </button>
            )}

            {view === 'reset' && (
              <button
                onClick={() => setView('sign_in')}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Back to sign in
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
