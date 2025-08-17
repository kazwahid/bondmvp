'use client'

import { Heart, Coffee, Users, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-dark-950 to-dark-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(73,197,182,0.15),transparent)]" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/brand/bond-logo.svg" className="h-8 w-8 brightness-0 invert" />
              <span className="text-xl font-heading font-bold">Bond</span>
            </div>
            <p className="text-dark-300 mb-6 max-w-md">
              Building meaningful connections between businesses and customers through beautiful loyalty experiences.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-accent-400">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Made with love</span>
              </div>
              <div className="flex items-center gap-2 text-accent-400">
                <Coffee className="h-4 w-4" />
                <span className="text-sm">For coffee shops</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-dark-300">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Live QR Codes</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Anti-fraud Protection</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Real-time Analytics</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Mobile-first Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-dark-300">
              <li><a href="#" className="hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-dark-400 text-sm">
            © 2024 Bond. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-dark-400">
              <Users className="h-4 w-4" />
              <span className="text-sm">Trusted by 1000+ businesses</span>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Enterprise secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
