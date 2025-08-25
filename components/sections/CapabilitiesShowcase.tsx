'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const capabilities = [
  {
    title: 'Loyalty Infrastructure',
    description: 'Complete end-to-end loyalty systems that scale with your business and integrate seamlessly with existing tools.',
    features: ['Real-time Recognition', 'Multi-channel Support', 'Advanced Analytics', 'Custom Rewards Engine'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'Customer Experience Design',
    description: 'Intuitive interfaces and experiences that make customer engagement feel effortless and rewarding.',
    features: ['UI/UX Design', 'Customer Journey Mapping', 'Interaction Design', 'Usability Testing'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'Data Analytics & Insights',
    description: 'Deep customer behavior analysis and actionable insights that drive strategic decision-making.',
    features: ['Behavioral Analytics', 'Predictive Modeling', 'Performance Tracking', 'ROI Measurement'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
]

const showcases = [
  {
    title: 'E-commerce Loyalty Platform',
    client: 'Retail Chain',
    description: 'Complete loyalty ecosystem with mobile app, web dashboard, and in-store integration.',
    metrics: '+150% Customer Retention',
    video: '/videos/showcase-1.mp4'
  },
  {
    title: 'Restaurant Rewards System',
    client: 'Restaurant Group',
    description: 'QR-based loyalty program with automated rewards and customer insights.',
    metrics: '+200% Repeat Visits',
    video: '/videos/showcase-2.mp4'
  }
]

export default function CapabilitiesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (!isInView) return

    const ctx = gsap.context(() => {
      // Animate capability cards
      gsap.from('.capability-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top 80%',
        }
      })

      // Animate showcase items
      gsap.from('.showcase-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.showcases-grid',
          start: 'top 80%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isInView])

  return (
    <section id="capabilities" ref={sectionRef} className="section-padding bg-bg">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-secondary mr-3 animate-pulse" />
            <span className="text-sm font-medium text-muted uppercase tracking-wider">
              Our Services
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            WHAT WE<br />
            <span className="bg-gradient-to-r from-secondary via-secondary-bright to-accent bg-clip-text text-transparent">
              DELIVER
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted max-w-3xl mx-auto leading-relaxed"
          >
            We design and develop loyalty systems that don't just look good – they strategically drive conversions. Fast, intuitive, and measurably effective.
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="capability-card group p-8 bg-glass-bg border border-glass-border backdrop-blur-sm hover:border-accent transition-all duration-500 hover:bg-glass-border rounded-2xl"
            >
              {/* Icon with gradient */}
              <div className="mb-8 text-muted group-hover:text-accent transition-colors duration-300">
                {capability.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed mb-6">
                {capability.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {capability.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-muted/80 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-accent to-secondary rounded-full mr-3 opacity-60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to scale your customer relationships?
          </h3>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary to-secondary-bright text-white font-medium rounded-full hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
          >
            Start Your Project
            <span className="ml-2">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
