'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/animations/HeroSection'
import AnimatedCard from '@/components/animations/AnimatedCard'
import ParticleBackground from '@/components/animations/ParticleBackground'
import InfiniteMovingCards from '@/components/aceternity/InfiniteMovingCards'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark-900 to-dark-800 overflow-hidden">
        <ParticleBackground variant="minimal" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Built for modern coffee shops and small businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Live QR, Anti-fraud', desc: 'Short-lived, one-time QR tokens with velocity controls and manager override.', icon: '🔒', variant: 'glow' },
              { title: 'Delightful Customer Page', desc: 'Animated progress, friendly check-ins, and rewards glow.', icon: '✨', variant: 'default' },
              { title: 'Insights that matter', desc: 'Visits, redemptions, and conversion at a glance.', icon: '📊', variant: 'float' },
              { title: 'Mobile-first Design', desc: 'Beautiful, responsive experience that works perfectly on any device.', icon: '📱', variant: 'glow' },
              { title: 'Instant Setup', desc: 'Get your loyalty program running in minutes, not hours.', icon: '⚡', variant: 'default' },
              { title: 'Brand Customization', desc: 'Match your colors, upload your logo, make it yours.', icon: '🎨', variant: 'float' }
            ].map((feature, i) => (
              <AnimatedCard key={i} delay={i * 0.1} variant={feature.variant as any}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading text-white mb-3">{feature.title}</h3>
                <p className="text-dark-300 leading-relaxed">{feature.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Moving Cards Section */}
      <section className="relative py-20 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-accent-400/10" />
        <InfiniteMovingCards
          cards={[
            { title: 'Real-time Analytics', desc: 'Track customer behavior and program performance live.', icon: '�' },
            { title: 'Secure Payments', desc: 'Enterprise-grade security for all transactions.', icon: '�' },
            { title: 'Custom Branding', desc: 'Make it yours with custom colors and logos.', icon: '🎨' },
            { title: 'Mobile Optimized', desc: 'Perfect experience on any device.', icon: '�' }
          ]}
          speed="slow"
        />
      </section>

      <Footer />
    </div>
  )
}