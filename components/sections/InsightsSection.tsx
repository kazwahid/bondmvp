'use client'

import { motion } from 'framer-motion'

export default function InsightsSection() {
  const insights = [
    {
      title: 'The Future of Customer Loyalty in 2024',
      date: 'December 15, 2024',
      category: 'Trends',
      description: 'How AI and personalization are reshaping customer loyalty programs across industries.',
      readTime: '5 min read'
    },
    {
      title: 'QR Code Security: Best Practices',
      date: 'December 10, 2024',
      category: 'Security',
      description: 'Essential security measures for QR-based loyalty systems and fraud prevention strategies.',
      readTime: '7 min read'
    },
    {
      title: 'Mobile-First Loyalty Design Principles',
      date: 'December 5, 2024',
      category: 'Design',
      description: 'Creating seamless mobile experiences that drive customer engagement and retention.',
      readTime: '6 min read'
    },
    {
      title: 'Data Analytics for Small Businesses',
      date: 'November 28, 2024',
      category: 'Analytics',
      description: 'Leveraging customer data to make informed business decisions and improve loyalty programs.',
      readTime: '8 min read'
    },
    {
      title: 'The Psychology of Customer Rewards',
      date: 'November 20, 2024',
      category: 'Psychology',
      description: 'Understanding what motivates customers and how to design effective reward systems.',
      readTime: '4 min read'
    },
    {
      title: 'Building Trust in Digital Loyalty',
      date: 'November 15, 2024',
      category: 'Trust',
      description: 'How transparency and security build lasting customer relationships in digital platforms.',
      readTime: '6 min read'
    }
  ]

  return (
    <section id="insights" className="py-24 bg-white">
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
            INSIGHTS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts on loyalty, technology, and building better customer relationships
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
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
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 h-full transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-lg">
                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    {insight.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {insight.readTime}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-4 leading-tight group-hover:text-gray-700 transition-colors duration-200">
                  {insight.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {insight.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">
                    {insight.date}
                  </time>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center text-black font-medium"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/insights"
            whileHover={{ y: -2 }}
            className="inline-flex items-center px-8 py-4 border border-gray-300 text-black font-medium rounded-full hover:border-black transition-colors duration-200"
          >
            View All Insights
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
