import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Business {
  id: string
  user_id: string
  business_name: string
  slug?: string | null
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

export const getBusinessBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw error
  return (data as Business) || null

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

  const { error } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName)

  return publicUrl
}

export const uploadLogoForUser = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-logo.${fileExt}`
  const { error } = await supabase.storage
    .from('logos')
    .upload(fileName, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName)
  return publicUrl
}

export const updateBusiness = async (id: string, patch: Partial<Business>) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Business
}

export const getOrCreateCustomer = async (businessId: string, localStorageId: string) => {
  // Try find existing
  const { data: existing, error: selectError } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .eq('local_storage_id', localStorageId)
    .maybeSingle()
  if (selectError) throw selectError
  if (existing) return existing as Customer

  // Create new
  const { data, error } = await supabase
    .from('customers')
    .insert({ business_id: businessId, local_storage_id: localStorageId, current_visits: 0 })
    .select()
    .single()
  if (error) throw error
  return data as Customer
}

export const updateCustomerVisits = async (customerId: string, nextVisits: number) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ current_visits: nextVisits })
    .eq('id', customerId)
    .select()
    .single()
  if (error) throw error
  return data as Customer
}

export const createRedemption = async (businessId: string, customerId: string) => {
  const { data, error } = await supabase
    .from('redemptions')
    .insert({ business_id: businessId, customer_id: customerId })
    .select()
    .single()
  if (error) throw error
  return data as Redemption
}

