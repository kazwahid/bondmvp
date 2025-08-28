'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { 
  getBusiness, 
  getOrCreateCustomer, 
  incrementVisitWithToken, 
  getCustomerActivity 
} from '@/lib/supabase'
import { 
  Coffee, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  Award, 
  Users, 
  TrendingUp, 
  Heart, 
  Zap, 
  Crown, 
  Gem, 
  Flame, 
  Sparkles, 
  Target, 
  BarChart3,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  RefreshCw,
  Home,
  Gift,
  PartyPopper
} from 'lucide-react'

interface Business {
  id: string
  business_name: string
  brand_color: string
  loyalty_visits_required: number
  logo_url?: string | null
}

interface Customer {
  id: string
  current_visits: number
  created_at: string
}

interface CheckInResult {
  current_visits: number
  referral?: any
}

export default function CheckInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const businessId = searchParams.get('business')
  
  const [business, setBusiness] = useState<Business | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkingIn, setCheckingIn] = useState(false)
  const [checkInComplete, setCheckInComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!token || !businessId) {
      setError('Invalid check-in link')
      setLoading(false)
      return
    }

    const initializeCheckIn = async () => {
      try {
        setLoading(true)
        
        // Get business details
        const businessData = await getBusiness(businessId)
        if (!businessData) {
          setError('Business not found')
          return
        }
        setBusiness(businessData)
        
        // Get or create customer (using localStorage ID for simplicity)
        const localStorageId = localStorage.getItem('bond_customer_id') || `customer_${Date.now()}`
        if (!localStorage.getItem('bond_customer_id')) {
          localStorage.setItem('bond_customer_id', localStorageId)
        }
        
        const customerData = await getOrCreateCustomer(businessId, localStorageId)
        setCustomer(customerData)
        
        // Trigger entrance animations
        setTimeout(() => setIsVisible(true), 100)
        
      } catch (err) {
        console.error('Error initializing check-in:', err)
        setError('Failed to load check-in page')
      } finally {
        setLoading(false)
      }
    }

    initializeCheckIn()
  }, [token, businessId])

  const handleCheckIn = async () => {
    if (!customer || !business) return
    
    try {
      setCheckingIn(true)
      setError(null)
      
      // Increment visit count
      const result = await incrementVisitWithToken(token!, business.id, customer.id)
      
      if (result) {
        // Update local state
        setCustomer(prev => prev ? { ...prev, current_visits: result.current_visits } : null)
      setCheckInComplete(true)
        setShowConfetti(true)
        
        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000)
      }
      
    } catch (err) {
      console.error('Check-in error:', err)
      setError('Failed to check in. Please try again.')
    } finally {
      setCheckingIn(false)
    }
  }

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100)
  }

  const getVisitsRemaining = (current: number, required: number) => {
    const remaining = required - current
    if (remaining <= 0) return 0
    if (remaining === 1) return '1 more visit'
    return `${remaining} more visits`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <LoadingSpinner 
          size="md"
          text="Loading Check-in"
          subtext="Please wait..."
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Check-in Error</h1>
          <p className="text-slate-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (checkInComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
                <Star className="w-4 h-4 text-yellow-400" style={{ transform: `rotate(${Math.random() * 360}deg)` }} />
            </div>
          ))}
        </div>
      )}

        <div className="text-center space-y-8 max-w-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Check-in Complete! 🎉</h1>
            <p className="text-slate-400 text-lg">
              You're now at <span className="text-white font-bold">{customer?.current_visits}</span> visits!
            </p>
            {customer && business && (
              <div className="space-y-3">
                <div className="bg-slate-800/50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-2">
                    {customer.current_visits} / {business.loyalty_visits_required}
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${getProgressPercentage(customer.current_visits, business.loyalty_visits_required)}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">
                    {getVisitsRemaining(customer.current_visits, business.loyalty_visits_required)} until your free coffee!
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-8 py-4 bg-accent hover:bg-accent-bright text-white rounded-2xl font-semibold transition-all duration-300"
            >
              Check-in Again
            </button>
            <p className="text-slate-500 text-sm">
              Come back soon to earn more rewards!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile-Optimized Layout */}
      <main className="min-h-screen flex flex-col p-4 sm:p-6">
        {/* Business Header - Mobile First */}
        <section className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo Section */}
          <div className="relative mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl overflow-hidden">
                {business?.logo_url ? (
                  <img 
                    src={business.logo_url} 
                    alt={`${business?.business_name || 'Business'} logo`}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                <Coffee className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                )}
              </div>
              {/* Animated glow effect */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            </div>
            
          {/* Business Name & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight px-2">
              Welcome to <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{business?.business_name}</span>
              </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-medium max-w-md mx-auto px-2">
              Check in to earn loyalty rewards
              </p>
            </div>
          </section>

        {/* Progress Section - Mobile Optimized */}
        <section className={`flex-1 flex flex-col justify-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-6 max-w-sm mx-auto w-full">
            {/* Current Progress Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10 space-y-6">
                {/* Progress Header */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Your Progress</h2>
                    </div>
                    
                {/* Visit Counter */}
                      <div className="text-center space-y-3">
                  <div className="text-5xl sm:text-6xl font-bold text-white">{customer?.current_visits || 0}</div>
                  <div className="text-lg sm:text-xl text-slate-400 font-medium">
                    of {business?.loyalty_visits_required || 5} visits
                  </div>
                      </div>
                      
                      {/* Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4 overflow-hidden">
                        <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${getProgressPercentage(customer?.current_visits || 0, business?.loyalty_visits_required || 5)}%` }}
                        ></div>
                      </div>
                      
                {/* Progress Text */}
                      <div className="text-center">
                  <p className="text-slate-400 text-base sm:text-lg">
                    {getVisitsRemaining(customer?.current_visits || 0, business?.loyalty_visits_required || 5)} until your free coffee!
                        </p>
                    </div>
                  </div>
                </div>

                {/* Check-in Action Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10 space-y-6">
                {/* Action Header */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to Check-in?</h2>
                    </div>
                    
                {/* Action Description */}
                <div className="space-y-4">
                  <p className="text-slate-400 text-base sm:text-lg text-center leading-relaxed">
                        Tap the button below to check in and get one step closer to your free coffee reward!
                      </p>
                      
                  {/* Check-in Button */}
                      <button
                        onClick={handleCheckIn}
                        disabled={checkingIn}
                    className="w-full px-8 py-5 sm:py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                      >
                        {checkingIn ? (
                          <>
                        <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                            <span>Checking In...</span>
                          </>
                        ) : (
                          <>
                            <span>Check In Now</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                </div>
              </div>
                    </div>
                    
            {/* Additional Info */}
                      <div className="text-center space-y-3">
              <p className="text-slate-500 text-sm">
                Your progress is automatically saved
              </p>
              <div className="flex items-center justify-center space-x-2 text-slate-500 text-xs">
                <Coffee className="w-4 h-4" />
                <span>Loyalty rewards await!</span>
                </div>
              </div>
            </div>
          </section>
      </main>
    </div>
  )
}
