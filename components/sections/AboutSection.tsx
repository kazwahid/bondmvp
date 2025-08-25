'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="about" ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-2xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-medium"
            >
              Our Story
            </motion.span>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
              REDEFINING
              <br />
              <span className="text-gray-400">LOYALTY</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We believe that customer loyalty shouldn't be transactional—it should be transformational.
                Every interaction is an opportunity to deepen the relationship between brand and customer.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Our platform combines enterprise-grade security with consumer-grade simplicity,
                creating loyalty experiences that customers love and businesses trust.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12"
            >
              <motion.a
                href="/auth?view=sign_up"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                Start Your Journey
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { value: "99.9%", label: "Platform Uptime", description: "Enterprise reliability" },
              { value: "0+", label: "Active Businesses", description: "Growing community" },
              { value: "SOON", label: "Customer Check-ins", description: "Processed securely" },
              { value: "24/7", label: "Expert Support", description: "Always available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="border border-white/20 rounded-3xl p-12 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide">
              OUR MISSION
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              To make customer loyalty effortless, secure, and genuinely rewarding—
              creating sustainable connections that drive mutual growth and success.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
