'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FlipWords from '@/components/aceternity/FlipWords'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#49c5b6' : '#FF9398',
        opacity: Math.random() * 0.5 + 0.1
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="text-accent-400 text-lg mb-4 tracking-wide font-medium">
            connect • reward • repeat
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold font-heading mb-8 text-white"
        >
          THE CURRENCY OF{' '}
          <span className="bg-gradient-to-r from-primary-600 to-accent-400 bg-clip-text text-transparent">
            <FlipWords words={['BOND', 'LOYALTY', 'TRUST', 'COMMUNITY']} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-dark-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          QR check-ins, rewards, and insights
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-dark-400 text-sm">start your own journey</div>
          
          <div className="w-full max-w-lg">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-dark-900 rounded-2xl p-3 flex items-center gap-3">
                <input
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                />
                <a
                  href="/auth?view=sign_up"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>

          <a
            href="/auth"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border border-dark-600 rounded-full hover:border-primary-600"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-dark-950 duration-300 -translate-x-full bg-gradient-to-r from-primary-600 to-accent-400 group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Sign In
            </span>
            <span className="relative invisible">Sign In</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
