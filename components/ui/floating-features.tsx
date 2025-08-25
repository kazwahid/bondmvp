'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Zap, BarChart3, Smartphone, Palette, Clock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Anti-Fraud Protection',
    description: 'Short-lived QR tokens with secure authentication and real-time validation',
    color: 'from-teal-400 to-cyan-400'
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Get your loyalty program running in minutes, not hours',
    color: 'from-pink-400 to-rose-400'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track customer behavior and program performance live',
    color: 'from-purple-400 to-indigo-400'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Beautiful, responsive experience on any device',
    color: 'from-emerald-400 to-teal-400'
  },
  {
    icon: Palette,
    title: 'Brand Customization',
    description: 'Match your colors, upload your logo, make it yours',
    color: 'from-orange-400 to-pink-400'
  },
  {
    icon: Clock,
    title: 'Live QR Codes',
    description: 'Dynamic QR codes that update in real-time for security',
    color: 'from-blue-400 to-cyan-400'
  }
]

export default function FloatingFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Built for modern businesses who want to create meaningful connections with their customers
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, (index % 2 === 0 ? -50 : 50)]
            )

            return (
              <motion.div
                key={feature.title}
                style={{ y }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="group"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card */}
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center text-teal-400 font-medium"
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <motion.a
            href="/auth?view=sign_up"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(73, 197, 182, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-400 to-pink-400 text-black font-semibold text-lg rounded-full hover:shadow-2xl transition-all duration-300"
          >
            Start Building Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
