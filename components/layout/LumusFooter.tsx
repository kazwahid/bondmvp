'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

export function LumusFooter() {
  const [currentTime, setCurrentTime] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  
  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' }
  ]

  const social = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/bondstudio' },
    { name: 'Twitter', href: 'https://twitter.com/bondstudio' },
    { name: 'Instagram', href: 'https://instagram.com/bondstudio' }
  ]

  const legal = [
    { name: 'Terms', href: '/terms' },
    { name: '™', href: '/trademark' }
  ]

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearInterval(timeInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <footer className="bg-bg animated-frame">
      {/* Enhanced Scrolling Ticker */}
      <div className="border-t border-border overflow-hidden bg-surface">
        <div className="scrolling-ticker">
          <div className="scrolling-ticker-content py-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-muted text-sm font-medium tracking-wider mx-12 uppercase font-ui">
                 BUILD CONNECTIONS - THRIVE GROWTH 
              </span>
            
              
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-20">
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display uppercase text-fg">
                Bond<br />
                Studio.
              </h2>
              <p className="text-xl text-muted mb-8 font-light font-sans">
                connectivity over complexity
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-sm uppercase tracking-wider text-muted block mb-1 font-ui">Email</span>
                  <a href="mailto:hello@bondstudio.com" className="text-lg hover:text-accent transition-colors font-sans">
                    hello@bondstudio.com
                  </a>
                </div>
                <div>
                  <span className="text-sm uppercase tracking-wider text-muted block mb-1 font-ui">Phone</span>
                  <a href="tel:+491573614825" className="text-lg hover:text-accent transition-colors font-sans">
                    +49 157 361 482 85
                  </a>
                </div>
              </div>

              <Link
                href="#contact"
                className="btn-accent inline-flex items-center group"
              >
                <span>Schedule Consultation</span>
                <motion.span 
                  className="ml-2 hover-arrow"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            
            
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-4 font-ui">Navigation</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-fg hover:text-accent transition-colors duration-300 font-sans"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-4 font-ui">Social</h4>
            <ul className="space-y-3">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-accent transition-colors duration-300 font-sans"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-4 font-ui">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-fg hover:text-accent transition-colors duration-300 font-sans"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-4 font-ui">Contact</h4>
            <div className="space-y-3">
              <div>
                <a href="mailto:hello@bondstudio.com" className="text-fg hover:text-accent transition-colors font-sans">
                  hello@bondstudio.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar with Live Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="font-sans"> © 2025 BOND STUDIO. PTY LTD</span>
              <span className="hidden md:block text-accent/60">•</span>
              <span className="font-mono text-xs">
                {currentTime}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              {legal.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-accent transition-colors font-sans"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Logo */}
        <div className="flex justify-center lg:justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Logo variant="light" size="lg" showText={false} />
              </motion.div>
            </div>
            </div>
    </footer>
  )
}
