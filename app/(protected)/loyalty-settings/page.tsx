'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { BrandIdentity } from '@/components/brand/BrandIdentity'
import { 
  Settings, 
  Target, 
  Coffee, 
  Save, 
  ChevronLeft, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  Upload,
  MessageCircle
} from 'lucide-react'
import { 
  getBusinessByUserId, 
  updateBusiness,
  uploadLogoForUser
} from '@/lib/supabase'

interface Business {
  id: string
  business_name: string
  brand_color: string
  loyalty_visits_required: number
  velocity_minutes?: number | null
  logo_url?: string | null
  customer_instructions?: string | null
}

export default function LoyaltySettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [loyaltyVisits, setLoyaltyVisits] = useState(5)
  const [brandColor, setBrandColor] = useState('#3B82F6')
  const [velocityMinutes, setVelocityMinutes] = useState(5)
  const [isVisible, setIsVisible] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [customerInstructions, setCustomerInstructions] = useState('')
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

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
          router.push('/dashboard')
          return
        }
        console.log('Loaded business data:', businessData)
        console.log('Customer instructions from DB:', businessData.customer_instructions)
        
        setBusiness(businessData)
        setLogoPreview(businessData.logo_url)
        
        setLoyaltyVisits(businessData.loyalty_visits_required)
        setBrandColor(businessData.brand_color)
        setVelocityMinutes(businessData.velocity_minutes || 5)
        setCustomerInstructions(businessData.customer_instructions || '')
        
      } catch (err) {
        console.error('Error fetching business:', err)
        setError('Failed to load business settings')
      } finally {
        setLoading(false)
        // Trigger entrance animations
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchBusiness()
  }, [user, router])

  // Handle logo file selection with preview
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setLogoFile(file)
    
    if (file) {
      // Create a preview URL for the selected file
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!business) return
    
    try {
      setSaving(true)
      setError(null)
      
      console.log('Starting to save business settings...')
      console.log('Business ID:', business.id)
      console.log('Settings to save:', {
        loyalty_visits_required: loyaltyVisits,
        brand_color: brandColor,
        velocity_minutes: velocityMinutes,
        customer_instructions: customerInstructions
      })
      
      // Upload logo first if provided
      let logoUrl = business.logo_url
      if (logoFile && user) {
        try {
          console.log('Uploading logo...')
          const publicUrl = await uploadLogoForUser(logoFile, user.id)
          console.log('Logo uploaded successfully:', publicUrl)
          logoUrl = publicUrl
        } catch (logoError) {
          console.error('Logo upload failed:', logoError)
          // Don't fail the save if logo upload fails
        }
      }
      
      // Update the business settings including the new logo URL
      let updatedBusiness = await updateBusiness(business.id, {
        loyalty_visits_required: loyaltyVisits,
        brand_color: brandColor,
        velocity_minutes: velocityMinutes,
        customer_instructions: customerInstructions,
        logo_url: logoUrl
      })
      
      console.log('Business settings updated successfully:', updatedBusiness)
      
      // Update the business state with all the new data
      setBusiness(updatedBusiness)
      
      // Update the logo preview to show the new logo from database
      setLogoPreview(updatedBusiness.logo_url)
      
      // Clear the logo file input
      setLogoFile(null)
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      
    } catch (err) {
      console.error('Error saving settings:', err)
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        error: err
      })
      setError(`Failed to save settings: ${err instanceof Error ? err.message : 'Unknown error occurred'}`)
    } finally {
      setSaving(false)
    }
  }

  const resetToDefaults = () => {
    setLoyaltyVisits(5)
    setBrandColor('#3B82F6')
    setVelocityMinutes(5)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner 
          size="md"
          text="Loading Settings"
          subtext=""
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Premium Animated Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-3xl border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-3 sm:p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-3xl transition-all duration-300 border border-slate-700/60 hover:border-slate-600/80 group"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <div className="relative group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <BrandIdentity size="sm" variant="light" showTagline={false} />
                </div>
                {/* Animated glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">Loyalty Settings</h1>
                <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-medium">Customize your loyalty program</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center sm:justify-end">
              <button
                onClick={resetToDefaults}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-slate-800/80 text-slate-200 rounded-2xl font-medium hover:bg-slate-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-600/60 hover:border-slate-500/80 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm sm:text-base">Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        {/* Error Messages */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-medium text-lg">{error}</span>
          </div>
        )}

        {/* Business Branding */}
        <section className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Business Branding</h2>
                <p className="text-slate-400 text-base sm:text-lg font-medium">Customize your business appearance</p>
              </div>

              {/* Logo Upload */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Business Logo
                </label>
                <div className="space-y-4">
                  {/* Current Logo Display */}
                  {(logoPreview || business?.logo_url) && (
                    <div className="flex items-center space-x-4">
                      <img 
                        src={logoPreview || business?.logo_url || ''} 
                        alt="Current logo" 
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-600/60"
                      />
                      <span className="text-slate-400 text-sm">
                        {logoFile ? 'New logo preview' : 'Current logo'}
                      </span>
                    </div>
                  )}
                  
                  {/* Logo Upload Input */}
                  <div className="border-2 border-dashed border-slate-600/60 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-colors duration-300">
                                         <input
                       type="file"
                       accept="image/*"
                       onChange={handleLogoFileChange}
                       className="hidden"
                       id="logo-upload"
                     />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg font-medium">
                        {logoFile ? logoFile.name : 'Click to upload new logo'}
                      </p>
                      <p className="text-slate-500 text-sm mt-2">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Brand Color */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Brand Color
                </label>
                <div className="flex items-center space-x-6">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-20 h-16 border-2 border-slate-600/60 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="px-4 py-3 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-lg bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-purple-500/80"
                    placeholder="#3B82F6"
                  />
                </div>
                <p className="text-slate-400 text-base font-medium">
                  This color will be used throughout your loyalty program interface
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Loyalty Settings */}
        <section className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Core Settings</h2>
                <p className="text-slate-400 text-base sm:text-lg font-medium">Configure your loyalty program</p>
              </div>

              {/* Visits Required */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Visits Required for Free Coffee
                </label>
                <div className="flex items-center space-x-6">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={loyaltyVisits}
                    onChange={(e) => setLoyaltyVisits(parseInt(e.target.value) || 1)}
                    className="w-28 px-4 py-3 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-bold text-xl bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-blue-500/80"
                  />
                  <span className="text-slate-300 text-lg font-medium">visits = 1 free coffee</span>
                </div>
                <p className="text-slate-400 text-base font-medium">
                  Set how many visits customers need to earn a free coffee reward
                </p>
              </div>

              {/* Brand Color */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Brand Color
                </label>
                <div className="flex items-center space-x-6">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-20 h-16 border-2 border-slate-600/60 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="px-4 py-3 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-blue-500/80"
                    placeholder="#3B82F6"
                  />
                </div>
                <p className="text-slate-400 text-base font-medium">
                  This color will be used throughout your loyalty program interface
                </p>
              </div>

              {/* Velocity Minutes */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Minimum Time Between Visits (Minutes)
                </label>
                <div className="flex items-center space-x-6">
                  <input
                    type="number"
                    min="1"
                    max="1440"
                    value={velocityMinutes}
                    onChange={(e) => setVelocityMinutes(parseInt(e.target.value) || 1)}
                    className="w-28 px-4 py-3 border border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-bold text-xl bg-slate-800/50 text-white placeholder-slate-400 transition-all duration-300 hover:border-slate-500/80 focus:border-blue-500/80"
                  />
                  <span className="text-slate-300 text-lg font-medium">minutes</span>
                </div>
                <p className="text-slate-400 text-base font-medium">
                  Prevent customers from checking in multiple times within this time period
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Instructions */}
        <section className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Customer Instructions</h2>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Coming Soon
                  </div>
                </div>
                <p className="text-slate-400 text-lg font-medium">Customize what customers see on your check-in page</p>
              </div>

              {/* Custom Instructions */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">
                  Custom Welcome Message
                </label>
                <textarea
                  value="This feature is coming soon! You'll be able to customize your customer welcome messages and create a more personalized experience for your loyal customers."
                  disabled
                  className="w-full px-4 py-4 border border-slate-600/60 rounded-2xl text-white bg-slate-800/30 text-slate-400 resize-none cursor-not-allowed"
                  rows={6}
                />
                <p className="text-slate-400 text-base font-medium">
                  This message will be displayed to customers on your check-in page instead of the default loyalty program card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <section className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl px-12 py-6 border border-transparent shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex items-center space-x-4">
                {saving ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span className="text-xl font-bold">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span className="text-xl font-bold">Save Settings</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </section>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-medium text-lg">Settings saved successfully!</span>
          </div>
        )}
      </main>
    </div>
  )
}
