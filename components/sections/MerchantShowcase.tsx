'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, TrendingUp, Users, Award } from 'lucide-react'

export default function MerchantShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const [hoveredMerchant, setHoveredMerchant] = useState<string | null>(null)

  const merchants = [
    {
      id: 'bond-coffee',
      name: 'Bond Coffee',
      industry: 'Independent Coffee',
      growth: '+127%',
      customers: '2.4K',
      rating: 4.9,
      story: 'Increased customer retention by 127% in 6 months',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'local-cafe',
      name: 'Local Café Co.',
      industry: 'Coffee Chain',
      growth: '+89%',
      customers: '5.2K',
      rating: 4.8,
      story: 'Built a loyal community of coffee enthusiasts',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'urban-bistro',
      name: 'Urban Bistro',
      industry: 'Restaurant',
      growth: '+156%',
      customers: '3.8K',
      rating: 4.9,
      story: 'Transformed dining experience with smart rewards',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'wellness-studio',
      name: 'Wellness Studio',
      industry: 'Health & Fitness',
      growth: '+203%',
      customers: '1.9K',
      rating: 5.0,
      story: 'Created a thriving wellness community',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-black/3 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-medium"
          >
            Success Stories
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            MERCHANTS
            <br />
            <span className="text-gray-400">THRIVING</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real businesses achieving extraordinary results with Bond's loyalty platform
          </p>
        </motion.div>

        {/* Merchant Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {merchants.map((merchant, index) => (
            <motion.div
              key={merchant.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredMerchant(merchant.id)}
              onHoverEnd={() => setHoveredMerchant(null)}
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${merchant.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2 tracking-wide">
                      {merchant.name}
                    </h3>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">
                      {merchant.industry}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-black">{merchant.rating}</span>
                  </div>
                </div>

                {/* Story */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {merchant.story}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto group-hover:bg-gray-200 transition-colors duration-300">
                      <TrendingUp className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-lg font-bold text-black">{merchant.growth}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Growth</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto group-hover:bg-gray-200 transition-colors duration-300">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-lg font-bold text-black">{merchant.customers}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Customers</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2 mx-auto group-hover:bg-gray-200 transition-colors duration-300">
                      <Award className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-lg font-bold text-black">{merchant.rating}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Rating</div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredMerchant === merchant.id ? 1 : 0,
                    y: hoveredMerchant === merchant.id ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 pt-6 border-t border-gray-100"
                >
                  <button className="text-black font-medium hover:text-gray-600 transition-colors duration-200 flex items-center">
                    View Case Study
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-8 tracking-wide">
            COLLECTIVE IMPACT
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "0+", label: "Partner Merchants" },
              { value: "SOON", label: "Happy Customers" },
              { value: "134%", label: "Avg. Growth Rate" },
              { value: "4.9", label: "Avg. Rating" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
