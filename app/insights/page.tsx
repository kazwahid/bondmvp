'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, Tooltip } from 'recharts'
import { Header } from '@/components/layout/Header'
import { LumusFooter } from '@/components/layout/LumusFooter'
import Link from 'next/link'
import Orb from '@/components/ui/Orb'
import ModernPageLoader from '@/components/ui/ModernPageLoader'
import LogoLoop from '@/components/ui/LogoLoop'
import MagnetLines from '@/components/ui/MagnetLines'
import FlyingPosters from '@/components/ui/FlyingPosters'

import { 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  Zap, 
  Target, 
  ArrowRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  DollarSign,
  Coffee,
  Clock,
  Star,
  ArrowUpRight,
  ChevronRight,
  Play,
  ExternalLink,
  Lightbulb,
  Target as TargetIcon,
  Rocket,
  CheckCircle,
  Building2,
  Globe,
  Shield,
  Zap as ZapIcon,
  Heart
} from 'lucide-react'

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    // Simulate loading time for insights page
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])



  // Enhanced analytics data
  const visitData = [
    { month: 'Jan', visits: 1200, growth: 12 },
    { month: 'Feb', visits: 1900, growth: 58 },
    { month: 'Mar', visits: 2400, growth: 26 },
    { month: 'Apr', visits: 2100, growth: -13 },
    { month: 'May', visits: 2800, growth: 33 },
    { month: 'Jun', visits: 3200, growth: 14 }
  ]

  const loyaltyData = [
    { name: 'Active Members', value: 68, color: '#FF6B35' },
    { name: 'Pending Activation', value: 22, color: '#FF8A65' },
    { name: 'Churned Users', value: 10, color: '#FFAB91' }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 45000, customers: 1200 },
    { month: 'Feb', revenue: 52000, customers: 1900 },
    { month: 'Mar', revenue: 48000, customers: 2400 },
    { month: 'Apr', revenue: 61000, customers: 2100 },
    { month: 'May', revenue: 55000, customers: 2800 },
    { month: 'Jun', revenue: 67000, customers: 3200 }
  ]

  const customerSegments = [
    { segment: 'New Customers', value: 45, color: '#FF6B35' },
    { segment: 'Returning', value: 32, color: '#FF8A65' },
    { segment: 'Loyal Members', value: 23, color: '#FFAB91' }
  ]

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Smart Targeting',
      description: 'AI-powered customer segmentation for personalized campaigns'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Growth Automation',
      description: 'Automated loyalty programs that scale with your business'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Insight Engine',
      description: 'Real-time analytics that reveal hidden opportunities'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Proven Results',
      description: 'Trusted by 500+ coffee shops across the country'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg">
        <ModernPageLoader 
          isLoading={isLoading} 
          onComplete={() => setIsLoading(false)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
   



      {/* Data Driven Insights Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-bg to-orange-50/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            
            >
            
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fg mb-4 sm:mb-6 tracking-tight">
              DATA-DRIVEN INSIGHTS
            </h2>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
             Predicted numbers from our model
            </p>
          </motion.div>

          {/* Enhanced Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Customer Visits with Growth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-surface/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-orange-300 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-fg uppercase tracking-wide flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  <span>Customer Visits</span>
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-fg">+34%</div>
                  <div className="text-sm text-muted">vs last period</div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitData}>
                    <defs>
                      <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F5E9DA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F5E9DA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#A7B0B2' }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#232323', 
                        border: '1px solid #2E2E2E',
                        borderRadius: '12px',
                        color: '#EAF9FB'
                      }}
                    />
                    <Area 
                      type="monotone"
                      dataKey="visits" 
                      stroke="#FF6B35" 
                      strokeWidth={3}
                      fill="url(#visitsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Customer Loyalty Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-surface/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-accent/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-fg uppercase tracking-wide flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-orange-500" />
                  <span>Customer Loyalty</span>
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-fg">68%</div>
                  <div className="text-sm text-muted">Active Members</div>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loyaltyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {loyaltyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#232323', 
                        border: '1px solid #2E2E2E',
                        borderRadius: '12px',
                        color: '#EAF9FB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Revenue vs Customers Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
                          className="bg-surface/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-orange-300 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-fg uppercase tracking-wide flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                <span>Revenue vs Customer Growth</span>
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-fg">$67K</div>
                <div className="text-sm text-muted">June Revenue</div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5E9DA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F5E9DA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#A7B0B2' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#A7B0B2' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#A7B0B2' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#232323', 
                      border: '1px solid #2E2E2E',
                      borderRadius: '12px',
                      color: '#EAF9FB'
                    }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue" 
                    stroke="#FF6B35" 
                    strokeWidth={3}
                                          dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers" 
                    stroke="#A7B0B2" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#A7B0B2', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

         
             {/* Magnetic Interaction Section  */}
       <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-bg to-orange-50/5 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              
            >
              
            </motion.div>
                         <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fg mb-4 sm:mb-6 tracking-tight">
               <span className="text-accent-500">MAGNETIC</span> INTERACTION
             </h2>
             <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
             Build Connections - Thrive Together
             </p>
          </motion.div>

                     {/* MagnetLines */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - MagnetLines */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <MagnetLines
                  rows={9}
                  columns={9}
                  containerSize="80vmin"
                  lineColor="#F5E9DA"
                  lineWidth="1.2vmin"
                  lineHeight="6vmin"
                  baseAngle={0}
                  style={{ margin: "2rem auto" }}
                />
                
             
              </div>
            </motion.div>

            {/* Right Side - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-fg mb-2">Business</h3>
                    <p className="text-muted leading-relaxed">
                      Track customer behavior, sales, and business growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-fg mb-2">Trust</h3>
                    <p className="text-muted leading-relaxed">
                      Build lasting relationships with automated loyalty programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-fg mb-2">Grow</h3>
                    <p className="text-muted leading-relaxed">
                      Focus on what matters most - growing your business.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
                <Link 
                  href="/#contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-surface/50 hover:bg-surface/70 text-orange-500 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-border flex items-center justify-center space-x-2 group text-sm sm:text-base touch-friendly"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

             {/* Asymmetrical Partner Showcase & CTA Section */}
       <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-surface to-orange-50/5 relative overflow-hidden">
         {/* Subtle background pattern */}
         <div className="absolute inset-0 opacity-5">
           <div className="absolute inset-0" style={{
             backgroundImage: `radial-gradient(circle at 25% 25%, #FF6B35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #FF6B35 2px, transparent 2px)`,
             backgroundSize: '60px 60px'
           }} />
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-left"
            >
                             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-fg tracking-tight">
                 Work is <span className="text-accent-500">Bond</span>
               </h2>
            
              <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/auth?mode=signup"
                className="btn-primary group relative overflow-hidden order-1 sm:order-1"
              >
                <span className="relative z-10 flex ">
                  Start Your Project
                  <motion.span 
                    className="ml-3 hover-arrow text-2xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Flying Posters Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="h-[600px] w-full relative">
                <FlyingPosters 
                  items={[
                    '/images/coffee-shop-1.png',
                    '/images/coffee-shop-4.png',
                    
                    '/images/6.png',
                    '/images/9.png',
                    '/images/8.png'

                    
                  ]}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 {/* Logo Loop Section - Minimal Modern */}
 <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-surface to-orange-50/10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Logo Loop - No heading, just the loop */}
           <div className="py-8 sm:py-12 lg:py-16">
            <LogoLoop
              logos={[   
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg", alt: "Twitter", title: "Twitter", href: "https://twitter.com" },       
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB", title: "MongoDB", href: "https://mongodb.com" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", title: "Next.js", href: "https://nextjs.org" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", alt: "Slack", title: "Slack", href: "https://slack.com" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub", title: "GitHub", href: "https://github.com" },
              
                
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", title: "Node.js", href: "https://nodejs.org" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", alt: "LinkedIn", title: "LinkedIn", href: "https://linkedin.com" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg", alt: "WordPress", title: "WordPress", href: "https://wordpress.org" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase", title: "Firebase", href: "https://firebase.google.com" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma", title: "Figma", href: "https://figma.com" },
      
              
              
          
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", alt: "Android", title: "Android", href: "https://android.com" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg", alt: "Apple", title: "Apple", href: "https://apple.com" },
   
       
               
                
              ]}
                             speed={120}
               direction="left"
               logoHeight={48}
               gap={24}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#232323"
              ariaLabel="Technology tools"
            />
          </div>
        </div>
      </section>

    
      <LumusFooter />
    </div>
  )
}
