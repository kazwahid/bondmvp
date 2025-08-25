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
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

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
        
      } catch (err) {
        console.error('Error initializing check-in:', err)
        setError('Failed to initialize check-in')
      } finally {
        setLoading(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    initializeCheckIn()
  }, [token, businessId])

  const handleCheckIn = async () => {
    if (!business || !customer || !token) return
    
    try {
      setCheckingIn(true)
      setError(null)
      
      // Increment visit
      const result = await incrementVisitWithToken(business.id, customer.id, customer.id, token)
      
      // Update customer state
      const updatedCustomer = { ...customer, current_visits: result.current_visits }
      setCustomer(updatedCustomer)
      setCheckInComplete(true)
      
      // Show confetti if reward earned
      if (result.current_visits >= business.loyalty_visits_required) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
      
    } catch (err) {
      console.error('Error during check-in:', err)
      setError('Failed to complete check-in')
    } finally {
      setCheckingIn(false)
    }
  }

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100)
  }

  const getVisitsRemaining = (current: number, required: number) => {
    return Math.max(required - current, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <LoadingSpinner 
          size="md"
          text="Loading Check-in"
          
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Check-in Failed</h3>
            <p className="text-slate-400 text-lg font-medium">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )
  }

  if (!business || !customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Users className="w-12 h-12 text-slate-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Invalid Check-in</h3>
            <p className="text-slate-400 text-lg font-medium">Unable to load business or customer information</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
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
              <Star className="w-6 h-6 text-yellow-400" style={{ transform: `rotate(${Math.random() * 360}deg)` }} />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-12">
          {/* Business Header */}
          <section className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl overflow-hidden">
                {business?.logo_url ? (
                  <img 
                    src={business.logo_url} 
                    alt={`${business?.business_name || 'Business'} logo`}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <Coffee className="w-12 h-12 text-white" />
                )}
              </div>
              {/* Animated glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white tracking-tight">
                Welcome to <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{business.business_name}</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
                Scan your QR code to check in and earn loyalty rewards
              </p>
            </div>
          </section>

          {!checkInComplete ? (
            /* Pre Check-in State */
            <section className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Status Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Your Progress</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="text-center space-y-3">
                        <div className="text-6xl font-bold text-white">{customer.current_visits}</div>
                        <div className="text-xl text-slate-400 font-medium">of {business.loyalty_visits_required} visits</div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${getProgressPercentage(customer.current_visits, business.loyalty_visits_required)}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-slate-400 text-lg">
                          {getVisitsRemaining(customer.current_visits, business.loyalty_visits_required)} more visits until your free coffee!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Check-in Action Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Ready to Check-in?</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-slate-400 text-lg text-center leading-relaxed">
                        Tap the button below to check in and get one step closer to your free coffee reward!
                      </p>
                      
                      <button
                        onClick={handleCheckIn}
                        disabled={checkingIn}
                        className="w-full px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {checkingIn ? (
                          <>
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            <span>Checking In...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            <span>Check In Now</span>
                          </>
                        )}
                      </button>
                      
                      <div className="text-center text-slate-500 text-sm">
                        This will add 1 visit to your loyalty account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            /* Post Check-in State */
            <section className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Success Status Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Check-in Complete!</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="text-center space-y-3">
                        <div className="text-6xl font-bold text-white">{customer.current_visits}</div>
                        <div className="text-xl text-slate-400 font-medium">visits completed</div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${getProgressPercentage(customer.current_visits, business.loyalty_visits_required)}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-center">
                        {customer.current_visits >= business.loyalty_visits_required ? (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                              <Gift className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-2xl font-bold text-yellow-400">🎉 You've earned a free coffee! 🎉</p>
                            <p className="text-slate-400">Show this to the barista to redeem your reward</p>
                          </div>
                        ) : (
                          <p className="text-slate-400 text-lg">
                            {getVisitsRemaining(customer.current_visits, business.loyalty_visits_required)} more visits until your free coffee!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <ArrowRight className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">What's Next?</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {customer.current_visits >= business.loyalty_visits_required ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-2xl">
                            <Gift className="w-6 h-6 text-green-400" />
                            <span className="text-green-300 font-medium">Redeem your free coffee at the counter</span>
                          </div>
                          <div className="flex items-center space-x-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
                            <RefreshCw className="w-6 h-6 text-blue-400" />
                            <span className="text-blue-300 font-medium">Your visits will reset and you can start earning again</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
                            <Target className="w-6 h-6 text-blue-400" />
                            <span className="text-blue-300 font-medium">Keep visiting to earn your free coffee</span>
                          </div>
                          <div className="flex items-center space-x-3 p-4 bg-slate-800/50 border border-slate-600/60 rounded-2xl">
                            <Clock className="w-6 h-6 text-slate-400" />
                            <span className="text-slate-300 font-medium">Come back soon for your next check-in</span>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => window.location.reload()}
                        className="w-full px-6 py-4 bg-slate-700/80 text-slate-200 rounded-2xl font-semibold hover:bg-slate-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-600/60 hover:border-slate-500/80 group"
                      >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Check In Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Loyalty Program Info */}
          <section className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Loyalty Program</h2>
                  <p className="text-slate-400 text-lg font-medium">How it works at {business.business_name}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Zap, title: 'Earn Visits', description: `Visit ${business.loyalty_visits_required} times to earn a free coffee` },
                    { icon: Gift, title: 'Get Rewards', description: 'Redeem your free coffee at the counter' },
                    { icon: RefreshCw, title: 'Start Over', description: 'Your visits reset and you can earn again' }
                  ].map((step, index) => (
                    <div key={step.title} className="text-center space-y-4 group/step">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover/step:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
