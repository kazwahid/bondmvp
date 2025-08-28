'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motion as m } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import { Eye, EyeOff, ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import ModernPageLoader from '@/components/ui/ModernPageLoader'
import { useAuth } from '@/components/auth/AuthProvider'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState<'signin' | 'signup' | 'email-confirmation' | 'forgot-password' | 'reset-sent'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    fullName: ''
  })
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { signIn, signUp, resetPassword } = useAuth()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const modeParam = searchParams.get('mode')
    if (modeParam === 'signup') setMode('signup')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setIsSubmitting(true)
    
    try {
      if (mode === 'signup') {
        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
          setAuthError('Passwords do not match')
          setIsSubmitting(false)
          return
        }
        
        // Handle signup logic
        const { user, error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          business_name: formData.businessName,
        })
        
        if (error) {
          setAuthError(error.message)
          setIsSubmitting(false)
          return
        }
        
        if (user) {
          // Show email confirmation message instead of redirecting
          setMode('email-confirmation')
        }
      } else if (mode === 'forgot-password') {
        // Handle forgot password logic
        const { error } = await resetPassword(formData.email)
        
        if (error) {
          setAuthError(error.message)
          setIsSubmitting(false)
          return
        }
        
        // Show success message
        setMode('reset-sent')
      } else {
        // Handle signin logic
        const { user, error } = await signIn(formData.email, formData.password)
        
        if (error) {
          setAuthError(error.message)
          setIsSubmitting(false)
          return
        }
        
        if (user) {
          // Redirect to dashboard
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      setAuthError('Authentication failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return <ModernPageLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
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
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-0">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <Logo variant="light" size="lg" showText={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase tracking-wider mb-2 px-2">
            {mode === 'signin' ? 'Welcome Back' : 
             mode === 'signup' ? 'Join Bond Studio' :
             mode === 'forgot-password' ? 'Reset Password' :
             mode === 'reset-sent' ? 'Check Your Email' :
             'Welcome to BondStudio!'}
          </h1>
          <p className="text-sm sm:text-base font-sans px-2">
            {mode === 'signin' ? 'continue your journey' : 
             mode === 'signup' ? 'start your journey' :
             mode === 'forgot-password' ? 'we\'ll help you get back in' :
             mode === 'reset-sent' ? 'password reset link sent' :
             'account created successfully'}
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface/50 backdrop-blur-xl border border-border rounded-2xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Display */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm"
              >
                {authError}
              </motion.div>
            )}
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {mode !== 'forgot-password' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors pr-12"
                    placeholder="Enter your password"
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
                {mode === 'signin' && (
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-sm text-accent hover:text-accent-bright transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-bg/50 border border-border rounded-lg text-white placeholder-muted focus:border-accent focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

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
                    {mode === 'signin' ? 'Signing In...' : 
                     mode === 'signup' ? 'Creating Account...' :
                     mode === 'forgot-password' ? 'Sending Reset Link...' :
                     'Processing...'}
                  </>
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : 
                     mode === 'signup' ? 'Create Account' :
                     mode === 'forgot-password' ? 'Send Reset Link' :
                     'Submit'}
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

          {/* Email Confirmation Message */}
          {mode === 'email-confirmation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Welcome to BondStudio!</h3>
                <p className="text-muted text-lg leading-relaxed max-w-md mx-auto">
                  We've sent a confirmation link to <span className="text-white font-semibold">{formData.email}</span>. 
                  Please check your inbox and click the link to verify your account.
                </p>
                <p className="text-muted text-sm">
                  Once confirmed, you can sign in and start building your business connections.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setMode('signin')}
                  className="px-8 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Go to Sign In
                </button>
                <div className="space-y-2">
                  <p className="text-muted text-sm">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-accent hover:text-accent-bright underline"
                    >
                      try signing up again
                    </button>
                  </p>
                  <p className="text-xs text-muted/60">
                    Having trouble? Contact us at{' '}
                    <a href="mailto:hello@bondstudio.com" className="text-accent hover:text-accent-bright underline">
                      hello@bondstudio.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Forgot Password Instructions */}
          {mode === 'forgot-password' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Reset Your Password</h3>
                <p className="text-muted text-lg leading-relaxed max-w-md mx-auto">
                  Enter your email address above and click "Send Reset Link" to receive a password reset email.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setMode('signin')}
                  className="text-accent hover:text-accent-bright font-medium transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            </motion.div>
          )}

          {/* Password Reset Sent Message */}
          {mode === 'reset-sent' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Check Your Email </h3>
                <p className="text-muted text-lg leading-relaxed max-w-md mx-auto">
                  We've sent a password reset link to <span className="text-white font-semibold">{formData.email}</span>. 
                  Please check your inbox and click the link to reset your password.
                </p>
                <p className="text-muted text-sm">
                  The link will expire in 1 hour for security reasons.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setMode('signin')}
                  className="px-8 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Back to Sign In
                </button>
                <div className="space-y-2">
                  <p className="text-muted text-sm">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setMode('forgot-password')}
                      className="text-accent hover:text-accent-bright underline"
                    >
                      try again
                    </button>
                  </p>
                  <p className="text-xs text-muted/60">
                    Having trouble? Contact us at{' '}
                    <a href="mailto:hello@bondstudio.com" className="text-accent hover:text-accent-bright underline">
                      hello@bondstudio.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Mode Toggle */}
          {mode !== 'email-confirmation' && mode !== 'reset-sent' && (
            <div className="mt-8 text-center">
              <p className="text-muted font-sans">
                {mode === 'signin' ? "Don't have an account?" : 
                 mode === 'signup' ? "Already have an account?" :
                 mode === 'forgot-password' ? "Remember your password?" :
                 "Need to reset your password?"}
              </p>
              <button
                onClick={() => {
                  if (mode === 'signin') setMode('signup')
                  else if (mode === 'signup') setMode('signin')
                  else if (mode === 'forgot-password') setMode('signin')
                }}
                className="text-accent hover:text-accent-bright font-medium transition-colors mt-2"
              >
                {mode === 'signin' ? 'Sign up here' : 
                 mode === 'signup' ? 'Sign in here' :
                 mode === 'forgot-password' ? 'Back to sign in' :
                 'Try again'}
              </button>
            </div>
          )}
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
