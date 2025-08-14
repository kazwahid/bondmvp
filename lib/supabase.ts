import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Business {
  id: string
  user_id: string
  business_name: string
  logo_url: string | null
  brand_color: string
  loyalty_visits_required: number
  created_at: string
}

export interface Customer {
  id: string
  business_id: string
  local_storage_id: string
  current_visits: number
  created_at: string
}

export interface Redemption {
  id: number
  business_id: string
  customer_id: string
  redeemed_at: string
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()
  
  if (error) throw error
  return data as Business
}

export const getBusinessByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) throw error
  return data as Business
}

export const createBusiness = async (business: Omit<Business, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('businesses')
    .insert(business)
    .select()
    .single()
  
  if (error) throw error
  return data as Business
}

export const uploadLogo = async (file: File, businessId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${businessId}-logo.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName)
  
  return publicUrl
}