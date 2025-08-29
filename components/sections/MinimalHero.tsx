'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import Plasma from '@/components/ui/Plasma'

export default function MinimalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!textRef.current) return

    // Staggered text animation with GSAP
    const chars = textRef.current.querySelectorAll('.text-reveal-char')
    
    gsap.fromTo(chars, {
      y: isMobile ? 50 : 100,
      opacity: 0,
      rotation: isMobile ? 2 : 5,
    }, {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: isMobile ? 0.8 : 1.2,
      stagger: isMobile ? 0.03 : 0.05,
      ease: "power3.out",
      delay: 0.5
    })
  }, [isMobile])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.addEventListener('touchmove', handleTouchMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isMobile])

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="text-reveal-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden animated-frame px-4 sm:px-6 lg:px-8"
      >
        {/* Plasma Background - Performance optimized for mobile */}
        <div className="absolute inset-0">
          <Plasma 
            color="#ff6b35"
            speed={isMobile ? 0.5 : 0.7}
            direction="pingpong"
            scale={isMobile ? 1.0 : 1.1}
            opacity={isMobile ? 0.6 : 0.8}
            mouseInteractive={!isMobile}
          />
        </div>
        
        {/* Liquid Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg">
            {/* Primary liquid orb - follows mouse/touch */}
            <motion.div
              className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-radial from-accent/20 via-accent/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
              animate={{
                x: mousePosition.x - (isMobile ? 200 : 400),
                y: mousePosition.y - (isMobile ? 200 : 400),
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: isMobile ? 4 : 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary floating orbs */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-gradient-radial from-accent/15 to-transparent rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-lg"
              animate={{
                y: [0, 15, 0],
                opacity: [0.08, 0.15, 0.08],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Main Hero Content - Perfectly Spaced */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          {/* Strategic spacing container */}
          <div className="flex flex-col items-center justify-center min-h-screen py-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8 sm:mb-10 lg:mb-10"
            >
              <Logo variant="light" size="lg" showText={false} />
            </motion.div>

            {/* Main Headline */}
            <div ref={textRef} className="mb-10 sm:mb-12 lg:mb-14">
              <motion.h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tight text-white font-display uppercase text-reveal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                  Crafting Memorable
                <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-orange">
                  Experiences
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto font-light font-sans mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0"
            >
              BondStudio
            </motion.p>

            {/* CTA Buttons - Perfectly Spaced */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center mb-10 px-4 sm:px-0"
            >
              <Link
                href="/auth?mode=signup"
                className="btn-primary group relative overflow-hidden order-1 sm:order-1 w-full sm:w-auto touch-friendly"
              >
                <span className="relative z-10 flex items-center justify-center">
                  CREATE BOND
                  <motion.span 
                    className="ml-3 hover-arrow text-xl sm:text-2xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </span>
                
                {/* Enhanced hover effect background */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </Link>

              <Link
                href="/auth?mode=signin"
                className="btn-secondary group relative overflow-hidden order-2 sm:order-2 w-full sm:w-auto touch-friendly"
              >
                <span className="relative z-10 flex items-center justify-center">
                  SIGN IN
                  <motion.span 
                    className="ml-3 text-lg sm:text-xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            {/* Enhanced Scroll Indicator - Better positioned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center text-muted group cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <motion.div 
                  className="w-px h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-muted to-transparent mb-4 group-hover:from-accent transition-colors duration-300"
                  whileHover={{ height: isMobile ? 20 : 28 }}
                />
                <motion.span 
                  className="text-sm uppercase tracking-wider font-ui group-hover:text-accent transition-colors duration-300"
                  whileHover={{ letterSpacing: '0.3em' }}
                >
                  Scroll
                </motion.span>
                <motion.div
                  className="w-1.5 h-1.5 bg-accent rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Strategic accent elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/4 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full opacity-80"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full opacity-60"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute top-1/2 left-1/6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full opacity-40"
        />
      </section>
    </>
  )
}
