'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    
    message: '',
   
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Simulate form submission
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Contact Header - Asymmetrical Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32"
        >
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.3em] text-muted mb-8 font-medium font-ui">
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-display uppercase text-fg">
              Let's<br />
              <span className="text-muted">Talk.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted leading-relaxed mb-8"
            >
              Ready to build something extraordinary? Tell us about your project and let's explore how we can help you create meaningful customer connections.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm uppercase tracking-wider text-muted block mb-1">Email</span>
                <a href="mailto:hello@bondstudio.com" className="text-lg hover:text-fg transition-colors">
                  hello@bondstudio.com
                </a>
              </div>
              <div>
                <span className="text-sm uppercase tracking-wider text-muted block mb-1">Response Time</span>
                <span className="text-lg">Within 24 hours</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-muted mb-3 uppercase tracking-wider font-ui">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-border focus:border-accent transition-colors duration-300 text-fg placeholder-muted/50 text-lg focus:outline-none font-sans"
                    placeholder="Your full name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-muted mb-3 uppercase tracking-wider font-ui">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-border focus:border-accent transition-colors duration-300 text-fg placeholder-muted/50 text-lg focus:outline-none font-sans"
                    placeholder="hello@yourbusiness.com"
                  />
                </motion.div>

                {/* Company Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group"
                >
                 
                </motion.div>

                {/* Budget Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group"
                >
                  
                   
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group"
              >
                <label className="block text-sm font-medium text-muted mb-3 uppercase tracking-wider">
                  Project Details
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:border-fg transition-colors duration-300 text-fg placeholder-muted/50 text-lg focus:outline-none resize-none"
                  placeholder="Tell us about your project, goals, and how we can help..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-8"
              >
                                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-12 py-4 bg-fg text-bg font-bold hover:bg-bg hover:text-fg border-2 border-fg transition-all duration-300 flex items-center space-x-3 font-display uppercase tracking-wider"
                        >
                          <span>Send Message</span>
                          <Send className="h-5 w-5" />
                        </motion.button>
              </motion.div>
            </form>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-8 bg-surface border border-border rounded-full flex items-center justify-center"
              >
                <CheckCircle className="h-10 w-10 text-fg" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4">
                Message received
              </h3>
              
              <p className="text-xl text-muted mb-8 max-w-lg mx-auto">
                Thank you for reaching out. We'll review your project details and get back to you within 24 hours.
              </p>
              
              <motion.button
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border text-fg hover:bg-surface transition-all duration-300"
              >
                Send another message
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}


