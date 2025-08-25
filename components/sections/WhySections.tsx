'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, Users, TrendingUp, Heart, ArrowRight, Info } from 'lucide-react'

export function WhyWeExist() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const principles = [
    {
      number: '01',
      title: 'Connection First',
      description: 'We believe in building authentic relationships between businesses and their customers through meaningful interactions.',
      detail: 'Every touchpoint should feel personal and valuable, not transactional.',
      secret: 'Our secret sauce? We treat every customer interaction as if it\'s the first and last. This mindset creates genuine connections that last.'
    },
    {
      number: '02',
      title: 'Radical Honesty',
      description: 'We\'re not here to tell you what you want to hear. If something doesn\'t make sense, we\'ll say it – even when it\'s uncomfortable.',
      detail: 'You get what you need, not what you think you want.',
      secret: 'We believe that honest feedback is the foundation of great work. No sugar-coating, just real solutions.'
    },
    {
      number: '03',
      title: 'Customer-Centric',
      description: 'We put the customers at the heart of our design process, ensuring intuitive and delightful experiences.',
      detail: 'We conduct real user research with your actual customers, not generic personas.',
      secret: 'Every design decision is validated with real user feedback. We don\'t guess, we test.'
    },
    {
      number: '04',
      title: 'Intelligent Solutions',
      description: 'Where uniqueness comes alive." – we architect systems that drive conversions, increase retention, and fuel sustainable growth.',
      detail: 'Every feature serves a strategic purpose in your journey.',
      secret: 'We build systems that learn and adapt. Your success is our algorithm.'
    }
  ]

  return (
    <section id="about" className="section-padding bg-bg">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Studio Introduction - Asymmetrical Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32"
        >
          {/* Left Column - Title */}
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.3em] text-muted mb-8 font-medium font-ui">
              About the Studio
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-display uppercase text-fg">
              We build<br />
              <span className="text-muted">connections.</span>
            </h2>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted leading-relaxed font-sans"
              >
                BondStudio© is a digital marketing and development studio focused on building brands that bond with the senses. We care about people and work with people that works.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-muted leading-relaxed font-sans"
              >
                We believe creativity is the most powerful and profitable investment any organisation can make.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-8"
              >
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="card-brutalist interactive-card">
                    <div className="text-3xl font-bold mb-2 font-display">2025</div>
                    <div className="text-sm uppercase tracking-wider text-bg/80 font-ui">Founded</div>
                  </div>
                  <div className="card interactive-card">
                    <div className="text-3xl font-bold mb-2 font-display">Global</div>
                    <div className="text-sm uppercase tracking-wider text-muted font-ui">Remote First</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-32"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
              }`}
            >
              {/* Content - Alternates left/right */}
              <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-6'}`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-accent font-display">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight font-display uppercase text-fg">
                    {principle.title}
                  </h3>

                  <p className="text-lg text-muted leading-relaxed font-sans">
                    {principle.description}
                  </p>

                  <p className="text-base text-accent/80 font-sans">
                    {principle.detail}
                  </p>
                </div>
              </div>

              {/* Interactive Secret Card - Alternates left/right */}
              <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:col-start-8' : 'lg:col-start-1'}`}>
                <motion.div
                  className="card interactive-card cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveCard(activeCard === principle.number ? null : principle.number)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-accent/5"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm uppercase tracking-wider text-accent font-ui flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Secret Insight
                      </span>
                      <motion.div
                        animate={{ rotate: activeCard === principle.number ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="h-4 w-4 text-accent" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: activeCard === principle.number ? 'auto' : 0,
                        opacity: activeCard === principle.number ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted font-sans italic">
                        {principle.secret}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function WhyWereDifferent() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const features = [
    {
      id: 'innovation',
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Radical Honesty',
      description: 'We\'re not here to tell you what you want to hear. If something doesn\'t make sense, we\'ll say it – even when it\'s uncomfortable.',
      secret: 'You get what you need, not what you think you want.'
    },
    {
      id: 'collaboration',
      icon: <Users className="h-8 w-8" />,
      title: 'Customer-Centric',
      description: 'We put the customers at the heart of our design process, ensuring intuitive and delightful experiences.',
      secret: 'We conduct real user research with your actual customers, not generic personas.'
    },
    {
      id: 'growth',
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Intelligent Solutions',
      description: 'Where uniqueness comes alive." – we architect systems that drive conversions, increase retention, and fuel sustainable growth.',
      secret: 'Every feature serves a strategic purpose in your journey.'
    }
  ]

  return (
    <section id="work" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header - Asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20"
        >
          {/* Left Column - Title */}
          <div className="lg:col-span-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-display uppercase text-fg">
              Why We're<br />
              <span className="text-accent">Different</span>
            </h2>
            <p className="text-xl text-muted leading-relaxed font-sans max-w-3xl">
              We don't just build solutions – we create experiences that transform how people interact with your brand.
            </p>
          </div>

          {/* Right Column - Accent Element */}
          <div className="lg:col-span-4 lg:col-start-9 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-32 h-32 border-2 border-accent/30 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-accent/60 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`lg:col-span-6 ${
                index === 0 ? 'lg:col-start-1' :
                index === 1 ? 'lg:col-start-7' :
                'lg:col-start-4'
              }`}
            >
              <motion.div
                className="card interactive-card cursor-pointer relative overflow-hidden group"
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-display uppercase text-fg">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-muted mb-6 font-sans leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Secret reveal on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFeature === feature.id ? 'auto' : 0,
                      opacity: activeFeature === feature.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-accent/20">
                      <p className="text-sm text-accent/80 font-sans italic">
                        {feature.secret}
                      </p>
                    </div>
                  </motion.div>

                  {/* Hover indicator */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs uppercase tracking-wider text-accent/60 font-ui">
                      Click to reveal
                    </span>
                    <motion.div
                      animate={{ rotate: activeFeature === feature.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
