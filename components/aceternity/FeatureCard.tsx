'use client'

import { ReactNode } from 'react'

type CardVariant = 'default' | 'highlight' | 'minimal' | 'glow'

export default function FeatureCard({ 
  children, 
  variant = 'default', 
  className = '',
  icon,
  title,
  description
}: { 
  children?: ReactNode
  variant?: CardVariant
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlight':
        return 'bg-gradient-to-br from-white/80 to-coffee-50/50 border-coffee-300 shadow-[0_8px_30px_rgba(139,115,85,0.12)]'
      case 'minimal':
        return 'bg-white/50 border-coffee-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
      case 'glow':
        return 'bg-white/70 border-coffee-200 shadow-[0_8px_30px_rgba(139,115,85,0.08)] hover:shadow-[0_12px_40px_rgba(139,115,85,0.15)]'
      default:
        return 'bg-white/70 border-coffee-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
    }
  }

  return (
    <div className={`rounded-2xl border backdrop-blur p-6 transition-all duration-300 hover:scale-[1.02] ${getVariantStyles()} ${className}`}>
      {icon && (
        <div className="mb-4 text-coffee-600">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-heading text-coffee-800 mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-coffee-700 text-sm leading-relaxed mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  )
}
