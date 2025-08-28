'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for various possible URL parameters that Supabase might send
    const accessToken = searchParams.get('access_token') || searchParams.get('token')
    const refreshToken = searchParams.get('refresh_token')
    const type = searchParams.get('type')
    
    console.log('Reset password page params:', { accessToken, refreshToken, type, allParams: Object.fromEntries(searchParams.entries()) })
    console.log('Full URL:', window.location.href)
    console.log('Search params:', window.location.search)
    console.log('Hash fragment:', window.location.hash)
    
    // For OTP-based password reset, we need to handle the session differently
    // The OTP link should contain access_token and refresh_token in the hash
    if (window.location.hash.includes('access_token=')) {
      console.log('Found OTP tokens in hash, extracting...')
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const hashAccessToken = hashParams.get('access_token')
      const hashRefreshToken = hashParams.get('refresh_token')
      
      console.log('OTP hash params:', { hashAccessToken, hashRefreshToken })
      
      if (hashAccessToken) {
        // This is a valid OTP link, set up the session
        handlePasswordReset(hashAccessToken, hashRefreshToken, 'otp')
        return
      }
    }
    
    // Check if there's an error in the hash fragment
    if (window.location.hash.includes('error=')) {
      console.log('Found error in hash fragment, checking for specific errors...')
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const error = hashParams.get('error')
      const errorCode = hashParams.get('error_code')
      const errorDescription = hashParams.get('error_description')
      
      console.log('Hash error params:', { error, errorCode, errorDescription })
      
      // Handle specific Supabase errors
      if (errorCode === 'otp_expired' || error === 'access_denied') {
        setError('This password reset link has expired. Please request a new one.')
        setIsLoading(false)
        return
      }
      
      // Handle other errors
      if (error) {
        setError(`Reset link error: ${errorDescription || error}`)
        setIsLoading(false)
        return
      }
    }
    
    // If we get here, we don't have valid tokens
    setError('Invalid or expired reset link. Please request a new password reset.')
    setIsLoading(false)
  }, [searchParams])

  const handlePasswordReset = async (accessToken: string | null, refreshToken: string | null, type: string | null) => {
    if (!accessToken) {
      setError('Invalid or expired reset link. Please request a new password reset.')
      setIsLoading(false)
      return
    }

    console.log('Processing password reset with:', { 
      accessToken: accessToken ? accessToken.substring(0, 20) + '...' : null, 
      refreshToken: refreshToken ? refreshToken.substring(0, 20) + '...' : null, 
      type 
    })

    try {
      // For OTP-based password reset, set up the session directly
      if (type === 'otp') {
        console.log('Handling OTP flow with token:', accessToken.substring(0, 20) + '...')
        
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        })
        
        if (error) {
          console.error('OTP session setup failed:', error)
          throw error
        }
        
        console.log('OTP session setup successful')
        setIsLoading(false)
        return
      }
      
      // For other types, try to set the session
      console.log('Handling other reset flow')
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || '',
      })
      
      if (error) {
        console.error('Session setup failed:', error)
        throw error
      }
      
      console.log('Session setup successful')
      
    } catch (err) {
      console.error('Password reset handling error:', err)
      
      // Provide specific error messages
      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
          setError('Network error. Please check your connection and try again.')
        } else if (err.message.includes('token') || err.message.includes('expired')) {
          setError('Invalid or expired reset link. Please request a new password reset.')
        } else if (err.message.includes('connection') || err.message.includes('closed')) {
          setError('Connection error. Please check your internet connection and try again.')
        } else {
          setError('Failed to validate reset link. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsSubmitting(true)
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      })
      
      if (error) {
        console.error('Password update failed:', error)
        setError(error.message)
        return
      }
      
      setSuccess(true)
      
      // Redirect to sign in after a short delay
      setTimeout(() => {
        router.push('/auth')
      }, 3000)
      
    } catch (err) {
      console.error('Password update error:', err)
      setError('Failed to update password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Validating reset link...</p>
        </div>
      </div>
    )
  }

  if (error && !success) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {error.includes('expired') ? 'Link Expired' : 'Reset Link Invalid'}
          </h1>
          <p className="text-muted mb-6">{error}</p>
          
          {/* Additional helpful information for expired links */}
          {error.includes('expired') && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <p className="text-blue-400 text-sm">
                Password reset links expire for security reasons. This usually happens after 1 hour or if the link has already been used.
              </p>
            </div>
          )}
          
          {/* Debug information */}
          <div className="bg-surface/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs text-muted mb-2">Debug Info:</p>
            <p className="text-xs text-muted">URL: {window.location.href}</p>
            <p className="text-xs text-muted">Hash: {window.location.hash}</p>
            <p className="text-xs text-muted">Search: {window.location.search}</p>
            <p className="text-xs text-muted">All Search Params: {JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>
          </div>
          
          <div className="space-y-3">
            {error.includes('expired') ? (
              // For expired links, prioritize getting a new reset link
              <>
                <button
                  onClick={() => router.push('/auth?mode=forgot-password')}
                  className="px-8 py-4 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-lg"
                >
                  Get New Reset Link
                </button>
                <button
                  onClick={() => router.push('/auth')}
                  className="px-6 py-3 bg-surface/50 hover:bg-surface/70 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Back to Sign In
                </button>
              </>
            ) : (
              // For other errors, show retry options
              <>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 mr-2"
                >
                  Retry
                </button>
                <button
                  onClick={() => router.push('/auth')}
                  className="px-6 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Back to Sign In
                </button>
              </>
            )}
            
            <p className="text-sm text-muted">
              {error.includes('expired') ? 
                'Password reset links expire for security. Request a new one to continue.' :
                'Need a new reset link?'
              }{' '}
              <button
                onClick={() => router.push('/auth?mode=forgot-password')}
                className="text-accent hover:text-accent-bright underline"
              >
                Request another one
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Password Updated!</h1>
          <p className="text-muted mb-6">
            Your password has been successfully updated. You'll be redirected to the sign-in page shortly.
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="px-6 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg">
          {/* Animated liquid orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] bg-gradient-radial from-accent/15 via-accent/8 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: '10%',
              top: '20%'
            }}
          />
          
          <motion.div
            className="absolute w-[400px] h-[400px] bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full blur-2xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              right: '20%',
              bottom: '30%'
            }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Logo variant="light" size="lg" showText={false} />
          </div>
          <h1 className="text-3xl font-bold text-white font-display uppercase tracking-wider mb-2">
            Set New Password
          </h1>
          <p className="text font-sans">
            Create a secure password 
          </p>
        </motion.div>

        {/* Reset Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface/50 backdrop-blur-xl border border-border rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors pr-12"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-muted mt-1">Password must be at least 6 characters long</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors pr-12"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full btn-primary group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Update Password
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: isSubmitting ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </motion.button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/auth')}
              className="text-accent hover:text-accent-bright font-medium transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => router.push('/')}
            className="text-muted hover:text-white transition-colors font-sans"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>

      {/* Floating accent elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent rounded-full opacity-80"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent rounded-full opacity-60"
      />
    </div>
  )
}
