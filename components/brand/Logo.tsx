import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export function Logo({ variant = 'light', size = 'md', className, showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const primaryColor = variant === 'light' ? '#ffffff' : '#000000'
  const textColor = variant === 'light' ? 'text-white' : 'text-black'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="group cursor-pointer relative"
        whileHover={{ scale: 1.05 }}
      >
        <svg 
          className={cn(sizeClasses[size])} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bond Symbol - Two Elements Becoming One */}
          <motion.path
            d="M8 12 L8 36 L18 36 C22 36 24 33 24 30 C24 28.5 23 27.5 22 27"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M8 18 L18 18 C20 18 22 19 22 21"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M26 21 C28 19 30 18 32 18 L40 18"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M26 27 C28 28.5 30 30 32 30 C36 30 38 33 38 36 L40 36"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.circle
            cx="24"
            cy="24"
            r="2"
            fill={primaryColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 3.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="group-hover:scale-125 transition-transform duration-700"
          />
          <motion.path
            d="M22 21 Q24 22 26 21 M22 27 Q24 26 26 27"
            stroke={primaryColor}
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            opacity="0"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 4, ease: "easeOut" }}
            className="group-hover:opacity-60 transition-opacity duration-1000"
          />
        </svg>
      </motion.div>
      
      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-baseline gap-2"
        >
          <motion.span
            className={cn('font-bold tracking-tight', textSizeClasses[size], textColor)}
            style={{ fontFamily: 'Anton, system-ui, sans-serif' }}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            BOND
          </motion.span>
          <motion.span
            className={cn('font-light tracking-wide opacity-60', textSizeClasses[size], textColor)}
            style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            STUDIO
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}