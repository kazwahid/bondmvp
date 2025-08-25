'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function StunningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Floating orbs animation
  useEffect(() => {
    if (!orb1Ref.current || !orb2Ref.current) return

    gsap.to(orb1Ref.current, {
      duration: 8,
      rotation: 360,
      repeat: -1,
      ease: "none"
    })

    gsap.to(orb2Ref.current, {
      duration: 12,
      rotation: -360,
      repeat: -1,
      ease: "none"
    })
  }, [])

  // Interactive text animation
  useEffect(() => {
    if (!textRef.current) return

    gsap.to(textRef.current, {
      duration: 0.3,
      x: (mousePosition.x - 0.5) * 30,
      y: (mousePosition.y - 0.5) * 20,
      rotationY: (mousePosition.x - 0.5) * 10,
      rotationX: (mousePosition.y - 0.5) * -5,
      ease: "power2.out"
    })
  }, [mousePosition])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-surface" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-secondary/5" />
      </div>

      {/* Floating orbs */}
      <div 
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translate(${(mousePosition.x - 0.5) * -50}px, ${(mousePosition.y - 0.5) * -30}px)`
        }}
      />
      
      <div 
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${(mousePosition.x - 0.5) * 40}px, ${(mousePosition.y - 0.5) * 25}px)`
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0 transition-transform duration-500"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse" />
            <span className="text-sm font-medium text-muted uppercase tracking-wider">
              Crafting Digital Connections
            </span>
          </div>
        </motion.div>

        {/* Hero text with 3D effect */}
        <div 
          ref={textRef}
          className="perspective-1000 transform-gpu mb-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight"
          >
            <motion.span 
              className="block bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              BUILD
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-accent via-accent-bright to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              BONDS
            </motion.span>
            <motion.span 
              className="block text-2xl md:text-4xl lg:text-5xl font-light tracking-wider text-muted mt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              THAT TRANSFORM
            </motion.span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted max-w-4xl mx-auto mb-16 leading-relaxed"
        >
          We architect intelligent loyalty experiences that turn casual customers into lifelong advocates through meaningful, human-centered design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-accent to-accent-bright text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/25"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-bright to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
          
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center px-8 py-4 border border-glass-border bg-glass-bg backdrop-blur-sm text-white rounded-full hover:bg-glass-border transition-all duration-300"
          >
            <span>Discover Our Magic</span>
            <motion.span
              className="ml-2"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-muted"
          >
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent mb-3" />
            <span className="text-xs uppercase tracking-wider">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#6366F1' : '#06B6D4',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
