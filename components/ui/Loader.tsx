'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/brand/Logo'
import LogoLoader from '@/components/aceternity/LogoLoader'

interface LoaderProps {
  onComplete?: () => void
  minDuration?: number
}

export function Loader({ onComplete, minDuration = 1200 }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animation for reduced motion
      setProgress(100)
      setIsComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 100)
      }
      return
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          if (onComplete) {
            setTimeout(onComplete, 300)
          }
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 80)

    // Ensure minimum duration
    const minTimer = setTimeout(() => {
      if (progress < 100) {
        setProgress(100)
      }
    }, minDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(minTimer)
    }
  }, [onComplete, minDuration])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Thin progress bar on the side */}
          <div className="fixed left-6 top-0 bottom-0 flex items-center">
            <div className="w-px h-64 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="w-full bg-white rounded-full origin-bottom"
              />
            </div>
          </div>

          {/* Centered logomark with mask reveal */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <LogoLoader className="w-20 h-20" />

              {/* Mask reveal overlay */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.3
                }}
                className="absolute inset-0 bg-black origin-right"
                style={{
                  maskImage: 'linear-gradient(to left, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
                }}
              />
            </motion.div>
          </div>

          {/* Subtle loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <p className="text-xs uppercase tracking-widest font-sans text-white/60">
              Loading
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook to show loader only when needed
export function useLoader() {
  const [showLoader, setShowLoader] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    // Show loader only if TTI > 400ms
    const timer = setTimeout(() => {
      if (Date.now() - startTime > 400) {
        setShowLoader(true)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [startTime])

  const hideLoader = () => setShowLoader(false)

  return { showLoader, hideLoader }
}
