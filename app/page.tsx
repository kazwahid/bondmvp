'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import MinimalHero from '@/components/sections/MinimalHero'
import { WhyWeExist } from '@/components/sections/WhySections'
import DataSection from '@/components/sections/DataSection'
import ContactSection from '@/components/sections/ContactSection'
import { LumusFooter } from '@/components/layout/LumusFooter'
import Metrics from '@/components/sections/Metrics'
import ModernPageLoader from '@/components/ui/ModernPageLoader'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import { BarChart3, ArrowRight } from 'lucide-react'
import LightRays from '@/components/ui/LightRays'

import Threads from '@/components/ui/Threads'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ModernPageLoader 
            key="loader" 
            isLoading={isLoading} 
            onComplete={() => setIsLoading(false)}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <MinimalHero />
            
            <section id="about" className="section-padding bg-surface px-4 sm:px-6 lg:px-8">
              <WhyWeExist />
            </section>
            
            <section id="studio" className="section-padding bg-bg relative overflow-hidden px-4 sm:px-6 lg:px-8">
              {/* Threads Background - Performance optimized for mobile */}
              <div className="absolute inset-0">
                <Threads
                  amplitude={1.5}
                  distance={0}
                  enableMouseInteraction={true}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fg tracking-tight leading-tight">
                    STUDIO FEATURES
                  </h2>
                  <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                    Discover what makes BondStudio the ultimate 
                     partner for your business
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
                    <Link 
                      href="/insights"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent/80 text-bg rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group text-sm sm:text-base touch-friendly"
                    >
                      <span>View Studio Metrics</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link 
                      href="/auth?mode=signup"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-surface/50 hover:bg-surface/70 text-fg rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-border flex items-center justify-center space-x-2 text-sm sm:text-base touch-friendly"
                    >
                      <span>Create Bond</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
            
            {/* Mobile Insights Section - Show Full Content on Mobile */}
            <section id="insights-mobile" className="section-padding bg-surface px-4 sm:px-6 lg:px-8 md:hidden">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-6"
                >
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-fg">
                    Mobile Insights
                  </h3>
                  <p className="text-base sm:text-lg text-muted max-w-lg mx-auto">
                    Access your business metrics on the go with our mobile-optimized dashboard
                  </p>
                  <Link 
                    href="/insights"
                    className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent/80 text-bg rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm touch-friendly"
                  >
                    View Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </section>
            
            <section id="contact" className="section-padding bg-bg px-4 sm:px-6 lg:px-8">
              <ContactSection />
            </section>
            
            <LumusFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScrollProvider>
  )
}