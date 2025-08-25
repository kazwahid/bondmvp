'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ClientsSection() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

  const clients = [
    { id: 'bond-coffee', name: 'Bond Coffee', industry: 'Independent Coffee' },
    { id: 'local-cafe', name: 'Local Café Co.', industry: 'Coffee Chain' },
    { id: 'restaurant-group', name: 'Restaurant Group', industry: 'Hospitality' },
    { id: 'retail-brand', name: 'Retail Brand', industry: 'Fashion' },
    { id: 'fitness-studio', name: 'Fitness Studio', industry: 'Health & Wellness' },
    { id: 'beauty-salon', name: 'Beauty Salon', industry: 'Personal Care' },
    { id: 'bookstore', name: 'Independent Bookstore', industry: 'Retail' },
    { id: 'food-truck', name: 'Food Truck Network', industry: 'Mobile Food' }
  ]

  return (
    <section className="py-24 bg-gray-50">
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
            TRUSTED BY
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Businesses of all sizes trust Bond to power their customer loyalty programs
          </p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onHoverStart={() => setHoveredClient(client.id)}
              onHoverEnd={() => setHoveredClient(null)}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-32 flex items-center justify-center transition-all duration-300 hover:border-gray-300 hover:shadow-lg relative overflow-hidden">
                {/* Placeholder Logo */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <div className="w-8 h-8 bg-gray-300 rounded" />
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredClient === client.id ? 1 : 0,
                    y: hoveredClient === client.id ? 0 : 20
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-white p-4"
                >
                  <h3 className="font-bold text-sm mb-1 text-center">
                    {client.name}
                  </h3>
                  <p className="text-xs text-gray-300 text-center">
                    {client.industry}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-black mb-2">0+</div>
            <div className="text-sm uppercase tracking-wider text-gray-500">Active Businesses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">SOON</div>
            <div className="text-sm uppercase tracking-wider text-gray-500">Customer Check-ins</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">99.9%</div>
            <div className="text-sm uppercase tracking-wider text-gray-500">Platform Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">24/7</div>
            <div className="text-sm uppercase tracking-wider text-gray-500">Customer Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
