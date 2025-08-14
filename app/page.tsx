'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      
      // If logged in, redirect to dashboard
      if (user) {
        router.push('/dashboard')
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          router.push('/dashboard')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-800"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo/Brand */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="logo-bond text-6xl mb-6"
          >
            Bond
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-coffee-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Create stunning digital loyalty programs that your customers will love. 
            Beautiful, simple, and built for modern coffee shops.
          </motion.p>

          {/* Hero Visual - Simple geometric shapes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12 relative"
          >
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-coffee-800 rounded-full opacity-10"></div>
              <div className="absolute inset-4 bg-coffee-600 rounded-full opacity-20"></div>
              <div className="absolute inset-8 bg-coffee-800 rounded-full"></div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link href="/auth/login" className="btn-secondary text-lg px-8 py-4">
              Sign In
            </Link>
          </motion.div>

          {/* Features Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="card text-center">
              <div className="w-12 h-12 bg-coffee-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-coffee-100 rounded"></div>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Beautiful Design</h3>
              <p className="text-coffee-600 text-sm">Modern, minimal interface that customers love to use</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-coffee-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-1 bg-coffee-100 rounded"></div>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Simple Setup</h3>
              <p className="text-coffee-600 text-sm">Get your loyalty program running in under 10 minutes</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-coffee-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-coffee-100 rounded-sm"></div>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">QR Code Magic</h3>
              <p className="text-coffee-600 text-sm">Branded QR codes that showcase your coffee shop's identity</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}