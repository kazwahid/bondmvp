'use client'

export const dynamic = 'force-dynamic'

import ProtectedPage from '@/components/auth/ProtectedPage'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { createBusiness, updateBusiness, uploadLogoForUser } from '@/lib/supabase'
import { slugify, randomSuffix } from '@/utils/slug'
import { motion } from 'framer-motion'
import { LogOut, ArrowRight, ArrowLeft, Upload, Palette, Target, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [businessName, setBusinessName] = useState('')
  const [brandColor, setBrandColor] = useState('#FF6B35')
  const [visits, setVisits] = useState(7)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [velocityMinutes, setVelocityMinutes] = useState(5)

  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleSubmit = async () => {
    if (!user) return
    setSubmitting(true)
    try {
      // First create the business row (with slug), retry on slug conflicts
      const base = slugify(businessName || 'my-business')
      let newBiz: any = null
      let attempts = 0
      let lastErr: any = null
      while (!newBiz && attempts < 3) {
        const candidate = `${base}-${randomSuffix(4)}`
        try {
          const visitsNormalized = Math.max(1, Number.isFinite(visits as any) ? Math.round(visits as any) : 1)
          newBiz = await createBusiness({
            user_id: user.id,
            business_name: businessName || 'My Business',
            slug: candidate,
            logo_url: null,
            brand_color: brandColor,
            loyalty_visits_required: visitsNormalized,
          } as any)
        } catch (e: any) {
          lastErr = e
          // Unique violation on slug – try another
          if (e?.code === '23505' || (e?.message || '').toLowerCase().includes('duplicate key') ) {
            attempts++
            continue
          }
          throw e
        }
      }
      if (!newBiz) throw lastErr || new Error('Unable to create business')

      // Upload logo if provided and patch business
      if (logoFile) {
        const publicUrl = await uploadLogoForUser(logoFile, user.id)
        await updateBusiness(newBiz.id, { logo_url: publicUrl })
      }

      window.location.href = '/dashboard'
    } catch (e) {
      alert('Failed to save onboarding. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Business Details', icon: Upload },
    { number: 2, title: 'Brand Identity', icon: Palette },
    { number: 3, title: 'Loyalty Setup', icon: Target }
  ]

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
          {/* Header with Sign Out */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display uppercase tracking-wider mb-2 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Welcome to Bond Studio
              </h1>
              <p className="text-slate-400 text-lg font-sans">
                Let's set up your loyalty program in just a few steps
              </p>
            </div>
            
            <button
              onClick={handleSignOut}
              className="btn-secondary group flex items-center gap-2 hover:scale-105 transform transition-all duration-300"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </motion.div>

          {/* Progress Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="flex items-center space-x-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`relative group ${step <= stepItem.number ? 'text-accent' : 'text-muted'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step <= stepItem.number 
                        ? 'border-accent bg-accent text-white shadow-lg shadow-accent/25' 
                        : 'border-muted bg-surface text-muted'
                    }`}>
                      {step < stepItem.number ? (
                        <stepItem.icon className="w-6 h-6" />
                      ) : step === stepItem.number ? (
                        <stepItem.icon className="w-6 h-6" />
                      ) : (
                        <CheckCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {stepItem.number}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 transition-all duration-300 ${
                      step > stepItem.number ? 'bg-accent' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 border border-slate-700/50 shadow-2xl"
          >
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Business Details
                  </h2>
                  <p className="text-slate-400 text-lg font-medium">Tell us about your coffee shop</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-slate-400 text-lg transition-all duration-300 hover:border-slate-500/80 focus:border-accent/80"
                      placeholder="Enter your business name"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Brand Identity
                  </h2>
                  <p className="text-slate-400 text-lg font-medium">Choose your brand colors and logo</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Brand Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-20 h-20 border-2 border-slate-600/60 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      />
                      <input
                        type="text"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="flex-1 px-6 py-4 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-lg bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-accent/80"
                        placeholder="#FF6B35"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Business Logo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-600/60 rounded-2xl p-8 text-center hover:border-accent/50 transition-colors duration-300">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg font-medium">
                          {logoFile ? logoFile.name : 'Click to upload logo'}
                        </p>
                        <p className="text-slate-500 text-sm mt-2">
                          PNG, JPG up to 5MB
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Loyalty Setup
                  </h2>
                  <p className="text-slate-400 text-lg font-medium">Configure your loyalty program</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Visits Required for Free Coffee
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={visits}
                        onChange={(e) => setVisits(parseInt(e.target.value) || 5)}
                        className="w-28 px-6 py-4 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-center font-bold text-2xl bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-accent/80"
                      />
                      <span className="text-slate-300 text-lg font-medium">visits = 1 free coffee</span>
                    </div>
                    <p className="text-slate-400 text-base font-medium mt-2">
                      Set how many visits customers need to earn a free coffee reward
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Minimum Time Between Visits (Minutes)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={velocityMinutes}
                        onChange={(e) => setVelocityMinutes(parseInt(e.target.value) || 5)}
                        className="w-28 px-6 py-4 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-center font-bold text-2xl bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-accent/80"
                      />
                      <span className="text-slate-300 text-lg font-medium">minutes</span>
                    </div>
                    <p className="text-slate-400 text-base font-medium mt-2">
                      Prevent customers from checking in multiple times within this time period
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-700/50">
              <button
                onClick={prev}
                disabled={step === 1}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                  step === 1
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:shadow-xl hover:scale-105 transform'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {step < 3 ? (
                <button
                  onClick={next}
                  className="px-8 py-4 bg-gradient-to-r from-accent to-accent-bright text-white rounded-2xl font-semibold hover:from-accent-bright hover:to-accent transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Setting Up...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Setup</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedPage>
  )
}

