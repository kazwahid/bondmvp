'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Home, 
  LogOut, 
  User, 
  Calendar, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  TrendingUp, 
  Award, 
  Heart,
  Activity,
  Gift
} from 'lucide-react'

export default function CustomerPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const customerId = searchParams.get('id')
  
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<any>(null)

  // Mock customer data for demonstration
  useEffect(() => {
    // Simulate loading customer data
    setTimeout(() => {
      setCustomer({
        id: customerId || '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        joinDate: '2024-01-15',
        totalVisits: 23,
        averageRating: 4.8,
        loyaltyPoints: 450,
        visitsToReward: 5,
        lastVisit: '2024-08-20',
        favoriteItems: ['Cappuccino', 'Blueberry Muffin', 'Avocado Toast'],
        visitHistory: [
          { date: '2024-08-20', time: '09:30 AM', items: ['Cappuccino', 'Muffin'], rating: 5 },
          { date: '2024-08-18', time: '02:15 PM', items: ['Latte', 'Sandwich'], rating: 4 },
          { date: '2024-08-15', time: '11:00 AM', items: ['Espresso', 'Croissant'], rating: 5 },
          { date: '2024-08-12', time: '03:45 PM', items: ['Tea', 'Cookie'], rating: 4 },
          { date: '2024-08-10', time: '08:30 AM', items: ['Cappuccino', 'Toast'], rating: 5 }
        ],
        preferences: {
          dietary: 'Vegetarian',
          seating: 'Window seat',
          music: 'Jazz',
          temperature: 'Medium'
        }
      })
      setLoading(false)
    }, 1000)
  }, [customerId])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto shadow-lg"></div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Loading Customer</h3>
            <p className="text-slate-600 text-lg font-medium">Fetching customer information...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Customer Not Found</h3>
            <p className="text-slate-600 text-lg font-medium">The requested customer could not be located.</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-200/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-3xl transition-all duration-300 border border-slate-200/60 hover:border-slate-300/80"
              >
                <ArrowLeft className="w-7 h-7" />
              </button>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Profile</h1>
                <p className="text-slate-600 text-lg font-medium">View detailed customer information</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-white/90 text-slate-700 rounded-2xl font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-slate-200/60 shadow-md hover:shadow-lg"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-red-200/60"
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
        {/* Customer Header - Premium Card */}
        <section>
          <div className="group relative overflow-hidden bg-white rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                <User className="w-14 h-14 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-5xl font-bold text-slate-900 tracking-tight">{customer.name}</h2>
                <p className="text-xl text-slate-600 font-medium">Loyal Customer since {new Date(customer.joinDate).toLocaleDateString()}</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="group/item bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{customer.totalVisits}</div>
                  <div className="text-slate-700 font-medium">Total Visits</div>
                </div>
                <div className="group/item bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{customer.loyaltyPoints}</div>
                  <div className="text-slate-700 font-medium">Loyalty Points</div>
                </div>
                <div className="group/item bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{customer.averageRating}</div>
                  <div className="text-slate-700 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Details Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 py-3 border-b border-slate-100">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-4 py-3 border-b border-slate-100">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-4 py-3 border-b border-slate-100">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">{customer.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 py-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium">Member since {new Date(customer.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Loyalty Status */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Loyalty Status</h3>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Award className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-2">{customer.loyaltyPoints} Points</div>
                    <div className="text-slate-600 font-medium">
                      {customer.visitsToReward - (customer.totalVisits % customer.visitsToReward)} visits to next reward
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${(customer.totalVisits % customer.visitsToReward) / customer.visitsToReward * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Dietary:</span>
                    <span className="text-slate-900 font-semibold">{customer.preferences.dietary}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Seating:</span>
                    <span className="text-slate-900 font-semibold">{customer.preferences.seating}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Music:</span>
                    <span className="text-slate-900 font-semibold">{customer.preferences.music}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-600 font-medium">Temperature:</span>
                    <span className="text-slate-900 font-semibold">{customer.preferences.temperature}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit History - Table */}
        <section>
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Visit History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-4 text-slate-700 font-semibold text-lg">Date</th>
                      <th className="text-left p-4 text-slate-700 font-semibold text-lg">Time</th>
                      <th className="text-left p-4 text-slate-700 font-semibold text-lg">Items</th>
                      <th className="text-left p-4 text-slate-700 font-semibold text-lg">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.visitHistory.map((visit: any, index: number) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-300">
                        <td className="p-4 text-slate-700 font-medium">{visit.date}</td>
                        <td className="p-4 text-slate-700 font-medium">{visit.time}</td>
                        <td className="p-4 text-slate-700">
                          <div className="flex flex-wrap gap-2">
                            {visit.items.map((item: string, itemIndex: number) => (
                              <span key={itemIndex} className="px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-xl font-medium border border-blue-200/60">
                                {item}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < visit.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Favorite Items & Insights */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Favorite Items */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Favorite Items</h3>
                </div>
                <div className="space-y-4">
                  {customer.favoriteItems.map((item: string, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200/60 hover:shadow-md transition-all duration-300">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-slate-700 font-medium text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Insights */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/60 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-slate-700 font-medium">Visit Frequency</span>
                    </div>
                    <span className="text-green-600 font-semibold text-lg">High</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/60 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-slate-700 font-medium">Satisfaction</span>
                    </div>
                    <span className="text-yellow-600 font-semibold text-lg">Excellent</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200/60 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <Gift className="w-5 h-5 text-purple-500" />
                      <span className="text-slate-700 font-medium">Loyalty Tier</span>
                    </div>
                    <span className="text-purple-600 font-semibold text-lg">Gold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="group relative overflow-hidden bg-white rounded-3xl p-8 text-center border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Actions</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Activity className="w-5 h-5" />
                  <span>View Full History</span>
                </button>
                <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-200 hover:shadow-lg transition-all duration-300 flex items-center space-x-3 border border-slate-200/60">
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-200 hover:shadow-lg transition-all duration-300 flex items-center space-x-3 border border-slate-200/60">
                  <Gift className="w-5 h-5" />
                  <span>Send Reward</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
