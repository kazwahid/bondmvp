'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Menu, BarChart3 } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  
  const { scrollYProgress } = useScroll()
  
  // Dynamic header properties based on scroll and background
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 20])
  const headerBackground = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']
  )

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)

      // Check if we're over a light background section
      const sections = document.querySelectorAll('section')
      let lightSection = false

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          const computedStyle = window.getComputedStyle(section)
          const backgroundColor = computedStyle.backgroundColor
          // Check if background is light
          if (backgroundColor.includes('255') || backgroundColor.includes('light') || backgroundColor.includes('EFECEC')) {
            lightSection = true
          }
        }
      })

      setIsLightBackground(lightSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Studio', href: '#studio' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <motion.header
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
        backgroundColor: headerBackground
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center group">
            <Logo variant={isLightBackground ? "dark" : "light"} size="sm" showText={false} />
            <motion.span
              className={`ml-3 text-2xl font-display uppercase tracking-widest transition-colors duration-500 group-hover:text-accent ${
                isLightBackground ? 'text-gray-900' : 'text-white'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link-minimal transition-colors duration-500 ${
                  isLightBackground ? 'text-gray-900 hover:text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href="/dashboard"
                className={`btn-contact-minimal group relative transition-colors duration-500 ${
                  isLightBackground ? 'text-gray-900' : 'text-white'
                }`}
              >
                <span className="relative z-10 flex items-center text-sm font-medium tracking-wider">
                  Your Business
                  <BarChart3 className="ml-2 w-4 h-4" />
                  <motion.div 
                    className="ml-2 w-1 h-1 bg-accent rounded-full" 
                    initial={{ scale: 0 }} 
                    whileHover={{ scale: 1.5 }} 
                    transition={{ duration: 0.3 }} 
                  />
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </Link>
            </motion.div>
          </div>

          <button className="md:hidden p-2 text-white hover:text-accent transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
