'use client'

import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border border-white rounded-full" />
            <div className="absolute top-1/4 right-0 w-24 h-24 border border-white rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-40 h-40 border border-white rounded-full" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                LET'S MAKE SOMETHING
                <br />
                <span className="text-gray-400">UNFORGETTABLE</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your customer relationships? Let's build a loyalty program that your customers will love.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.a
                href="/auth?view=sign_up"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                Start Building Today
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>

              <motion.a
                href="mailto:hello@bond.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-200"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8 text-center"
            >
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:hello@bond.com"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  hello@bond.com
                </a>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Phone
                </h3>
                <a 
                  href="tel:+1234567890"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Response Time
                </h3>
                <span className="text-white">
                  Within 24 hours
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
