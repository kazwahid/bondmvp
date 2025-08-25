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
  Clock,
  MapPin,
  Phone,
  Globe
} from 'lucide-react'

interface Business {
  name: string
  industry: string
  location: string
  phone: string
  website: string
  description: string
  logo?: string
}

export default function CustomerPage() {
  const params = useParams()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkedIn, setCheckedIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    // Simulate fetching business data based on handle
    const fetchBusiness = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from your API
        const mockBusiness: Business = {
          name: "Bond Studio",
          industry: "Creative Agency",
          location: "San Francisco, CA",
          phone: "+1 (555) 123-4567",
          website: "www.bondstudio.com",
          description: "We craft memorable experiences that build lasting connections and inspire loyalty."
        }
        
        setTimeout(() => {
          setBusiness(mockBusiness)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching business:', error)
        setLoading(false)
      }
    }

    fetchBusiness()
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
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-bright rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">B</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{business.name}</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">{business.description}</p>
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
            <p className="text-white/80">Thank you for visiting {business.name}</p>
          </motion.div>
        )}

        {/* Business Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Location</h3>
            </div>
            <p className="text-white/80">{business.location}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Industry</h3>
            </div>
            <p className="text-white/80">{business.industry}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Contact</h3>
            </div>
            <p className="text-white/80">{business.phone}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Website</h3>
            </div>
            <p className="text-white/80">{business.website}</p>
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


