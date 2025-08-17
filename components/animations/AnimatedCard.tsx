'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'default' | 'glow' | 'float'
}

export default function AnimatedCard({ children, className = '', delay = 0, variant = 'default' }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return 'bg-dark-900/50 border-dark-700 hover:border-primary-600 hover:shadow-[0_0_30px_rgba(73,197,182,0.3)]'
      case 'float':
        return 'bg-dark-900/50 border-dark-700 animate-float'
      default:
        return 'bg-dark-900/50 border-dark-700 hover:border-accent-400'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`
        relative rounded-2xl border backdrop-blur-xl p-6 
        transition-all duration-500 ease-out
        ${getVariantStyles()}
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600/5 to-accent-400/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
