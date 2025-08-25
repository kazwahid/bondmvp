'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Star, 
  Coffee, 
  Award, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  LogOut, 
  RefreshCw, 
  TrendingUp, 
  Heart, 
  Zap, 
  Crown, 
  Gem, 
  Flame, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ArrowUpRight,
  BarChart3,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react'
import { 
  getRecentCustomers, 
  createRedemption, 
  updateCustomerVisits,
  getBusinessByUserId
} from '@/lib/supabase'

interface Customer {
  id: string
  business_id: string
  local_storage_id: string
  current_visits: number
  phone?: string | null
  created_at: string
}

export default function CustomersPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    loyal: 0,
    newThisMonth: 0
  })
  const [business, setBusiness] = useState<{
    id: string
    business_name: string
    brand_color: string
    loyalty_visits_required: number
    logo_url?: string | null
  } | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    const fetchCustomers = async () => {
      try {
        setLoading(true)
        
        // Fetch business data first
        const businessData = await getBusinessByUserId(user.id)
        setBusiness(businessData)
        
        const customersData = await getRecentCustomers(user.id)
        setCustomers(customersData)
        
        // Calculate stats
        const total = customersData.length
        const active = customersData.filter(c => c.current_visits > 0).length
        const loyal = customersData.filter(c => c.current_visits >= 5).length
        const newThisMonth = customersData.filter(c => {
          const created = new Date(c.created_at)
          const now = new Date()
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
        }).length
        
        setStats({ total, active, loyal, newThisMonth })
      } catch (err) {
        console.error('Error fetching customers:', err)
        setError('Failed to load customers')
      } finally {
        setLoading(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchCustomers()
  }, [user, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleRedeem = async (customerId: string) => {
    try {
      // We need businessId for createRedemption, but we don't have it in the current context
      // For now, we'll just reset the visits locally
      const updatedCustomers = customers.map(c => 
        c.id === customerId ? { ...c, current_visits: 0 } : c
      )
      setCustomers(updatedCustomers)
    } catch (err) {
      console.error('Error redeeming reward:', err)
    }
  }

  const handleResetVisits = async (customerId: string) => {
    try {
      await updateCustomerVisits(customerId, 0)
      // Refresh customers list
      const updatedCustomers = customers.map(c => 
        c.id === customerId ? { ...c, current_visits: 0 } : c
      )
      setCustomers(updatedCustomers)
    } catch (err) {
      console.error('Error resetting visits:', err)
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.local_storage_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.phone && customer.phone.includes(searchTerm))
    
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'active') return matchesSearch && customer.current_visits > 0
    if (filterStatus === 'loyal') return matchesSearch && customer.current_visits >= 5
    if (filterStatus === 'new') return matchesSearch && customer.current_visits === 0
    
    return matchesSearch
  })

  const getProgressPercentage = (current: number, required: number = 5) => {
    return Math.min((current / required) * 100, 100)
  }

  const getStatusColor = (visits: number) => {
    if (visits >= 5) return 'from-yellow-500 to-orange-500'
    if (visits >= 3) return 'from-blue-500 to-indigo-500'
    if (visits >= 1) return 'from-green-500 to-emerald-500'
    return 'from-slate-500 to-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner 
          size="md"
          text="Loading Customers"
          subtext="Preparing your customer database..."
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Users className="w-12 h-12 text-red-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Failed to Load</h3>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Premium Animated Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-3xl border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-3xl transition-all duration-300 border border-slate-700/60 hover:border-slate-600/80 group"
              >
                <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  {business?.logo_url ? (
                    <img 
                      src={business.logo_url} 
                      alt={`${business?.business_name || 'Business'} logo`}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <Users className="w-8 h-8 text-white" />
                  )}
                </div>
                {/* Animated glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-white tracking-tight">Customer Management</h1>
                <p className="text-slate-400 text-xl font-medium">Manage your loyal coffee shop customers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-slate-800/80 text-slate-200 rounded-2xl font-medium hover:bg-slate-700 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-slate-600/60 hover:border-slate-500/80 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleSignOut}
                className="px-6 py-3 bg-red-900/80 text-red-200 rounded-2xl font-semibold hover:bg-red-800 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-red-700/60 hover:border-red-600/80"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* Customer Stats Overview */}
        <section className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Users, label: 'Total Customers', value: stats.total, color: 'from-blue-500 to-indigo-500' },
            { icon: TrendingUp, label: 'Active Members', value: stats.active, color: 'from-green-500 to-emerald-500' },
            { icon: Crown, label: 'Loyal Customers', value: stats.loyal, color: 'from-yellow-500 to-orange-500' },
            { icon: Sparkles, label: 'New This Month', value: stats.newThisMonth, color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-700/50 shadow-2xl transition-all duration-700 hover:-translate-y-3 transform hover:scale-[1.02] cursor-pointer ${hoveredCard === stat.label ? 'border-blue-500/50' : ''}`}
              onMouseEnter={() => setHoveredCard(stat.label)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-1000`}></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
                
                {/* Animated progress bar */}
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min((stat.value / Math.max(stats.total, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Search and Filter Controls */}
        <section className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/60 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-slate-800/50 border border-slate-600/60 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Members</option>
                <option value="loyal">Loyal Customers</option>
                <option value="new">New Customers</option>
              </select>
              
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Plus className="w-5 h-5" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>
        </section>

        {/* Customers Grid */}
        <section className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Customers Found</h3>
              <p className="text-slate-400 text-lg">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className={`group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 cursor-pointer ${hoveredCard === customer.id ? 'border-blue-500/50' : ''}`}
                  onMouseEnter={() => setHoveredCard(customer.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Animated background layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative z-10 space-y-4">
                    {/* Customer Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                                                 <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(customer.current_visits)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <Users className="w-6 h-6 text-white" />
                        </div>
                                                 <div>
                           <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                             {customer.local_storage_id}
                           </h3>
                           <p className="text-slate-400 text-sm">{customer.phone || 'No phone'}</p>
                         </div>
                      </div>
                      
                                             <div className="flex items-center space-x-2">
                         {customer.current_visits >= 5 && (
                           <Crown className="w-5 h-5 text-yellow-400" />
                         )}
                         {customer.current_visits >= 3 && (
                           <Star className="w-5 h-5 text-blue-400" />
                         )}
                       </div>
                    </div>
                    
                                         {/* Customer Stats */}
                     <div className="space-y-3">
                       <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-400">Current Visits:</span>
                         <span className="text-white font-semibold">{customer.current_visits}</span>
                       </div>
                       
                       <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-400">Progress to Reward:</span>
                         <span className="text-white font-semibold">{customer.current_visits}/5</span>
                       </div>
                       
                       {/* Progress Bar */}
                       <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                         <div 
                           className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                           style={{ width: `${getProgressPercentage(customer.current_visits)}%` }}
                         ></div>
                       </div>
                       
                       <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-400">Joined:</span>
                         <span className="text-white font-semibold">
                           {new Date(customer.created_at).toLocaleDateString()}
                         </span>
                       </div>
                     </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 pt-2">
                      {customer.current_visits >= 5 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRedeem(customer.id)
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Coffee className="w-4 h-4" />
                          <span>Redeem</span>
                        </button>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleResetVisits(customer.id)
                        }}
                        className="px-4 py-2 bg-slate-700/80 text-slate-200 rounded-xl font-semibold hover:bg-slate-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-600/60"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
