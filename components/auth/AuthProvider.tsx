'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>
  signUp: (email: string, password: string, userData?: { full_name?: string; business_name?: string }) => Promise<{ user: User | null; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ user: null, error: null }),
  signUp: async () => ({ user: null, error: null }),
  signOut: async () => ({ error: null }),
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        return { user: null, error }
      }
      
      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  }

  const signUp = async (email: string, password: string, userData?: { full_name?: string; business_name?: string }) => {
    try {
      console.log('Starting signup process for:', email)
      
      // First, attempt to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })
      
      if (error) {
        console.error('Signup error:', error)
        return { user: null, error }
      }
      
      console.log('User signup successful:', data.user?.id)
      
      // If signup is successful, create the business profile
      if (data.user && userData?.business_name) {
        try {
          console.log('Creating business profile for user:', data.user.id)
          
          // Create business profile with proper error handling
          const businessData = {
            user_id: data.user.id,
            business_name: userData.business_name,
            brand_color: '#3B82F6', // Default brand color
            loyalty_visits_required: 5, // Default visits required
            logo_url: null, // No logo initially
          }
          
          // Import the createBusiness function
          const { createBusiness } = await import('@/lib/supabase')
          const business = await createBusiness(businessData)
          
          console.log('Business profile created successfully:', business.id)
          
          // Update user metadata with business info
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              business_id: business.id,
              business_name: userData.business_name,
              full_name: userData.full_name
            }
          })
          
          if (updateError) {
            console.warn('Failed to update user metadata:', updateError)
            // Don't fail the signup if metadata update fails
          }
          
        } catch (businessError) {
          console.error('Business creation error:', businessError)
          
          // If business creation fails, we should still allow the user to sign up
          // They can complete the setup later
          // But we should inform them about the partial success
          
          // Try to update user metadata anyway
          try {
            await supabase.auth.updateUser({
              data: {
                full_name: userData.full_name,
                setup_incomplete: true
              }
            })
          } catch (metadataError) {
            console.warn('Failed to update user metadata:', metadataError)
          }
        }
      }
      
      return { user: data.user, error: null }
    } catch (error) {
      console.error('Unexpected signup error:', error)
      return { user: null, error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
