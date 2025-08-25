'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import MinimalHero from '@/components/sections/MinimalHero'
import { WhyWeExist } from '@/components/sections/WhySections'
import DataSection from '@/components/sections/DataSection'
import MetricsSection from '@/components/sections/MetricsSection'
import ContactSection from '@/components/sections/ContactSection'
import { LumusFooter } from '@/components/layout/LumusFooter'
import Metrics from '@/components/sections/Metrics'
import ModernPageLoader from '@/components/ui/ModernPageLoader'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'

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
            
            <section id="about" className="section-padding bg-surface">
              <WhyWeExist />
            </section>
            
            <section id="studio" className="section-padding bg-bg">
              <MetricsSection />
            </section>
            
            <section id="insights" className="section-padding bg-surface">
              <DataSection />
            </section>
            
            <section id="contact" className="section-padding bg-bg">
              <ContactSection />
            </section>
            
            <LumusFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScrollProvider>
  )
}