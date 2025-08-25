'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

export default function DataSection() {
  const visitData = [
    { month: 'Jan', visits: 1200 },
    { month: 'Feb', visits: 1900 },
    { month: 'Mar', visits: 2400 },
    { month: 'Apr', visits: 2100 },
    { month: 'May', visits: 2800 },
    { month: 'Jun', visits: 3200 }
  ]

  const loyaltyData = [
    { name: 'Active', value: 68, color: '#000000' },
    { name: 'Pending', value: 22, color: '#666666' },
    { name: 'Churned', value: 10, color: '#CCCCCC' }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            DATA-DRIVEN INSIGHTS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Make informed decisions with comprehensive analytics and real-time reporting
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Visits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wide">
              Customer Visits
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="visits" 
                    fill="#000000" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-black">+34%</div>
              <div className="text-sm text-gray-500">vs last period</div>
            </div>
          </motion.div>

          {/* Loyalty Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wide">
              Customer Loyalty
            </h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loyaltyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {loyaltyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {loyaltyData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-black">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Revenue Growth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wide">
              Revenue Impact
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#000000" 
                    strokeWidth={3}
                    dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-black">$67K</div>
              <div className="text-sm text-gray-500">this month</div>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Avg. Visit Frequency", value: "2.4x", change: "+12%" },
            { label: "Customer Retention", value: "89%", change: "+5%" },
            { label: "Revenue per Customer", value: "$127", change: "+18%" },
            { label: "Program ROI", value: "340%", change: "+23%" }
          ].map((metric, index) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl font-bold text-black mb-2">{metric.value}</div>
              <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
              <div className="text-xs text-orange-600 font-medium">{metric.change}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
