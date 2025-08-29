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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (!textRef.current) return

    // Staggered text animation with GSAP
    const chars = textRef.current.querySelectorAll('.text-reveal-char')
    
    gsap.fromTo(chars, {
      y: 100,
      opacity: 0,
      rotation: 5,
    }, {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.5
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
        className="relative min-h-screen flex items-center justify-center overflow-hidden animated-frame"
      >
        {/* Plasma Background */}
        <div className="absolute inset-0">
          <Plasma 
            color="#ff6b35"
            speed={0.7}
            direction="pingpong"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={true}
          />
        </div>
        
        {/* Liquid Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg">
            {/* Primary liquid orb - follows mouse */}
            <motion.div
              className="absolute w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-accent/10 to-transparent rounded-full blur-3xl"
              animate={{
                x: mousePosition.x - 400,
                y: mousePosition.y - 400,
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary floating orbs */}
            <motion.div
              className="absolute w-[600px] h-[600px] bg-gradient-radial from-accent/15 via-accent/8 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              style={{
                left: '15%',
                top: '25%'
              }}
            />
            
            <motion.div
              className="absolute w-[500px] h-[500px] bg-gradient-radial from-accent/12 via-accent/6 to-transparent rounded-full blur-2xl"
              animate={{
                x: [0, -60, 0],
                y: [0, 30, 0],
                scale: [1, 0.9, 1],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
              style={{
                right: '20%',
                bottom: '20%'
              }}
            />

            {/* Geometric accent elements */}
            <motion.div
              className="absolute w-96 h-96 border border-accent/20 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                left: '5%',
                top: '15%'
              }}
            />
            
            <motion.div
              className="absolute w-80 h-80 border border-accent/15 rounded-full"
              animate={{
                rotate: -360,
                scale: [1, 0.9, 1],
                opacity: [0.05, 0.12, 0.05],
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                right: '10%',
                bottom: '25%'
              }}
            />

           
            
            {/* Floating particles with physics */}
            <div className="absolute inset-0">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent/50 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -150, 0],
                    x: [0, Math.random() * 100 - 50, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
        </div>

        {/* Main Hero Content - Perfectly Spaced */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          {/* Strategic spacing container */}
          <div className="flex flex-col items-center justify-center min-h-screen py-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-10"
            >
              <Logo variant="light" size="lg" showText={false} />
            </motion.div>

            {/* Main Headline */}
            <div ref={textRef} className="mb-14">
              <motion.h1 
                className="text-9xl md:text-9xl lg:text-7xl font-black leading-[0.8] tracking-tight text-white font-display uppercase text-reveal"
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
              className="text-xl md:text-2xl text-muted max-w-3xl mx-auto font-light font-sans mb-10 leading-relaxed"
            >
              BondStudio
            </motion.p>

            {/* CTA Buttons - Perfectly Spaced */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center mb-10"
            >
              <Link
                href="/auth?mode=signup"
                className="btn-primary group relative overflow-hidden order-1 sm:order-1"
              >
                <span className="relative z-10 flex items-center">
                  CREATE BOND
                  <motion.span 
                    className="ml-3 hover-arrow text-2xl"
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
                className="btn-secondary group relative overflow-hidden order-2 sm:order-2"
              >
                <span className="relative z-10 flex items-center">
                  SIGN IN
                  <motion.span 
                    className="ml-3 text-xl"
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
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center text-muted group cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <motion.div 
                  className="w-px h-24 bg-gradient-to-b from-muted to-transparent mb-4 group-hover:from-accent transition-colors duration-300"
                  whileHover={{ height: 28 }}
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
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent rounded-full opacity-80"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent rounded-full opacity-60"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute top-1/2 left-1/6 w-1 h-1 bg-accent rounded-full opacity-40"
        />
      </section>
    </>
  )
}
