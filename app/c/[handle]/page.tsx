'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

import { 
  CheckCircle, 
  Star, 
  Heart, 
  MessageCircle, 
  Share2,
  ArrowRight,
  Target,
  Coffee
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

interface Business {
  id: string
  business_name: string
  brand_color: string
  loyalty_visits_required: number
  logo_url?: string | null
  customer_instructions?: string | null
}

export default function CustomerPage() {
  const params = useParams()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkedIn, setCheckedIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    // Fetch real business data from the database
    const fetchBusiness = async () => {
      try {
        setLoading(true)
        
        // Get the business handle from the URL
        const handle = params.handle as string
        
        console.log('Fetching business with handle:', handle)
        
        // For now, we'll use a simple approach - you might want to add a handle column to businesses table
        // This is a temporary solution - in production you'd want a proper handle system
        
        // Try to fetch by ID first (if handle is a UUID)
        let { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', handle)
          .single()
        
        // If that fails, try to find by business name (temporary solution)
        if (error && !handle.includes('-')) {
          console.log('Trying to find by business name...')
          const { data: nameData, error: nameError } = await supabase
            .from('businesses')
            .select('*')
            .ilike('business_name', `%${handle}%`)
            .single()
          
          if (!nameError) {
            data = nameData
            error = null
            console.log('Found business by name:', data)
          }
        }
        
        // If still no data, try to get the first business (for testing purposes)
        if (error || !data) {
          console.log('Trying to get first business from database...')
          const { data: firstBusiness, error: firstError } = await supabase
            .from('businesses')
            .select('*')
            .limit(1)
            .single()
          
          if (!firstError && firstBusiness) {
            data = firstBusiness
            error = null
            console.log('Found first business:', data)
          }
        }
        
        if (error || !data) {
          console.error('Error fetching business:', error)
          // Fallback to mock data if database fetch fails
          const mockBusiness: Business = {
            id: "mock-id",
            business_name: "Bond Studio Coffee",
            brand_color: "#3B82F6",
            loyalty_visits_required: 5,
            logo_url: null,
            customer_instructions: "Welcome to Bond Studio Coffee! 🎉\n\nCheck in to earn points towards your next free coffee. We appreciate your loyalty and can't wait to serve you!\n\n• Earn 1 point per visit\n• Get a free coffee after 5 visits\n• Points never expire"
          }
          setBusiness(mockBusiness)
        } else {
          console.log('Fetched business data:', data)
          setBusiness(data as Business)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching business:', error)
        setLoading(false)
      }
    }

    if (params.handle) {
      fetchBusiness()
    }
  }, [params.handle])

  const handleCheckIn = () => {
    setCheckedIn(true)
    // In a real app, this would send data to your backend
  }

  const handleRating = (value: number) => {
    setRating(value)
  }

  const handleSubmitFeedback = () => {
    // In a real app, this would send feedback to your backend
    console.log('Feedback submitted:', { rating, feedback })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 text-lg">Loading business information...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Business Not Found</h2>
          <p className="text-white/60 mb-6">The business you're looking for doesn't exist or the link is invalid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {business.logo_url ? (
            <img 
              src={business.logo_url} 
              alt={`${business.business_name} logo`}
              className="w-20 h-20 rounded-2xl mx-auto mb-6 object-cover border-2 border-white/20"
            />
          ) : (
            <div 
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-bold text-3xl"
              style={{ backgroundColor: business.brand_color }}
            >
              {business.business_name.charAt(0)}
            </div>
          )}
          <h1 className="text-4xl font-bold text-white mb-4">{business.business_name}</h1>
          {business.customer_instructions ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-left">
                <h3 className="text-lg font-semibold text-white mb-3">Welcome Message</h3>
                <div className="text-white/80 whitespace-pre-line leading-relaxed">
                  {business.customer_instructions}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Welcome! Check in to earn loyalty points.
            </p>
          )}
        </motion.div>

        {/* Check-in Section */}
        {!checkedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome!</h2>
              <p className="text-white/60">Check in to let us know you've arrived</p>
            </div>
            
            <button
              onClick={handleCheckIn}
              className="w-full bg-gradient-to-r from-accent to-accent-bright text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-accent/90 hover:to-accent-bright/90 transition-all duration-200 transform hover:scale-105"
            >
              Check In Now
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 mb-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Successfully Checked In!</h2>
            <p className="text-white/80">Thank you for visiting {business.business_name}</p>
          </motion.div>
        )}

        {/* Loyalty Program Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Loyalty Program</h3>
            <p className="text-white/60">Earn points with every visit</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">Goal</h4>
              <p className="text-white/80">{business.loyalty_visits_required} visits</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">Reward</h4>
              <p className="text-white/80">Free coffee</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">Status</h4>
              <p className="text-white/80">Ready to check in</p>
            </div>
          </div>
        </motion.div>

        {/* Rating & Feedback */}
        {checkedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">How was your experience?</h2>
              <p className="text-white/60">Rate your visit and share your thoughts</p>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    star <= rating 
                      ? 'text-yellow-400 bg-yellow-400/20' 
                      : 'text-white/40 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`}
                >
                  <Star className={`w-8 h-8 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>

            {/* Feedback Input */}
            <div className="mb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with us..."
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={handleSubmitFeedback}
              className="w-full bg-gradient-to-r from-accent to-accent-bright text-white py-3 px-6 rounded-xl font-semibold hover:from-accent/90 hover:to-accent-bright/90 transition-all duration-200 transform hover:scale-105"
            >
              Submit Feedback
            </button>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-all duration-200">
            <Heart className="w-5 h-5" />
            <span>Save to Favorites</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-all duration-200">
            <MessageCircle className="w-5 h-5" />
            <span>Contact Business</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-all duration-200">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}





