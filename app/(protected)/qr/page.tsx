'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getBusinessByUserId, mintQrToken } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { BrandIdentity } from '@/components/brand/BrandIdentity'
import QRCode from 'qrcode'
import { 
  QrCode, 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  Settings, 
  Eye, 
  EyeOff, 
  Copy, 
  CheckCircle,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  Zap,
  Target,
  Shield,
  Star,
  Coffee,
  Gift,
  TrendingUp
} from 'lucide-react'

export default function QRPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [business, setBusiness] = useState<{
    id: string
    business_name: string
    brand_color: string
    loyalty_visits_required: number
    logo_url?: string | null
  } | null>(null)
  const [qrCode, setQrCode] = useState<string>('')
  const [qrToken, setQrToken] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showToken, setShowToken] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [pulseAnimation, setPulseAnimation] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    const fetchBusiness = async () => {
      try {
        setLoading(true)
        const businessData = await getBusinessByUserId(user.id)
        if (!businessData) {
          setError('No business found. Please set up your business first.')
          return
        }
        setBusiness(businessData)
        await generateQRCode(businessData.id)
      } catch (err) {
        setError('Failed to load business data')
        console.error(err)
      } finally {
        setLoading(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchBusiness()
  }, [user, router])

  const generateQRCode = async (businessId: string) => {
    try {
      setGenerating(true)
      setError(null)
      
      // Generate a new QR token
      const token = await mintQrToken(businessId)
      setQrToken(token)
      
      // Create the check-in URL
      const checkInUrl = `${window.location.origin}/checkin?token=${token}&business=${businessId}`
      
      // Generate QR code
      const qrDataUrl = await QRCode.toDataURL(checkInUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      })
      
      setQrCode(qrDataUrl)
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 1000)
    } catch (err) {
      setError('Failed to generate QR code')
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.download = `qr-code-${business?.business_name || 'business'}.png`
    link.href = qrCode
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner 
          size="md"
          text="Loading QR Generator"
          
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <QrCode className="w-12 h-12 text-red-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">QR Generation Failed</h3>
            <p className="text-slate-400 text-lg font-medium">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Premium Animated Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-3xl border-b border-slate-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-3xl transition-all duration-300 border border-slate-700/60 hover:border-slate-600/80 group hover:scale-105 transform"
              >
                <ArrowLeft className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <BrandIdentity size="sm" variant="light" showTagline={false} />
                </div>
                {/* Enhanced animated glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">QR Code Generator</h1>
                <p className="text-slate-400 text-xl font-medium">Create customer check-in links</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/loyalty-settings')}
                className="px-6 py-3 bg-slate-800/80 text-slate-200 rounded-2xl font-semibold hover:bg-slate-700 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced QR Code Display - Premium Animated Card */}
          <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Enhanced animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Customer Check-in QR Code</h2>
                <p className="text-slate-400 text-lg font-medium">Scan this code to check in customers</p>
              </div>
              
              {/* Enhanced QR Code Display */}
              {generating ? (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-56 h-56 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl animate-pulse flex items-center justify-center shadow-inner">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                    </div>
                    {/* Enhanced animated rings */}
                    <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-3xl animate-ping"></div>
                    <div className="absolute -inset-8 border-2 border-indigo-500/10 rounded-3xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -inset-12 border-2 border-purple-500/5 rounded-3xl animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <p className="text-slate-400 text-lg font-medium">Generating QR Code...</p>
                </div>
              ) : qrCode ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className={`relative group/qr transform transition-all duration-500 ${pulseAnimation ? 'scale-110' : 'scale-100'}`}>
                      <img 
                        src={qrCode} 
                        alt="QR Code" 
                        className="w-56 h-56 rounded-3xl shadow-2xl border-4 border-slate-700/50 group-hover/qr:border-blue-500/50 transition-all duration-500"
                      />
                      {/* Enhanced glow effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-0 group-hover/qr:opacity-20 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => downloadQRCode()}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                    >
                      <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Download QR Code</span>
                    </button>
                    
                    <button
                      onClick={() => business && generateQRCode(business.id)}
                      className="w-full px-8 py-4 bg-slate-700/80 text-slate-200 rounded-2xl font-semibold hover:bg-slate-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-600/60 hover:border-slate-500/80 group hover:scale-105 transform"
                    >
                      <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Generate New</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 space-y-4">
                  <QrCode className="w-20 h-20 mx-auto text-slate-600" />
                  <p className="text-lg font-medium">No QR Code Generated</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Business Info & Instructions - Premium Animated Cards */}
          <div className="space-y-8">
            {/* Business Overview */}
            <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Business Overview</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <span className="text-slate-400 font-medium">Business Name</span>
                    <span className="text-white font-semibold">{business?.business_name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                    <span className="text-slate-400 font-medium">Loyalty Program</span>
                    <span className="text-white font-semibold">{business?.loyalty_visits_required || 5} visits = Free Coffee</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-400 font-medium">Brand Color</span>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-slate-600 shadow-md group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: business?.brand_color || '#3B82F6' }}
                      ></div>
                      <span className="text-white font-semibold font-mono">{business?.brand_color || '#3B82F6'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced QR Token Info */}
            <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">QR Token</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-medium text-sm">Token:</span>
                    <div className="flex-1 bg-slate-700/50 px-4 py-3 rounded-xl font-mono text-sm border border-slate-600/60 text-white">
                      {showToken ? (qrToken || 'No token generated') : (qrToken ? '••••••••••••••••' : 'No token generated')}
                    </div>
                    <button
                      onClick={() => setShowToken(!showToken)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group hover:scale-110 transform"
                    >
                      {showToken ? <EyeOff className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> : <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />}
                    </button>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(qrToken)}
                    disabled={!qrToken}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    <span>{copied ? 'Copied!' : 'Copy Token'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">How to Use</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { step: 1, text: 'Display this QR code at your coffee shop entrance or counter' },
                    { step: 2, text: 'Customers scan the code with their phone camera' },
                    { step: 3, text: 'They\'re automatically checked in and progress is tracked' }
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-start space-x-4 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-black-500 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">{item.step}</span>
                      </div>
                      <p className="text-slate-300 text-base font-medium leading-relaxed group-hover/item:text-white transition-colors duration-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Device Compatibility */}
            <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from red-500 to-white-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Device Compatibility</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { icon: Smartphone, label: 'Mobile', color: 'from-red-500 to-white-500' },
                    { icon: Tablet, label: 'Tablet', color: 'from-purple-500 to-pink-500' },
                    { icon: Monitor, label: 'Desktop', color: 'from-green-500 to-emerald-500' }
                  ].map((device, index) => (
                    <div key={device.label} className="text-center space-y-3 group/device">
                      <div className={`w-12 h-12 bg-gradient-to-br ${device.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover/device:scale-110 transition-transform duration-300`}>
                        <device.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-slate-300 font-medium group-hover/device:text-white transition-colors duration-300">{device.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}