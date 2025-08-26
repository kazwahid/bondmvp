'use client'

import { motion } from 'framer-motion'
import { Logo } from './Logo'

interface BrandIdentityProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  showTagline?: boolean
  className?: string
}

export function BrandIdentity({ 
  size = 'lg', 
  variant = 'light', 
  showTagline = true,
  className = '' 
}: BrandIdentityProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }

  const taglineSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <div className={`relative ${className}`}>
      {/* Central Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20"
      >
        <Logo variant={variant} size={'lg'} showText={false} />
      </motion.div>

      {/* Radial Tagline Circle */}
      {showTagline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border border-accent/20 flex items-center justify-center`}
        >
          {/* Rotating tagline text */}
          <div className="relative w-full h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <path
                    id={`tagline-path-${size}`}
                    d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  />
                </defs>
                <text className={`font-display uppercase tracking-wider ${taglineSize[size]} fill-current`}>
                  <textPath
                    href={`#tagline-path-${size}`}
                    startOffset="0%"
                    className="text-accent"
                  >
                    • Crafting Memorable Experiences •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Floating accent elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent/80 rounded-full shadow-lg shadow-accent/20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-accent/60 rounded-full shadow-lg shadow-accent/15"
      />
    </div>
  )
}
