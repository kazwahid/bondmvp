'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SideRailsProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export function SideRails({ sections }: SideRailsProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)

      // Determine active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean)

      let currentSection = 0
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            currentSection = index
          }
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      {/* Left Rail */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          {/* Progress line */}
          <div className="relative w-px h-48 bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-from to-accent-to origin-top"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Section markers */}
          <div className="flex flex-col items-center space-y-4">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    index === activeSection
                      ? 'bg-accent border-accent shadow-bond-glow'
                      : 'bg-transparent border-border group-hover:border-accent'
                  }`}
                />
                
                {/* Tooltip */}
                <div className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm font-medium text-fg whitespace-nowrap">
                    {section.label}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Rail - Minimal accent */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent opacity-60" />
          <div className="w-2 h-2 rounded-full bg-accent opacity-80" />
          <div className="w-px h-16 bg-gradient-to-b from-accent via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>
    </>
  )
}

// Hook for keyboard navigation
export function useSideRailsKeyboard(sections: Array<{ id: string }>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        const key = event.key
        const sectionIndex = parseInt(key) - 1
        
        if (sectionIndex >= 0 && sectionIndex < sections.length) {
          event.preventDefault()
          const element = document.getElementById(sections[sectionIndex].id)
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sections])
}
