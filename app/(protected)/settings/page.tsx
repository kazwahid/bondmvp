'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getBusinessByUserId, updateBusiness, uploadLogoForUser } from '@/lib/supabase'
import { Settings, Palette, Upload, ArrowLeft, LogOut, Save, Check, Building2, Target } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [brandColor, setBrandColor] = useState('#3B82F6')
  const [visits, setVisits] = useState(10)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState('business')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (!user) return
        const business = await getBusinessByUserId(user.id)
        if (business) {
          setBusinessName(business.business_name)
          setBrandColor(business.brand_color || '#3B82F6')
          setVisits(business.loyalty_visits_required)
          setLogoUrl(business.logo_url)
        }
      } catch (e) {
        setError('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [user])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    try {
      await updateBusiness(user.id, {
        business_name: businessName,
        brand_color: brandColor,
        loyalty_visits_required: visits,
      })
      
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return
    
    try {
      const file = e.target.files[0]
      const url = await uploadLogoForUser(file, user.id)
      setLogoUrl(url)
    } catch (e) {
      setError('Failed to upload logo')
    }
  }

  const navigationItems = [
    { id: 'business', label: 'Business', icon: Building2, description: 'Basic business information' },
    { id: 'branding', label: 'Branding', icon: Palette, description: 'Visual identity and colors' },
    { id: 'loyalty', label: 'Loyalty Program', icon: Target, description: 'Customer rewards settings' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto shadow-lg"></div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Loading Settings</h3>
            <p className="text-slate-600 text-lg font-medium">Preparing your configuration...</p>
      </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-200/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-3xl transition-all duration-300 border border-slate-200/60 hover:border-slate-300/80"
              >
                <ArrowLeft className="w-7 h-7" />
              </button>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-600 text-lg font-medium">Configure your business preferences</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-white/90 text-slate-700 rounded-2xl font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-slate-200/60 shadow-md hover:shadow-lg"
              >
                <span>Dashboard</span>
              </button>
              
            <button
              onClick={handleSignOut}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-red-200/60"
            >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h3>
                <nav className="space-y-3">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'text-slate-500'}`} />
                          <div className="text-left">
                            <div className="font-semibold text-sm">{item.label}</div>
                            <div className="text-xs opacity-80">{item.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Right Column - Settings Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Page Header */}
            <section className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <Settings className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-4xl font-serif font-light text-gray-900">
                Business Settings
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Customize your business profile, branding, and loyalty program settings 
                to create the perfect experience for your customers.
              </p>
            </section>

            {/* Business Information Section */}
            {activeSection === 'business' && (
              <section>
                <div className="group relative overflow-hidden bg-white rounded-3xl p-10 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Business Information</h3>
                    </div>
                    
                    <div className="space-y-8">
              <div>
                        <label htmlFor="businessName" className="block text-lg font-semibold text-slate-700 mb-3">
                  Business Name
                </label>
                <input
                          id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium transition-all duration-300 hover:bg-slate-100"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                        <label htmlFor="logo" className="block text-lg font-semibold text-slate-700 mb-3">
                  Business Logo
                </label>
                        <div className="flex items-center space-x-6">
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="Business logo"
                              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-lg"
                    />
                  )}
                          <label className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 cursor-pointer flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                            <Upload className="w-5 h-5" />
                            <span>{logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                    <input
                              id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Branding Section */}
            {activeSection === 'branding' && (
              <section>
                <div className="group relative overflow-hidden bg-white rounded-3xl p-10 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Branding</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <label htmlFor="brandColor" className="block text-lg font-semibold text-slate-700 mb-3">
                        Brand Color
                      </label>
                      <div className="flex items-center space-x-6">
                        <input
                          id="brandColor"
                          type="color"
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          className="w-20 h-16 rounded-2xl border-2 border-slate-200 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                        />
                        <div className="space-y-2">
                          <span className="text-slate-900 font-mono text-lg font-semibold">{brandColor}</span>
                          <p className="text-slate-600 text-base">
                            This color will be used for your QR codes and brand elements.
                          </p>
                        </div>
                      </div>
                </div>
              </div>
            </div>
              </section>
            )}

            {/* Loyalty Program Section */}
            {activeSection === 'loyalty' && (
              <section>
                <div className="group relative overflow-hidden bg-white rounded-3xl p-10 border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Loyalty Program</h3>
                    </div>
            
            <div className="space-y-6">
                      <label htmlFor="visits" className="block text-lg font-semibold text-slate-700 mb-3">
                  Visits Required for Reward
                </label>
                      <div className="space-y-4">
                <input
                          id="visits"
                  type="number"
                  min="1"
                  max="100"
                  value={visits}
                          onChange={(e) => setVisits(parseInt(e.target.value))}
                          className="w-40 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium text-lg transition-all duration-300 hover:bg-slate-100"
                />
                        <p className="text-slate-600 text-base">
                          Set how many visits customers need before earning a reward.
                </p>
              </div>
            </div>
              </div>
            </div>
              </section>
            )}

            {/* Save Button - Always Visible */}
            <section>
              <div className="group relative overflow-hidden bg-white rounded-3xl p-8 text-center border border-slate-100/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
            <button
              onClick={handleSave}
              disabled={saving}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {saving ? (
                <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-3"></div>
                        <span>Saving...</span>
                </>
              ) : saved ? (
                <>
                        <Check className="w-5 h-5 inline-block mr-3" />
                        <span>Saved!</span>
                </>
              ) : (
                <>
                        <Save className="w-5 h-5 inline-block mr-3" />
                        <span>Save Changes</span>
                </>
              )}
            </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}