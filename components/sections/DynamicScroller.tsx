'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function DynamicScroller() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const features = [
    "Anti-fraud QR System",
    "Real-time Analytics", 
    "Mobile-first Design",
    "Brand Customization",
    "Instant Setup",
    "Live Support",
    "Enterprise Security",
    "API Integration"
  ]

  return (
    <section ref={containerRef} className="py-20 bg-sand-300 overflow-hidden">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-charcoal-800 tracking-tight mb-4"
        >
          WORK IS BOND
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-charcoal-600 text-lg"
        >
          You are in the right place
        </motion.p>
      </div>

      {/* Scrolling Features */}
      
      {/* Second Row - Opposite Direction */}
      <motion.div
        style={{ x: `${-x}%` }}
        className="flex space-x-8 py-8"
      >
        {[...features.reverse(), ...features].map((feature, index) => (
          <motion.div
            key={`${feature}-reverse-${index}`}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 px-8 py-6 bg-charcoal-800 text-clarity-50 rounded-2xl hover:bg-charcoal-700 transition-all duration-300"
          >
            <span className="text-lg font-medium whitespace-nowrap tracking-wide">
              {feature}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
