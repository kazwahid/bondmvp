'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const principles = [
  {
    number: '01',
    title: 'Creativity That Bonds',
    description: 'We believe creativity is the most powerful and profitable investment any organisation can make.',
    detail: 'We are not just another agency. We build brands that bond with the senses. ',
    color: 'from-accent to-accent-bright'
  },
  {
    number: '02',
    title: 'Strategy Over Service',
    description: 'We don\'t just execute your ideas – we lead with strategy. We prioritize, guide, and deliver what actually drives results.',
    detail: 'You get strategic direction, not just task completion.',
    color: 'from-secondary to-secondary-bright'
  },
  {
    number: '03',
    title: 'Intelligent Solutions',
    description: 'Where uniqueness comes alive." – we architect systems that drive conversions, increase retention, and fuel sustainable growth.',
    detail: 'Every feature serves a strategic purpose in your journey.',
    color: 'from-accent-bright to-secondary'
  },
  {
    number: '04',
    title: 'Radical Honesty',
    description: 'We\'re not here to tell you what you want to hear. If something doesn\'t make sense, we\'ll say it – even when it\'s uncomfortable.',
    detail: 'You get what you need, not what you think you want.',
    color: 'from-secondary to-accent'
  }
]

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    const ctx = gsap.context(() => {
      // Animate principle cards
      gsap.from('.principle-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.principles-grid',
          start: 'top 80%',
          end: 'bottom 20%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isInView])

  return (
    <section id="why-us" ref={sectionRef} className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-3 py-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse" />
            <span className="text-sm font-medium text-muted uppercase tracking-wider">
              Why Choose Bond Studio
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl  mb-8">
          WORK IS BOND <br />
            <span className="bg-gradient-to-r from-accent via-accent-bright to-secondary bg-clip-text">
            
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted max-w-3xl mx-auto leading-relaxed"
          >
          
          </motion.p>
        </motion.div>

        {/* Principles Grid */}
        <div className="principles-grid space-y-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              className="principle-card group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Number with gradient */}
                <div className="lg:col-span-2">
                  <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${principle.color} bg-clip-text opacity-50 group-hover:opacity-60 transition-opacity duration-500`}>
                    {principle.number}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight group-hover:text-accent transition-colors duration-300">
                    {principle.title}
                  </h3>
                  
                  <p className="text-lg text-muted leading-relaxed mb-4">
                    {principle.description}
                  </p>
                  
                  <p className="text-base text-muted/80 leading-relaxed">
                    {principle.detail}
                  </p>
                </div>

                {/* Gradient Visual Element */}
                <div className="lg:col-span-2 flex justify-end">
                  <div className={`w-1 h-24 bg-gradient-to-b ${principle.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-accent-bright text-white font-medium rounded-full hover:scale-105 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
