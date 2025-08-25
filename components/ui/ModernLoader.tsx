'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/brand/Logo'

interface ModernLoaderProps {
  isLoading: boolean
  onComplete?: () => void
}

export default function ModernLoader({ isLoading, onComplete }: ModernLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute w-[600px] h-[600px] bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: '20%',
                top: '20%'
              }}
            />
            
            <motion.div
              className="absolute w-[400px] h-[400px] bg-gradient-radial from-accent/8 via-accent/3 to-transparent rounded-full blur-2xl"
              animate={{
                x: [0, -60, 0],
                y: [0, 40, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              style={{
                right: '25%',
                bottom: '25%'
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <Logo variant="light" size="lg" showText={false} />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.p
                className="text-2xl text-muted font-light font-sans mb-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading Bond Studio
              </motion.p>
              <motion.p
                className="text-sm text-muted/60 font-mono"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Crafting your experience...
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 h-px bg-muted/20 mb-8 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent-bright"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    if (onComplete) onComplete()
                  }, 500)
                }}
              />
            </div>

            {/* Loading Dots */}
            <div className="flex space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255, 107, 53, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
