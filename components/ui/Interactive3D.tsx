'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Interactive3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export default function Interactive3D({ children, className = '', intensity = 0.5 }: Interactive3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15 * intensity, -15 * intensity]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15 * intensity, 15 * intensity]))
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      const x = (e.clientX - rect.left) / width - 0.5
      const y = (e.clientY - rect.top) / height - 0.5
      
      mouseX.set(x)
      mouseY.set(y)
    }
    
    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
      setIsHovered(false)
    }
    
    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
      element.addEventListener('mouseenter', () => setIsHovered(true))
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
        element.removeEventListener('mouseenter', () => setIsHovered(true))
      }
    }
  }, [mouseX, mouseY])
  
  return (
    <motion.div
      ref={ref}
      className={`transform-gpu ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Interactive Connection Orb Component
export function ConnectionOrb({ className = '' }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const orbRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        const rect = orbRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = (e.clientX - centerX) * 0.1
        const deltaY = (e.clientY - centerY) * 0.1
        
        setMousePosition({ x: deltaX, y: deltaY })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <motion.div
      ref={orbRef}
      className={`relative ${className}`}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {/* Main orb */}
      <motion.div
        className="w-32 h-32 rounded-full bg-gradient-to-br from-fg/20 to-fg/5 border border-fg/10 backdrop-blur-sm"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      
      {/* Inner core */}
      <motion.div
        className="absolute inset-4 rounded-full bg-fg/10 border border-fg/20"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      
      {/* Center dot */}
      <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/40" />
      
      {/* Connection lines */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-16 bg-gradient-to-t from-fg/20 to-transparent"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) translateY(-100%) rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
