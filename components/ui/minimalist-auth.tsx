'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface MinimalistAuthProps {
  initialView?: 'sign_in' | 'sign_up'
}

export default function MinimalistAuth({ initialView = 'sign_in' }: MinimalistAuthProps) {
  const [view, setView] = useState<'sign_in' | 'sign_up'>(initialView)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (view === 'sign_up') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.03), transparent 40%)`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-300 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-200 rounded-full animate-pulse delay-500" />

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div style={{ y }} className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <motion.a
              href="/"
              whileHover={{ x: -2 }}
              className="inline-flex items-center text-gray-400 hover:text-black transition-colors mb-12 text-sm tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </motion.a>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-medium"
            >
              {view === 'sign_up' ? 'Join the Future' : 'Welcome Back'}
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight leading-tight">
              {view === 'sign_up' ? (
                <>
                  CREATE
                  <br />
                  <span className="text-gray-400">ACCOUNT</span>
                </>
              ) : (
                <>
                  SIGN
                  <br />
                  <span className="text-gray-400">IN</span>
                </>
              )}
            </h1>

            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {view === 'sign_up'
                ? 'Start building meaningful customer connections today'
                : 'Access your Bond dashboard and continue building'
              }
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <label className="block text-xs font-medium text-gray-400 mb-3 uppercase tracking-[0.2em]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 text-xl bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-all duration-300 placeholder-gray-300"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label className="block text-xs font-medium text-gray-400 mb-3 uppercase tracking-[0.2em]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-0 py-4 pr-12 text-xl bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-all duration-300 placeholder-gray-300"
                  placeholder="••••••••"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-0 top-4 p-1 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full mt-12 py-5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gray-800"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center tracking-wide">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {view === 'sign_up' ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-4 rounded-2xl text-sm border ${
                  message.includes('Check')
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle View */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setView(view === 'sign_up' ? 'sign_in' : 'sign_up')}
              whileHover={{ y: -1 }}
              className="text-gray-400 hover:text-black transition-colors text-sm tracking-wide"
            >
              {view === 'sign_up'
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Enhanced Visual */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center p-12 relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-white/5 rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md relative z-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12"
          >
            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center relative">
              <span className="text-black font-bold text-xl">b</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-2 border-white/20 rounded-full"
              />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            THE CURRENCY OF
            <br />
            <span className="text-gray-400">CONNECTION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-gray-300 leading-relaxed mb-12"
          >
            Join the future of customer loyalty. Build meaningful relationships that drive sustainable growth.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { value: "0+", label: "Businesses", icon: "🏢" },
              { value: "SOON", label: "Check-ins", icon: "✨" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -2 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
