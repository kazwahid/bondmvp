'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, BarChart3, Smartphone, Palette, Clock } from 'lucide-react'

export default function FeaturedCards() {
  const projects = [
    {
      title: 'ANTI-FRAUD QR SYSTEM',
      description: 'Dynamic QR codes with secure authentication and real-time visit tracking for seamless customer check-ins',
      icon: Shield,
      category: 'Security'
    },
    {
      title: 'REAL-TIME ANALYTICS',
      description: 'Live dashboard with customer behavior tracking, conversion metrics, and performance insights',
      icon: BarChart3,
      category: 'Analytics'
    },
    {
      title: 'INSTANT SETUP',
      description: 'Zero-configuration loyalty program deployment with automated onboarding workflows',
      icon: Zap,
      category: 'Automation'
    },
    {
      title: 'MOBILE-FIRST DESIGN',
      description: 'Responsive customer experience optimized for mobile devices with progressive web app features',
      icon: Smartphone,
      category: 'Design'
    },
    {
      title: 'BRAND CUSTOMIZATION',
      description: 'White-label solution with custom colors, logos, and branded customer touchpoints',
      icon: Palette,
      category: 'Branding'
    },
    {
      title: 'LIVE QR TOKENS',
      description: 'Short-lived, one-time QR codes that refresh automatically for enhanced security',
      icon: Clock,
      category: 'Technology'
    }
  ]

  return (
    <section id="capabilities" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            CAPABILITIES
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive loyalty solutions designed for modern businesses
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
                {/* Category */}
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                  {project.category}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <project.icon className="w-6 h-6 text-gray-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-4 tracking-wide leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-6 flex items-center text-black font-medium"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
