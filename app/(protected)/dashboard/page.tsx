'use client'

import { useEffect, useState } from 'react'
import {
  getStatsForUser,
  getDailyVisitsForUser,
  getBusinessByUserId,
  getRecentCustomers,
  getRecentCheckIns
} from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { BrandIdentity } from '@/components/brand/BrandIdentity'
import { 
  Activity, 
  Users, 
  Star, 
  QrCode, 
  Settings, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  Coffee, 
  Clock, 
  BarChart3, 
  Heart, 
  Award, 
  Shield, 
  RefreshCw, 
  ArrowLeft,
  Zap,
  Target,
  Crown,
  Gem,
  Flame,
  Sunrise,
  Moon,
  Palette,
  Eye,
  EyeOff,
  Calendar
} from 'lucide-react'

interface Stats {
  totalVisits: number
  totalCustomers: number
  averageRating: number
  monthlyGrowth: number
}

interface DailyVisit {
  date: string
  visits: number
}

interface Customer {
  id: string
  business_id: string
  local_storage_id: string
  current_visits: number
  phone?: string | null
  created_at: string
}

interface CheckIn {
  id: number
  business_id: string
  customer_id: string
  local_storage_id: string | null
  created_at: string
}

interface Business {
  id: string
  business_name: string
  brand_color: string
  loyalty_visits_required: number
  logo_url?: string | null
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([])
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([])
  const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([])
  const [business, setBusiness] = useState<Business | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('Fetching dashboard data for user:', user.id)

        // First, try to get the user's business
        let businessData = await getBusinessByUserId(user.id)
        console.log('Business data:', businessData)
        
        if (!businessData) {
          console.log('No business found, redirecting to onboarding...')
          // Redirect to onboarding instead of creating test business
          router.push('/onboarding')
          return
        }
        
        // Check if business has required fields set
        if (!businessData.business_name || businessData.business_name === 'Test Coffee Shop') {
          console.log('Business setup incomplete, redirecting to onboarding...')
          router.push('/onboarding')
          return
        }
        
        setBusiness(businessData)

        console.log('Fetching stats, visits, customers, and check-ins...')
        const [statsData, visitsData, customersData, checkInsData] = await Promise.all([
          getStatsForUser(user.id),
          getDailyVisitsForUser(user.id),
          getRecentCustomers(user.id),
          getRecentCheckIns(user.id)
        ])
        
        console.log('Data fetched:', { statsData, visitsData, customersData, checkInsData })
        
        setStats(statsData)
        setDailyVisits(visitsData)
        setRecentCustomers(customersData)
        setRecentCheckIns(checkInsData)
      } catch (err) {
        console.error('Dashboard error:', err)
        setError(`Failed to load dashboard data: ${err instanceof Error ? err.message : 'Unknown error'}. Please try refreshing the page.`)
      } finally {
        setLoading(false)
        // Trigger entrance animations
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchData()
  }, [user, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner 
          size="md"
          text="Loading Dashboard"
          
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Shield className="w-12 h-12 text-red-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Dashboard Error</h3>
            <p className="text-slate-400 text-lg font-medium">{error}</p>
            <p className="text-slate-500 text-sm">
              This usually happens when setting up your business for the first time.
            </p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button 
              onClick={() => router.push('/onboarding')}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-green-500/25 transform hover:scale-105 mx-auto"
            >
              <Settings className="w-5 h-5" />
              <span>Complete Business Setup</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show setup message if no business data
  if (!business) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Settings className="w-12 h-12 text-blue-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Business Setup Required</h3>
            <p className="text-slate-400 text-lg font-medium">
              Let's get your business set up so you can start using Bond!
            </p>
          </div>
          <button 
            onClick={() => router.push('/onboarding')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 mx-auto"
          >
            <Settings className="w-5 h-5" />
            <span>Start Business Setup</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Premium Animated Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-3xl border-b border-slate-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-6">
              <div className="relative group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <BrandIdentity size="sm" variant="light" showTagline={false} />
                </div>
                {/* Enhanced animated glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Dashboard</h1>
                <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-medium">Welcome back, {business?.business_name || 'Business Owner'}</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-4">
              <button
                onClick={() => router.push('/qr')}
                className="group px-3 sm:px-6 py-2 sm:py-3 bg-slate-800/80 text-slate-200 rounded-2xl font-semibold hover:bg-slate-700 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 border border-slate-700/60 hover:border-slate-500/80 hover:scale-105 transform text-sm sm:text-base"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>QR Code</span>
              </button>

              <button
                onClick={() => router.push('/loyalty-settings')}
                className="group px-3 sm:px-6 py-2 sm:py-3 bg-slate-800/80 text-slate-200 rounded-2xl font-semibold hover:bg-slate-700 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 border border-slate-700/60 hover:border-slate-500/80 hover:scale-105 transform text-sm sm:text-base"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleSignOut}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-red-900/80 text-red-200 rounded-2xl font-semibold hover:bg-red-800 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 border border-red-700/60 hover:border-red-600/80 hover:scale-105 transform text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-12 relative z-10">
        {/* Welcome Section with Enhanced Animated Text */}
        <section className={`text-center space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Ready to Brew Success?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto px-4">
              Your coffee shop is buzzing with activity. Here's what's happening today.
            </p>
            </div>
        </section>
        {/* Enhanced KPI Cards with Advanced Animations */}
        <section className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Total Check-ins */}
          <div 
            className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl transition-all duration-700 hover:-translate-y-3 transform hover:scale-[1.02] cursor-pointer ${hoveredCard === 'checkins' ? 'border-blue-500/50 shadow-blue-500/25' : ''}`}
            onMouseEnter={() => setHoveredCard('checkins')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Enhanced animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">Total Check-ins</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{stats?.totalVisits || 0}</p>
                </div>
              </div>

              {/* Enhanced animated progress bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min((stats?.totalVisits || 0) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Loyal Customers */}
          <div 
            className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl transition-all duration-700 hover:-translate-y-3 transform hover:scale-[1.02] cursor-pointer ${hoveredCard === 'customers' ? 'border-green-500/50 shadow-green-500/25' : ''}`}
            onMouseEnter={() => setHoveredCard('customers')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm font-medium">Loyal Customers</p>
                  <p className="text-4xl font-bold text-white">{recentCustomers.length}</p>
                </div>
              </div>

              {/* Enhanced animated progress bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min((recentCustomers.length / Math.max(stats?.totalCustomers || 1, 1)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Monthly Growth */}
          <div 
            className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl transition-all duration-700 hover:-translate-y-3 transform hover:scale-[1.02] cursor-pointer ${hoveredCard === 'growth' ? 'border-purple-500/50 shadow-purple-500/25' : ''}`}
            onMouseEnter={() => setHoveredCard('growth')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm font-medium">Monthly Growth</p>
                  <p className="text-4xl font-bold text-white">{stats?.monthlyGrowth || 0}%</p>
                </div>
              </div>

              {/* Enhanced animated progress bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min(Math.abs(stats?.monthlyGrowth || 0) / 50 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Recent Activity
              </h3>
              <p className="text-slate-400 text-lg font-medium">Stay updated with your latest customer interactions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Check-ins */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">Recent Check-ins</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {recentCheckIns.slice(0, 5).map((checkIn, index) => (
                      <div 
                        key={checkIn.id}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:bg-slate-800/80 group/item"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Customer {checkIn.customer_id.slice(0, 8)}</p>
                            <p className="text-slate-400 text-sm">{getTimeAgo(checkIn.created_at)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Visits Chart */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">Daily Visits</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {dailyVisits.slice(0, 7).map((visit, index) => (
                      <div 
                        key={visit.date}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:bg-slate-800/80 group/item"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            <p className="text-slate-400 text-sm">{visit.visits} visits</p>
                          </div>
                        </div>
                        
                        {/* Enhanced Progress Bar */}
                        <div className="flex-1 max-w-32 ml-4">
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                              style={{ width: `${Math.min(visit.visits / 20 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <p className="text-slate-400 text-lg font-medium">Get things done faster with these shortcuts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => router.push('/qr')}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Generate QR Code</h4>
                  <p className="text-slate-400 text-sm">Create customer check-in links</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/customers')}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Manage Customers</h4>
                  <p className="text-slate-400 text-sm">View your customer base</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/loyalty-settings')}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Settings</h4>
                  <p className="text-slate-400 text-sm">Customize your loyalty program</p>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Customer Insights with Advanced Cards */}
        <section className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">Customer Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, label: 'Loyal Customers', value: recentCustomers.filter(c => c.current_visits >= (business?.loyalty_visits_required || 7)).length.toString(), color: 'from-yellow-500 to-orange-500', description: `Customers with ${business?.loyalty_visits_required || 7}+ visits` },
              { icon: Gem, label: 'New This Month', value: recentCustomers.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length.toString(), color: 'from-gray-500 to-indigo-500', description: 'First-time visitors this month' },
              { icon: Flame, label: 'Active This Week', value: recentCheckIns.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length.toString(), color: 'from-red-500 to-pink-500', description: 'Check-ins this week' }
            ].map((insight, index) => (
              <div
                key={insight.label}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <insight.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{insight.label}</h3>
                    <p className="text-3xl font-bold text-white mb-2">{insight.value}</p>
                    <p className="text-slate-400 text-sm">{insight.description}</p>
          </div>
        </div>
      </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
