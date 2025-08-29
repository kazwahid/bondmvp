'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Menu, X, BarChart3 } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Studio', href: '#studio' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '#contact' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <motion.header
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: headerBackground
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <Link href="/" className="flex items-center group">
              <Logo variant={isLightBackground ? "dark" : "light"} size="sm" showText={false} />
              <motion.span
                className={`ml-2 sm:ml-3 text-lg sm:text-xl lg:text-2xl font-display uppercase tracking-wider sm:tracking-widest transition-colors duration-500 group-hover:text-accent ${
                  isLightBackground ? 'text-gray-900' : 'text-white'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                BondStudio
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link-minimal transition-colors duration-500 text-sm font-medium ${
                    isLightBackground ? 'text-gray-900 hover:text-accent' : 'text-white hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center">
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

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white hover:text-accent transition-colors duration-200 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mobile-menu absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface border-l border-border shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="text-xl font-display uppercase tracking-wider text-fg">
                    Menu
                  </span>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-muted hover:text-fg transition-colors duration-200"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-2xl font-medium text-fg hover:text-accent transition-colors duration-200 py-3 border-b border-border/20"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent/80 text-bg rounded-2xl font-semibold transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="flex items-center text-lg">
                        Your Business
                        <BarChart3 className="ml-3 w-5 h-5" />
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
