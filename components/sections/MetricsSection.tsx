'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, TrendingUp, Users, Star, Award } from 'lucide-react'

interface Metric {
  id: string
  title: string
  value: number
  suffix: string
  description: string
  icon: React.ReactNode
  details: string[]
}

const metrics: Metric[] = [
  {
    id: 'retention',
    title: 'Customer Retention',
    value: 94,
    suffix: '%',
    description: 'Average customer retention rate across all programs',
    icon: <TrendingUp className="h-6 w-6" />,
    details: [
      'Year-over-year improvement of 17%',
      'Industry benchmark: 67%',
      'Automated re-engagement campaigns'
    ]
  },
  {
    id: 'engagement',
    title: 'User Engagement',
    value: 87,
    suffix: '%',
    description: 'Active user engagement within loyalty programs',
    icon: <Users className="h-6 w-6" />,
    details: [
      'Daily active users increased by 22%',
      'Gamification elements boost participation',
      'Personalized reward recommendations'
    ]
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction',
    value: 4.9,
    suffix: '/5',
    description: 'Average customer satisfaction score',
    icon: <Star className="h-6 w-6" />,
    details: [
      'Continuous feedback integration',
      '48% would recommend to others',
      '24/7 customer support response',
      
    ]
  },
  {
    id: 'growth',
    title: 'Business Growth',
    value: 106,
    suffix: '%',
    description: 'Average revenue growth for clients',
    icon: <Award className="h-6 w-6" />,
    details: [
      'Cross-selling opportunities increased',
      'Customer lifetime value improved',
      'Referral program success rate'
    ]
  }
]

export default function MetricsSection() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: string]: number }>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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

  return (
    <section ref={ref} className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-display uppercase text-fg">
            Expected Numbers
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-sans">
            Predicted results from real businesses on our model
          </p>
        </motion.div>

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
            href="#contact"
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
