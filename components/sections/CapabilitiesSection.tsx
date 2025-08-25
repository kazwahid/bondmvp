'use client'

import { motion } from 'framer-motion'
import InfiniteMovingCards from '@/components/aceternity/InfiniteMovingCards'

const services = [
  {
    category: 'Strategy & Research',
    title: 'Customer Journey Mapping',
    description: 'We analyze your customer touchpoints to identify opportunities for meaningful connection and loyalty building.',
    technologies: ['User Research', 'Journey Analysis', 'Behavioral Insights']
  },
  {
    category: 'Design & Experience',
    title: 'Loyalty Platform Design',
    description: 'Beautiful, intuitive interfaces that make customer engagement feel effortless and rewarding.',
    technologies: ['UI/UX Design', 'Interaction Design', 'Design Systems']
  },
  {
    category: 'Development & Integration',
    title: 'Technical Implementation',
    description: 'Robust, scalable loyalty infrastructure that integrates seamlessly with your existing systems.',
    technologies: ['Full-Stack Development', 'API Integration', 'Database Design']
  },
  {
    category: 'Analytics & Optimization',
    title: 'Performance Insights',
    description: 'Deep analytics and reporting to help you understand customer behavior and optimize your loyalty programs.',
    technologies: ['Data Analytics', 'Performance Monitoring', 'A/B Testing']
  }
]

export default function CapabilitiesSection() {
  return (
    <section id="work" className="section-padding bg-bg">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header - Asymmetrical Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32"
        >
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.3em] text-muted mb-8 font-medium font-ui">
              What We Do
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-display uppercase text-fg">
              Our<br />
              <span className="text-muted">Work.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted leading-relaxed mb-8 font-sans"
            >
              We specialize in creating loyalty infrastructure that feels human. From strategy to implementation, we handle every aspect of building meaningful customer relationships.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center px-6 py-3 border-2 border-fg text-fg hover:bg-fg hover:text-bg transition-all duration-300 font-ui uppercase tracking-wider text-sm"
            >
              <span className="mr-2">View Case Studies</span>
              <span>→</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Services Grid - Asymmetrical Layout */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group ${
                index % 2 === 0 ? '' : 'lg:col-start-2'
              }`}
            >
              <div className="border-l-2 border-border pl-8 hover:border-accent transition-colors duration-500">
                <div className="text-xs uppercase tracking-[0.2em] text-muted mb-4 font-medium font-ui">
                  {service.category}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight group-hover:text-accent transition-colors duration-300 font-display uppercase text-fg">
                  {service.title}
                </h3>
                
                <p className="text-lg text-muted leading-relaxed mb-8 font-sans">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-3 py-1 bg-surface border border-border text-muted uppercase tracking-wider font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 font-display uppercase text-fg">
            Ready to start your project?
          </h3>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-fg text-bg font-bold hover:bg-bg hover:text-fg border-2 border-fg transition-all duration-300 font-display uppercase tracking-wider"
          >
            <span>Let's Talk</span>
            <span className="ml-2">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
