'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const navigation = [
    { name: 'Work', href: '#work' },
    { name: 'Studio', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const social = [
    { name: 'Instagram', href: 'https://instagram.com/bondstudio' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/bondstudio' },
    { name: 'Twitter', href: 'https://twitter.com/bondstudio' }
  ]

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Imprint', href: '/imprint' }
  ]

  return (
    <footer className="bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto container-padding py-20">
        {/* Contact Section - Inertia Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Ready to discuss<br />
                your next project?
              </h2>
              <p className="text-xl text-muted mb-8 font-light">
                Let's create something unforgettable together.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-sm uppercase tracking-wider text-muted block mb-1">Email</span>
                  <a href="mailto:hello@bondstudio.com" className="text-lg hover:text-muted transition-colors">
                    hello@bondstudio.com
                  </a>
                </div>
                <div>
                  <span className="text-sm uppercase tracking-wider text-muted block mb-1">Location</span>
                  <span className="text-lg">Global • Remote First</span>
                </div>
              </div>

              <Link
                href="/auth"
                className="inline-flex items-center px-8 py-4 bg-fg text-bg font-medium hover:bg-muted transition-all duration-300"
              >
                Start a Project
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Logo */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Logo variant="light" size="lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {/* Navigation */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-fg hover:text-muted transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted mb-6">Social</h3>
            <ul className="space-y-3">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-muted transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted mb-6">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-fg hover:text-muted transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted mb-6">Studio</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Building connections through thoughtful design and technology.
            </p>
            <div className="text-xs uppercase tracking-wider text-muted">
              <div>EST. 2024</div>
              <div>Berlin's Digital Studio</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted mb-8">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span>© {new Date().getFullYear()} Bond Studio</span>
              <span>All rights reserved</span>
            </div>
            <div className="text-xs uppercase tracking-wider">
              Made with precision in Berlin
            </div>
          </div>
        </motion.div>

        {/* Lumus-inspired scrolling ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="overflow-hidden py-4 border-t border-border"
        >
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="text-lg font-bold text-fg/20 mr-16 uppercase tracking-wider"
              >
                CONNECTION STATT KOMPLEXITÄT - BUILD TRUST GROW CONNECTIONS - AUTHENTIC RELATIONSHIPS -
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
