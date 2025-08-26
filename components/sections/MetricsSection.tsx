'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, TrendingUp, Users, Award, Sparkles, Zap, Target, ArrowRight } from 'lucide-react'

interface Metric {
  id: string
  title: string
  value: number
  suffix: string
  description: string
  icon: React.ReactNode
  details: string[]
  color: string
  gradient: string
}

const metrics: Metric[] = [
  {
    id: 'retention',
    title: 'Customer Retention',
    value: 94,
    suffix: '%',
    description: 'Average customer retention rate across all programs',
    icon: <TrendingUp className="h-8 w-8" />,
    details: [
      'Year-over-year improvement of 17%',
      'Industry benchmark: 67%',
      'Automated re-engagement campaigns'
    ],
    color: 'from-emerald-400 to-teal-500',
    gradient: 'bg-gradient-to-br from-emerald-400/20 to-teal-500/20'
  },
  {
    id: 'engagement',
    title: 'User Engagement',
    value: 87,
    suffix: '%',
    description: 'Active user engagement within loyalty programs',
    icon: <Users className="h-8 w-8" />,
    details: [
      'Daily active users increased by 22%',
      'Gamification elements boost participation',
      'Personalized reward recommendations'
    ],
    color: 'from-blue-400 to-indigo-500',
    gradient: 'bg-gradient-to-br from-blue-400/20 to-indigo-500/20'
  },
  {
    id: 'growth',
    title: 'Business Growth',
    value: 106,
    suffix: '%',
    description: 'Average revenue growth for clients',
    icon: <Award className="h-8 w-8" />,
    details: [
      'Cross-selling opportunities increased',
      'Customer lifetime value improved',
      'Referral program success rate'
    ],
    color: 'from-purple-400 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-400/20 to-pink-500/20'
  }
]

export default function MetricsSection() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: string]: number }>({})
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig)

  useEffect(() => {
    if (isInView) {
      // Animate numbers when section comes into view
      metrics.forEach((metric) => {
        const startValue = 0
        const endValue = metric.value
        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const currentValue = startValue + (endValue - startValue) * easeOutQuart

          setAnimatedNumbers(prev => ({
            ...prev,
            [metric.id]: currentValue
          }))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        animate()
      })
    }
  }, [isInView])

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      ref={ref} 
      className="section-padding bg-gradient-to-br from-bg via-surface/50 to-bg relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 border border-accent/10 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 border border-accent/8 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
            opacity: [0.03, 0.12, 0.03],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-gradient-radial from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: '10%',
            top: '20%'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header with Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent/20 to-orange-400/20 px-6 py-3 rounded-full border border-accent/30 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
           
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Choose Us?</span>
            <Zap className="h-5 w-5 text-orange-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-display uppercase text-fg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Expected Numbers
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted max-w-3xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Predicted results from real businesses using our proven model
          </motion.p>
        </motion.div>

        {/* Modern Interactive Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="card interactive-card group"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-accent">
                  {metric.icon}
                </div>
                                 <div className="text-right">
                   <motion.div 
                     className="animated-number"
                     whileHover={{ scale: 1.1 }}
                     transition={{ duration: 0.3 }}
                   >
                     {animatedNumbers[metric.id] ? 
                       (metric.id === 'satisfaction' ? 
                         animatedNumbers[metric.id].toFixed(1) : 
                         Math.round(animatedNumbers[metric.id])
                       ) : 
                       '0'
                     }
                     <span className="text-accent/80">{metric.suffix}</span>
                   </motion.div>
                 </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-display uppercase text-fg">
                {metric.title}
              </h3>
              
              <p className="text-muted mb-4 font-sans">
                {metric.description}
              </p>

              {/* Enhanced Accordion Trigger */}
              <motion.button
                onClick={() => toggleAccordion(metric.id)}
                className="accordion-trigger w-full text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent uppercase tracking-wider font-ui group-hover:text-accent-bright transition-colors">
                    View Details
                  </span>
                  <motion.div
                    animate={{ rotate: openAccordion === metric.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-full group-hover:bg-accent/10 transition-colors"
                  >
                    <ChevronDown className="h-4 w-4 text-accent" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Accordion Content */}
              <div className={`accordion-content ${openAccordion === metric.id ? 'open' : ''}`}>
                <div className="pt-4 space-y-3">
                  {metric.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: openAccordion === metric.id ? 1 : 0,
                        x: openAccordion === metric.id ? 0 : -20
                      }}
                      transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-muted font-sans">{detail}</p>
                    </motion.div>
                  ))}
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 font-display uppercase text-fg">
            Ready to see these results?
          </h3>
          <motion.a
            href="/auth?mode=signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-accent inline-flex items-center"
          >
            <span>Start Your Project</span>
            <motion.span 
              className="ml-2 hover-arrow"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
